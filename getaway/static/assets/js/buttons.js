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

    // 추천 컨펌 버튼 -- 미완성 version
    // $(".recommend").on('click', function() {
    //     if(confirm("정말로 추천하시겠습니까?")) {
    //         location.href = $(this).attr('data-uri');
    //     }
    // });
});

//
// <a href="{% url 'getaway:b_modify' post.id %}">
//     <button id="mod_btn"
//             type="button"
//             className="button"
//             style="font-family: SansSerif"> 수정
//     </button>
// </a>


// $("#modify_btn").on('click', function() {
//    document.location.href = '/getaway/modify/'
// });