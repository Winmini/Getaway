from django.contrib import admin
from getaway import models


# 코멘트를 어드민으로 관리해보자
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        'c_board',
        'c_content',
        'c_user',
        'c_pubdate',
        'c_like',
    )
    search_fields = ('c_board__title', 'c_content', 'c_user__user_id',)


# 모델에서 수정한 DefUser, admin 댓글 관리 추가
admin.site.register(models.Board)
admin.site.register(models.Tour)
admin.site.register(models.TourComment)
admin.site.register(models.Comment, CommentAdmin)
