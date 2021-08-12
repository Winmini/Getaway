$(function(event) {
    // main 페이지로 돌아가는 버튼
    $('.go_home').on('click', function(event) {
        document.location.href = 'http://localhost:8000/'
    });

    // 새글쓰기 기능
    $('#new_posting_btn').on('click', function(event) {
        document.location.href = '/list/create/'
        });

    // 페이지 기능
    $(".page-link").on('click', function() {
            $("#page").val($(this).data("page"));
            $("#searchForm").submit();
        });

    // 검색 기능
    $("#btn_search").on('click', function() {
        $("#kw").val($(".kw").val());
        $("#page").val(1);  // 검색버튼을 클릭할 경우 1페이지부터 조회한다.
        $("#searchForm").submit();
        });

    // 수정 버튼
    $("#modify_btn").on('click', function(event) {
        location.href = $(this).attr('data-uri');
    });

    // 삭제 버튼
    $(".delete").on('click', function(event) {
        if(confirm("정말로 삭제하시겠습니까?")) {
            location.href = $(this).attr('data-uri');
        }
    });

    // 목록으로 돌아가기 버튼
    $("#list_btn").on('click',function(event) {
        location.href = $(this).attr('data-uri');
    });

    // 좋아요 버튼
    // $(".recommend").on('click', function(event) {
    //     var pk = $(this).attr('name')
    //     $.ajax({
    //         type: "POST",
    //         url: $(this).attr('data-uri'),
    //         data:{ 'pk': pk },
    //         dataType: "json",
    //         success: function (response) {
    //             alert(response.message)
    //             $("#count-" + pk).html("좋아요&nbsp;" + response.b_voter.count); // 좋아요 개수 변경
    //         },
    //         error: function(request, status, error) {
    //             alert("로그인이 필요해요.")
    //             window.location.replace("/login/") // 로그인 페이지로 넘어가기
    //         },
    //     });
    // });

    // 추천 컨펌 버튼 -- 딱히 필요가 없어서 주석 처리.
    // $(".recommend").on('click', function() {
    //     if(confirm("정말로 추천하시겠습니까?")) {
    //         location.href = $(this).attr('data-uri');
    //     }
    // });
});

// $(".recommend").click(function () { // .like 버튼을 클릭 감지
//     var pk = $(this).attr('name')
//     $.ajax({ // ajax로 서버와 통신
//         type: "POST", // 데이터를 전송하는 방법
//         url: "{% url 'getaway:b_like' post.id %}", // 통신할 url을 지정
//         data: { 'pk': pk, 'csrfmiddlewaretoken': '{{ csrf_token }}' }, // 서버로 데이터 전송시 옵션, pk를 넘겨야 어떤 게시글인지 확인 가능
//         dataType: "json",
//         success: function (response) { // 성공
//             alert(response.message);
//             $("#count-" + pk).html("좋아요;" + response.likes_count); // 좋아요 개수 변경
//         },
//         error: function (request, status, error) { // 실패
//             alert("로그인이 필요합니다.")
//             window.location.replace("/login/") // 로그인 페이지로 넘어가기
//         },
//     });
// })