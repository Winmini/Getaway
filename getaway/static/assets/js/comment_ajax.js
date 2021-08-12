$(function(event){
    $.ajax({
        type: 'POST',
        url: document.location.href,
        data: {
        'what': 'comment_bring',
        'id': $('#board_id').text(),
    },
    success: function(data){
        $.each(data.comment, function(idx,item){
                let t_list = $('#c_list');
                let c_list = $('<div class="box"></div>');
                t_list.append(c_list);
                let c_writer
                if(data.username[item.fields.c_user] == $('#t_name').text()){
                    c_writer = $('<h4 style="font-family: SansSerif; color: red"> 글쓴이 </h4>');
                }
                else{
                    c_writer = $('<h4 style="font-family: SansSerif">' + data.username[item.fields.c_user] +'</h4>');
                }
                let c_text = $('<p>: ' + item.fields.c_content + '</p>')

                let a = item.fields.c_user;
                let b = $('.logo').attr('id');
                c_list.append(c_writer);
                c_list.append(c_text);
                if(a == b){
                    let deleteBtn = $('<button type="button" class="primary" style="font-family: SansSerif; float: right;">삭제</button>')
                    c_list.prepend(deleteBtn);
                    deleteBtn.on('click', function (event){
                        console.log("엉?")
                        $.ajax({
                            type: 'POST',
                            url: document.location.href,
                            data: {
                                'what': 'comment_delete',
                                'board_id': $('#board_id').text(),
                                'id': data.comment[idx].pk
                            },
                            success: function(data){
                                c_list.remove();
                            },
                            error: function(){
                                alert('댓글삭제 실패');
                            }
                        })
                    })
                }


        })
    },
    error: function (){
        alert('댓글불러오기 실패');
    }
    })
    $('#comment_btn').on('click', function(event){
        if($('.logo').attr('id') == 'None'){
            alert('로그인한 유저만 댓글을 달 수 있습니다.')
        }
        else {

            $.ajax({
                type: 'POST',
                url: document.location.href,
                data: {
                    'what': 'write_comment',
                    'id': $('#board_id').text(),
                    'writer': $('.logo').attr('id'),
                    'content': $('#c_content').val()
                },
                success: function (data) {
                    let t_list = $('#c_list');
                    let c_list = $('<div class="box"></div>');
                    t_list.prepend(c_list);
                    let c_writer
                    if($(data)[0].writer == $('#t_name').text()){
                        c_writer = $('<h4 style="font-family: SansSerif; color: red"> 글쓴이 </h4>');
                    }
                    else{
                        c_writer = $('<h4 style="font-family: SansSerif">' + $(data)[0].writer + '</h4>');
                    }
                    let c_text = $('<p>: ' + $('#c_content').val() + '</p>')
                    let deleteBtn = $('<button type="button" class="primary" style="font-family: SansSerif; float: right;">삭제</button>')
                    let count = Number($('#comment_count').text().substring(3,)) + 1;
                    $('#comment_count').text('댓글 '+ count);
                    c_list.prepend(c_text);
                    c_list.prepend(c_writer);
                    c_list.prepend(deleteBtn);
                    deleteBtn.on('click', function (event) {
                        $.ajax({
                            type: 'POST',
                            url: document.location.href,
                            data: {
                                'what': 'comment_delete',
                                'board_id': $('#board_id').text(),
                                'id': data.comment[0].pk
                            },
                            success: function (data) {
                                count = Number($('#comment_count').text().substring(3,)) - 1;
                                $('#comment_count').text('댓글 '+ count);
                                c_list.remove();
                            },
                            error: function () {
                                alert('댓글삭제 실패');
                            }
                        })
                    })
                },
                error: function () {
                    alert('댓글달기 실패');
                }
            })
        }
    })
})
