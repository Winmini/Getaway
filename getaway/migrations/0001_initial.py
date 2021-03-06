# Generated by Django 2.2.5 on 2021-08-13 02:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('b_title', models.CharField(max_length=100)),
                ('b_content', models.TextField(max_length=3000)),
                ('b_like', models.IntegerField(default=0)),
                ('b_comment', models.IntegerField(default=0)),
                ('b_pubdate', models.DateTimeField(auto_now=True)),
                ('b_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_board', to=settings.AUTH_USER_MODEL)),
                ('b_voter', models.ManyToManyField(blank=True, related_name='voter_board', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Tour',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('t_name', models.CharField(max_length=50)),
                ('t_like', models.IntegerField(default=0)),
                ('t_dis', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='TourComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tc_userID', models.CharField(max_length=20)),
                ('tc_content', models.TextField(max_length=1000)),
                ('tc_pubdate', models.DateTimeField(auto_now=True)),
                ('tc_tour', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='getaway.Tour')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('c_content', models.TextField(max_length=1000)),
                ('c_like', models.IntegerField(default=0)),
                ('c_pubdate', models.DateTimeField(auto_now=True)),
                ('c_board', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='getaway.Board')),
                ('c_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
