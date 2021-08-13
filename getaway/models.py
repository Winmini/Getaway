from django.contrib.auth.models import User
from django.db import models


class Board(models.Model):
    b_title = models.CharField(max_length=100)  # 게시판 제목
    b_content = models.TextField(max_length=3000)  # 게시판 내용
    b_like = models.IntegerField(default=0)   # 게시판 좋아요 개수
    b_comment = models.IntegerField(default=0)  # 게시판 댓글 개수
    b_pubdate = models.DateTimeField(auto_now=True)  # 게시판 게시글 업로드 날짜
    b_user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True, related_name='user_board')
    b_voter = models.ManyToManyField(User, related_name='voter_board', blank=True)  # 추천인 추가, Many-To-Many 중복 좋아요 방지

    def like_count(self):  # total user count
        return self.b_voter.count()

    def __str__(self):
        return self.b_title


class Comment(models.Model):
    c_content = models.TextField(max_length=1000)                   # 댓글 내용
    c_user = models.ForeignKey(User, on_delete=models.CASCADE)      # 댓글 쓴 유저
    c_like = models.IntegerField(default=0)                         # 댓글 좋아요
    c_pubdate = models.DateTimeField(auto_now=True)                 # 댓글 작성일
    c_board = models.ForeignKey(Board, on_delete=models.CASCADE)    # 이 댓글이 달린 게시글!

    def __str__(self):
        return self.c_content


class Tour(models.Model):
    t_name = models.CharField(max_length=50)
    t_like = models.IntegerField(default=0)
    t_dis = models.IntegerField(default=0)

    def __str__(self):
        return self.t_name


class TourComment(models.Model):
    tc_userID = models.CharField(max_length=20)
    tc_content = models.TextField(max_length=1000)
    tc_pubdate = models.DateTimeField(auto_now=True)
    tc_tour = models.ForeignKey(Tour, on_delete=models.CASCADE)

    def __str__(self):
        return self.tc_content


# 이름을 임시로 DefUser 로 바꿈. 장고 고유 User 랑 겹치길래...
# class DefUser(models.Model):
#     user_name = models.CharField(max_length=20)
#     user_password = models.CharField(max_length=20)
#     user_email = models.EmailField(max_length=40)
#     user_phone = models.IntegerField()
#     user_created = models.DateTimeField(auto_now=True)
#
#     def __str__(self):
#         return self.user_name
