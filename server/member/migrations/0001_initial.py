# Generated by Django 4.1.7 on 2023-03-23 09:59

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid1, editable=False, primary_key=True, serialize=False, unique=True, verbose_name='用户ID')),
                ('nick_name', models.CharField(default='', max_length=40, verbose_name='用户昵称')),
                ('gender', models.IntegerField(choices=[(0, 'None'), (1, 'Male'), (2, 'Female')], default=0)),
                ('account', models.CharField(default='', max_length=20, unique=True)),
                ('password', models.CharField(default='', max_length=200)),
                ('create_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
