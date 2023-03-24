from django.db import models

from uuid import uuid1

# Create your models here.
class Member (models.Model):
    # 性别枚举 NONE(保密) = 0 MALE(男)=1 FEMALE(女) = 2
    class Gender(models.IntegerChoices):
        NONE = 0
        MALE = 1
        FEMALE = 2

    id = models.UUIDField(
        '用户ID',
        null=False,
        default=uuid1,
        editable=False,
        primary_key=True,
        unique=True
    )
    nick_name = models.CharField(
        '用户昵称',
        max_length=40,
        null=False,
        default=""
    )
    email = models.EmailField(
        '邮箱',
        null=False,
        default="",
        unique=True
    )
    gender = models.IntegerField(
        "性别",
        choices=Gender.choices,
        default=Gender.NONE,
        null=False
    )
    account = models.CharField(
        "用户账号",
        null=False,
        unique=True,
        max_length=20,
        default=""
    )
    password = models.CharField(
        '密码',
        null=False,
        max_length=200,
        default=""
    )
    create_time = models.DateTimeField(
        '注册时间',
        auto_now_add=True,
        editable=False
    )
