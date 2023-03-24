import base64
import random
import string

import jwt
import datetime

from drf_yasg import openapi
from django.http import JsonResponse
from django.utils import timezone
from django.core import mail
from django_redis import get_redis_connection

from server.settings import SECRET_KEY, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD



def response_schema(data={}):
    """
        自定义响应体
        Parameters:
            data - 响应体返回实例

        Returns:
            自定义响应体
    """

    return {
        "0": openapi.Response(
            description="响应体示例",
            examples={
                "application/json": {
                    'data': data,
                    'code': 0,
                    'msg': 'success'
                }
            }
        )
    }


def response_json(data={}, type='success', **extra):
    """
        格式化返回响应体
        Parameters:
            data - 返回数据
            type - success -> 成功状态 error -> 失败状态 logout -> 未登录状态
        Returns:
            格式化后的响应体
    """
    if type == 'success':
        return JsonResponse({
            'code': 0,
            'data': data,
            'msg': extra['msg'] if 'msg' in extra else 'success'
        })
    elif type == 'logout':
        return JsonResponse({
            'code': 401,
            'data': {},
            'msg': extra['msg'] if 'msg' in extra else '请先登录'
        })
    return JsonResponse({
        'code': 1,
        'data': {},
        'msg': extra['msg'] if 'msg' in extra else '请求失败'
    })


def decode_auth_token(token):
    """
        验证token
        Parameters:
            token - 目标token
        Returns:
            error - boolean 验证是否合法
            msg - string 失败提示
            payload - token解密数据
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

        if payload:
            return {
                'error': False,
                'msg': 'success',
                'payload': payload
            }
        else:
            raise jwt.InvalidTokenError
    except jwt.ExpiredSignatureError:
        return {
            'error': True,
            'msg': '登录已过期，请重新登录',
            'payload': {}
        }
    except jwt.InvalidTokenError:
        return {
            'error': True,
            'msg': '用户信息验证失败，请重新登录',
            'payload': {}
        }


def encode_auth_token(pk):
    """
        申请token
        Parameters:
            pk - token加密数据

        Returns:
            token - 生成token
    """
    headers = {
        "type": "JWT",
        "alg": "HS256",
        "pk": pk
    }

    payload = {
        "headers": headers,
        "iss": "ly",
        'exp': timezone.now() + datetime.timedelta(days=7),
        'iat': timezone.now()
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

    return token


def send_email_code(email=''):
    """
        发送邮箱验证码
        Returns:
            code - 生成的邮箱验证码
    """
    random_str = string.ascii_lowercase + '1234567890'
    code = "".join(random.choice(random_str) for _ in range(5))
    status = mail.send_mail(
        '欢迎注册账号',
        '您好，欢迎注册账号, 您的验证码是%s, 该验证码有效期为五分钟' % (code),
        from_email=EMAIL_HOST_USER,
        recipient_list=[email]
    )

    # 存到redis
    redis_conn = get_redis_connection("default")
    redis_conn.set(email, code, 5)

    return status
