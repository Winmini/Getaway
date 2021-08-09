$(function(event) {
    // 새글쓰기 기능
    $('#new_posting_btn').on('click', function(event) {
        document.location.href = '/getaway/create/'
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
});
