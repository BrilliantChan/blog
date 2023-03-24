import re


#  正则表达校验
class Validate:
    # 邮箱校验正则表达
    __email = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    # 账号校验正则表达
    __account = '^[a-zA-Z0-9_-]{6,30}$'

    """
        验证token
        Parameters:
            value - 校验字符串
            pattern - 自定义正则表达
            type - 校验类型 [custom -> 自定义, email -> 邮箱, account -> 账号]
        Returns:
            error - boolean 验证是否合法
            msg - string 失败提示
            payload - token解密数据
    """
    def validate(self, value='', pattern='', type='custom'):
        if type == 'email':
            return re.match(self.__email, value)
        elif type == 'account':
            return re.match(self.__account, value)

        return re.match(pattern, value)
