from django.contrib.auth.hashers import check_password
from django.core.serializers import serialize
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .forms import *
from django.core.paginator import Paginator
from django.db.models import Q  # for search function
from django.contrib import auth, messages
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
import json


def b_list(request):
    """
    게시판 리스트 출력 함수
    """
    # 입력 파라미터
    user_id = request.session.get('user')
    print(user_id)
    page = request.GET.get('page', 1)  # 페이지
    kw = request.GET.get('kw', '')  # 검색어 for search function
    # 조회
    listing = Board.objects.all().order_by('-b_pubdate')
    if kw:  # 이것도 for search function
        listing = listing.filter(
            Q(b_title__icontains=kw) |  # 제목검색
            Q(b_content__icontains=kw)  # | # 내용검색
        ).distinct()
    # 페이징 처리
    paginator = Paginator(listing, 10)  # 페이지당 10개씩 보여주기
    page_obj = paginator.get_page(page)

    # 검색 기능 넣고 Page and kw are included
    context = {'listing': page_obj, 'page': page, 'kw': kw, 'user': user_id}
    return render(request, 'getaway/list.html', context)


def b_create(request):
    """
    게시글 작성
    """
    if request.method == 'POST':
        b_title = request.POST['b_title']
        b_content = request.POST['b_content']
        b_user = User.objects.get(pk=request.session.get('user'))
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


@csrf_exempt
def b_detail(request, board_id):
    if request.method == 'POST':
        if request.POST.get('what') == 'write_comment':
            n_c_user = User.objects.get(pk=request.POST.get('writer'))
            n_c_content = request.POST.get('content')
            board = Board.objects.get(pk=request.POST['id'])
            board.b_comment += 1
            board.save()
            new_comment = Comment(
                c_user=n_c_user,
                c_content=n_c_content,
                c_board=board
            )
            new_comment.save()
            comment = Comment.objects.select_related('c_board').filter(c_board_id=request.POST.get('id')).order_by('-c_pubdate')
            writer = n_c_user.username
            comment_data = json.loads(serialize('json', comment))
            return JsonResponse({'comment': comment_data, 'writer': writer})
        elif request.POST.get('what') == 'comment_bring':
            comment = Comment.objects.select_related('c_board').filter(c_board_id=request.POST.get('id')).order_by('-c_pubdate')
            comment_data = json.loads(serialize('json', comment))
            username_data = {}
            for username in comment_data:
                username_data[username['fields']['c_user']] = User.objects.get(pk=username['fields']['c_user']).username
            return JsonResponse({'comment': comment_data, 'username': username_data})
        elif request.POST.get('what') == 'comment_delete':
            d_comment = Comment.objects.get(pk=request.POST.get('id'))
            d_comment.delete()
            board = Board.objects.get(pk=request.POST.get('board_id'))
            board.b_comment -= 1
            board.save()
            comment = Comment.objects.select_related('c_board').filter(c_board=request.POST.get('board_id')).order_by('-c_pubdate')
            comment_data = json.loads(serialize('json', comment))
            return JsonResponse({'comment': comment_data})

    if request.method == 'GET':
        user_id = request.session.get('user')
        post = get_object_or_404(Board, pk=board_id)
        comment_form = CommentForm()
        context = {
            'post': post,
            'comment_form': comment_form,
            'user': user_id
        }
        return render(request, 'getaway/detail.html', context)


def b_modify(request, board_id):
    post = get_object_or_404(Board, pk=board_id)
    if request.method == 'POST':
        post.b_title = request.POST['title']
        post.b_content = request.POST['content']
        post.b_user = User.objects.get(pk=request.session.get('user'))
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
    user_id = request.session.get('user')
    post = get_object_or_404(Board, pk=board_id)
    if user_id is None:
        messages.error(request, '로그인한 유저만 좋아요를 누를 수 있습니다.')
    elif user_id == post.b_user.id:
        messages.error(request, '본인이 작성한 글은 추천할수 없습니다')
    elif post.b_voter.filter(id=user_id).exists():
        post.b_voter.remove(user_id)
        messages.error(request, '좋아요가 취소 되었습니다.')
    else:
        post.b_voter.add(User.objects.get(pk=user_id))
    return redirect('getaway:b_detail', board_id)


# ----------------------------- 로긴
def signup(request):
    if request.method == 'POST':
        error = {}
        email = request.POST.get('email', None)
        username = request.POST.get('username', None)
        password = request.POST.get('password1', None)
        re_password = request.POST.get('password2', None)
        if not (email and username and password and re_password):
            error = '모든 값을 입력해야 합니다.'
        elif password != re_password:
            error = '비밀번호가 일치하지 않습니다.'
        else:
            user = User.objects.create_user(
                username=request.POST['username'],
                password=request.POST['password1'],
                email=request.POST['email'],
                )
            user.save()

        return render(request, 'getaway/signupcomplete.html')

    if request.method == 'GET':
        return render(request, 'getaway/signup.html')


def login(request):
    if request.method == 'GET':
        return render(request, 'getaway/login.html')
    elif request.method == 'POST':
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        if not (username and password):
            error = '모든 값을 입력해야 합니다.'
        else:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                error = '아이디가 존재하지 않습니다.'
            else:
                if check_password(password, user.password):
                    request.session['user'] = user.id
                    return redirect('getaway:b_list')  # 메인페이지
                else:
                    error = '비밀번호가 틀렸습니다.'
        return render(request, 'getaway/login.html', {'error': error})


def logout(request):
    if request.session.get('user'):
        del (request.session['user'])
    return redirect('getaway:b_list')


def home(request):
    user_id = request.session.get('user')
    if user_id:
        user = User.objects.get(pk=user_id)
        return render(request, 'getaway/mainpage.html', {'user_id': {user}})
    return render(request, 'getaway/mainpage.html')


@csrf_exempt
def tour_detail(request, contentId):
    if request.method == 'POST':
        try:
            Tour.objects.get(t_name=contentId)
        except Tour.DoesNotExist:
            tour = Tour.objects.create(t_name=contentId)
            if request.POST.get('what') == 'like':
                tour.t_like += 1
                tour.save()
            if request.POST.get('what') == 'dis':
                tour.t_dis += 1
                tour.save()
        else:
            tour = Tour.objects.get(t_name=contentId)
            if request.POST.get('what') == 'like':
                tour.t_like += 1
                tour.save()
            if request.POST.get('what') == 'dis':
                tour.t_dis += 1
                tour.save()
        return JsonResponse({'like': tour.t_like, 'dis': tour.t_dis})

    if request.method == 'GET':
        try:
            User.objects.get(pk=request.session.get('user'))
        except User.DoesNotExist:
            user = 'None'
        else:
            user = User.objects.get(pk=request.session.get('user'))
            print(user)

        try:
            tour = Tour.objects.get(t_name=contentId)
        except Tour.DoesNotExist:
            like = 0
            dis = 0
        else:
            like = tour.t_like
            dis = tour.t_dis
        return render(request, 'getaway/tourboard.html', {'contentId': contentId, 'user': user, 'like': like, 'dis': dis})


# --------------------------------------- comment 뷰 함수

def c_create(request, board_id):
    filled_form = CommentForm(request.POST)
    if filled_form.is_valid():
        finished_form = filled_form.save(commit=False)
        finished_form.board = get_object_or_404(Board, pk=board_id)
        finished_form.save()
    return redirect('getaway:b_detail', board_id)
