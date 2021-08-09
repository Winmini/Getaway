from django.contrib.auth.hashers import check_password
from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from .forms import *
from django.core.paginator import Paginator
from django.db.models import Q  # for search function
from django.contrib import auth, messages
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
import json
from django.utils import timezone
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder


def b_list(request):
    """
    게시판 리스트 출력 함수
    """
    # 입력 파라미터
    page = request.GET.get('page', 1)  # 페이지
    kw = request.GET.get('kw', '')  # 검색어 for search function
    # 조회
    listing = Board.objects.all().order_by('-b_pubdate')
    if kw:  # 이것도 for search function
        listing = listing.filter(
            Q(b_title__icontains=kw) |  # 제목검색
            Q(b_content__icontains=kw)  # | # 내용검색
            # Q(author__username__icontains=kw) |  # 질문 글쓴이검색
            # Q(answer__author__username__icontains=kw)  # 답변 글쓴이검색
        ).distinct()
    # 페이징 처리
    paginator = Paginator(listing, 10)  # 페이지당 10개씩 보여주기
    page_obj = paginator.get_page(page)
    # 검색 기능 넣고 Page and kw are included
    context = {'listing': page_obj, 'page': page, 'kw': kw}
    return render(request, 'getaway/list.html', context)


def b_create(request):
    """
    게시글 작성
    """
    if request.method == 'POST':
        b_title = request.POST['b_title']
        b_content = request.POST['b_content']
        b_user = request.user
        new_post = Board(
            b_title=b_title,
            b_content=b_content,
            b_user=b_user,
        )
        new_post.save()
        return redirect('getaway:b_list')
    else:
        board_form = BoardForm()
        post = Board.objects.all()
        context = {
            'board_form': board_form,
            'post': post
        }
        return render(request, 'getaway/create.html', context)


def b_detail(request, board_id):
    post = get_object_or_404(Board, pk=board_id)
    comment_form = CommentForm()
    comments = post.comment_set.all().order_by('-id')
    context = {
        'post': post,
        'comment_form': comment_form
    }
    return render(request, 'getaway/detail.html', context)


def b_modify(request, board_id):
    post = get_object_or_404(Board, pk=board_id)
    if request.method == 'POST':
        post.b_title = request.POST['title']
        post.b_content = request.POST['content']
        post.b_user = request.user
        post.b_pubdate = request.POST['pubdate']
        post.save()
        return redirect('getaway:b_detail', board_id=post.id)
    else:
        context = {
            'post': post
        }
        return render(request, 'getaway/modify.html', context)


def b_remove(request, board_id):
    post = get_object_or_404(Board, pk=board_id)
    post.delete()
    return redirect('getaway:b_list')


def b_like(request, board_id):
    """
    좋아요 (추천) 기능 view 함수
    """
    post = get_object_or_404(Board, pk=board_id)
    if request.user == post.b_user:
        messages.error(request, '본인이 작성한 글은 추천할수 없습니다')
    else:
        post.b_voter.add(request.user)
    return redirect('getaway:b_detail', board_id)


# ----------------------------- 로긴
def signup(request):
    if request.method == 'POST':
        if request.POST['password1'] == request.POST['password2']:
            user = User.objects.create_user(
                                            username=request.POST['username'],
                                            password=request.POST['password1'],
                                            email=request.POST['email'],)
            auth.login(request, user)
            return redirect('getaway:b_list')
        return render(request, 'getaway/signup.html')
    return render(request, 'getaway/signup.html')


def login(request):
    # 로그인 버튼 누르면 로그인 페이지로
    if request.method == 'GET':
        return render(request, 'getaway/login.html')
    # 로그인 기능
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('getaway:b_list')
        else:
            return render(request, 'getaway/login.html', {'error': '아이디 또는 비밀번호가 일치하지 않습니다.'})
    return render(request, 'getaway/list.html')


def logout(request):
    auth.logout(request)
    return redirect('getaway:home')


def home(request):
    user_id = request.session.get('user')
    if user_id:
        user = User.objects.get(pk=user_id)
        return render(request, 'getaway/mainpage.html', {'user_id': {user}})
    return render(request, 'getaway/mainpage.html')

# --------------------------------------- comment 뷰 함수

# 아직 코멘트 삭제 버튼 기능을 만들진 않았음.
# def c_delete(request):
#
#     comment = get_object_or_404(Comment, id=request.GET['comment_id'])
#     comment.delete()
#     return JsonResponse({
#         'code': '200'   # code 200의 의미는 삭제성공의 의미로 가정
#     }, json_dumps_params={'ensure_ascii': True})


def c_create(request, board_id):
    filled_form = CommentForm(request.POST)
    if filled_form.is_valid():
        finished_form = filled_form.save(commit=False)
        finished_form.board = get_object_or_404(Board, pk=board_id)
        finished_form.save()
    return redirect('getaway:b_detail', board_id)
