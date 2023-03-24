import datetime
import jwt

from django.utils.deprecation import MiddlewareMixin
from server.contexts import response_json, decode_auth_token

class AuthorizationMiddleware (MiddlewareMixin):
    # 登录拦截名单
    __authorization_black_list = ('/api/member/info', '/api/member/update')

    def process_request(self, request):

        # 判断当前api地址是否在登录拦截名单内
        if request.path in self.__authorization_black_list:
            # 判断session是否存在token
            if 'token' not in request.session:
                return response_json({}, 'logout', msg="请先登录")

            # 验证token是否有效
            jwt_payload = decode_auth_token(request.session['token'])

            if jwt_payload['error']:
                return response_json({}, 'logout', jwt_payload['msg'])

        return
