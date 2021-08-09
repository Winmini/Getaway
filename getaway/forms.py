from django import forms
from .models import *


class BoardForm(forms.ModelForm):
    class Meta:
        model = Board
        fields = ['b_title', 'b_content']                # 유저와 연동되어 써야하기 때문에 b_writer 를 제외 시켰음.
        # fields = ['b_title', 'b_writer', 'b_content']  # create 페이지에 보여줄 것들만 명시!


# Form 으로 코멘트 처리
class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['c_user', 'c_content']
        # labels = {
        #     'content': '댓글내용',
        # }

