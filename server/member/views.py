import json
import re
import string
import random

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.db.utils import OperationalError, DataError
from django.contrib.auth.hashers import make_password, check_password

from server.contexts import response_schema, \
    response_json, \
    encode_auth_token, \
    decode_auth_token, \
    send_email_code
from server.validate import Validate
from .models import Member
from .serializer import MemberSerializer


# Create your views here.
class MemberViewSet(ModelViewSet, Validate):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    http_method_names = ['get', 'post']
    tag = ['用户信息']

    @swagger_auto_schema(
        tags=tag,
        operation_summary="用户注册",
        operation_description="用户注册",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['account', 'password', 'password2', 'email'],
            properties={
                'account': openapi.Schema(type=openapi.TYPE_STRING, title="账号"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, title="密码"),
                'email': openapi.Schema(type=openapi.TYPE_STRING, title="邮箱"),
                'password2': openapi.Schema(type=openapi.TYPE_STRING, title="再次输入密码")
            }
        ),
        responses=response_schema({})
    )
    @action(methods=['post'], url_path='sign/up', detail=False)
    def sign_up(self, request):
        payload = json.loads(request.body)
        # 用户账号
        account = payload.get("account")
        # 用户密码
        password = payload.get("password")
        # 用户再次输入密码
        password2 = payload.get("password2")
        # 邮箱
        email = payload.get('email')

        # 判断必填字段是否为空
        if not account:
            return response_json({}, 'error', msg="账号必填")
        if not email:
            return response_json({}, 'error', msg="邮箱必填")
        if not password:
            return response_json({}, 'error', msg="密码必填")
        if not password2:
            return response_json({}, 'error', msg="请再次输入密码")
        # 判断账号、邮箱、密码格式
        if not self.validate(account, type='account'):
            return response_json({}, 'error', msg="账号格式不正确")
        elif not self.validate(email, type='email'):
            return response_json({}, 'error', msg="邮箱格式不正确")
        elif not len(password) >= 6:
            return response_json({}, 'error', msg="密码不能少于6位")
        elif password != password2:
            return response_json({}, 'error', msg="两次密码不一致")

        # 判断用户是否已注册
        old_member = Member.objects.filter(account=account).exists()

        if old_member:
            return response_json({}, 'error', msg="注册失败，账号已注册")

        try:
            # 生成随机用户昵称
            ascii_letter = string.ascii_letters;
            nick_name = "用户" + "".join(random.choice(ascii_letter) for _ in range(8))
            # 将用户信息添加到数据库
            member = Member.objects.create(
                account=payload['account'],
                nick_name=nick_name,
                password=make_password(payload['password']),
                email=email
            )

            # 注册成功
            return response_json(data={}, type="success")
        except OperationalError as e:
            # 捕获数据库异常
            return response_json(data=e, type='error', msg="注册失败，请联系管理员")
        except DataError as e:
            # 捕获数据库异常
            return response_json(data=e, type='error', msg="注册失败，数据异常")

    @swagger_auto_schema(
        tags=tag,
        operation_summary="用户登录",
        operation_description="用户登录",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['account', 'password'],
            properties={
                'account': openapi.Schema(type=openapi.TYPE_STRING, title="账号"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, title="密码")
            }
        ),
        responses=response_schema({'token': '用户Token'})
    )
    @action(methods=['post'], url_path='sign/in', detail=False)
    def sign_in(self, request):
        payload = json.loads(request.body)
        account = payload.get('account')
        password = payload.get('password')

        # 判断必填参数是否为空
        if not account:
            return response_json({}, type='error', msg="请输入登录账号")
        elif not password:
            return response_json({}, type='error', msg="请输入密码")

        try:
            member = Member.objects.get(account=account)

            # 判断是否存在该用户
            if not member:
                return response_json({}, type='error', msg="该账号暂未注册")
            # 判断密码是否正确
            if not check_password(password, member.password):
                return response_json({}, type='error', msg="账号密码不正确")

            # 密码正确，生成token返回给用户
            token = encode_auth_token(str(member.id))
            request.session['token'] = token

            return response_json({'token': token})
        except DataError as e:
            return response_json(e, type='error', msg="数据库异常")

    @swagger_auto_schema(
        tags=tag,
        operation_summary="获取当前用户信息",
        operation_description="获取当前用户信息"
    )
    @action(methods=['get'], url_path='info', detail=False)
    def info(self, request):
        # 解密token获取主键查询用户
        jwt_payload = decode_auth_token(request.session.get('token'))
        pk = jwt_payload['payload']['headers']['pk']

        try:
            member = Member.objects.get(pk=pk)
            data = self.serializer_class(member).data
            # 验证当前用户是否存在
            if not member:
                raise Member.DoesNotExist

            return response_json(self.serializer_class(member).data)
        except Member.DoesNotExist as e:
            return response_json({}, 'logout', msg="用户不存在，请重新登录")

    @swagger_auto_schema(
        tags=tag,
        operation_summary="获取邮箱验证码",
        operation_description="获取邮箱验证码",
        manual_parameters=[
            openapi.Parameter(name="email", in_=openapi.IN_QUERY, description="邮箱", type=openapi.TYPE_STRING)
        ],
        responses=response_schema({})
    )
    @action(methods=['get'], url_path='email/code', detail=False)
    def email_code(self, request):
        # 获取邮箱
        email = request.query_params.get('email')

        # 验证邮箱是否存在
        if not email:
            return response_json({}, 'error', msg='邮箱必填')

        try:
            # 生成邮箱验证码
            send_status = send_email_code(email)

            print('11111111111111111111111111111', send_status)

            if send_status != 1:
                raise Exception

            return response_json({}, 'success', msg='发送成功')
        except Exception as e:
            print(e)
            return response_json({}, 'error', msg='验证码发送失败')
