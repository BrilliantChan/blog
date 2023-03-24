import datetime

from pytz import timezone
from rest_framework.serializers import ModelSerializer, DateTimeField, Field

from .models import Member

class MemberSerializer(ModelSerializer):
    create_time = DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Member
        fields = ['id', 'nick_name', 'account', 'gender', 'email', 'create_time']
