from django.urls import path
from . import views

app_name = 'getaway'   # set name space

urlpatterns = [
    # http://localhost:8000
    path('', views.home, name='home'),
    # http://localhost:8000/list
    path('list/', views.b_list, name='b_list'),
    # http://localhost:8000/list/create
    path('list/create/', views.b_create, name='b_create'),

    path('detail/<int:board_id>', views.b_detail, name='b_detail'),
    path('modify/<int:board_id>', views.b_modify, name='b_modify'),
    path('detail/remove/<int:board_id>', views.b_remove, name='b_remove'),
    # 게시글 추천
    path('detail/<int:board_id>/like/', views.b_like, name='b_like'),

    # 회원가입/ 로그인/ 로그아웃
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    # 댓글......

]