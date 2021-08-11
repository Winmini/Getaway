$(function(event){
    $.ajax({
        type: 'POST',
        url: document.location.href,
        data: {
        'what': 'comment_bring',
        'id': $('#board_id').text(),
    }, //<h4 style="font-family: SansSerif">(작성자) {{ comment.c_user }}</h4>
    success: function(data){
        $.each(data.comment, function(idx,item){
            console.log(data.comment[idx].pk);
            let c_list = $('#c_list');

                let c_writer = $('<h4 style="font-family: SansSerif">' + data.username[item.fields.c_user] +'</h4>');
                let c_text = $('<p>: ' + item.fields.c_content + '</p>')

                let a = item.fields.c_user;
                let b = $('.logo').attr('id');
                console.log(b);
                if(a == b){
                    let deleteBtn = $('<button type="button" class="primary" style="font-family: SansSerif; float: right;">삭제</button>')
                    c_list.append(deleteBtn);
                    deleteBtn.on('click', function (event){
                    $.ajax({
                        type: 'POST',
                        url: document.location.href,
                        data: {
                            'what': 'comment_delete',
                            'board_id': $('#board_id').text(),
                            'id': data.comment[idx].pk
                        },
                        success: function(data){
                            c_writer.remove();
                            c_text.remove();
                        },
                        error: function(){
                            alert('댓글삭제 실패');
                        }
                    })
                })
                }
                c_list.append(c_writer);
                c_list.append(c_text);

        })
    },
    error: function (){
        alert('댓글불러오기 실패');
    }
    })
    $('#comment_btn').on('click', function(event){
    console.log($('.logo').attr('id'));
        $.ajax({
            type: 'POST',
            url: document.location.href,
            data: {
                'what': 'write_comment',
                'id': $('#board_id').text(),
                'writer': $('.logo').attr('id'),
                'content': $('#c_content').val()
            },
            success: function(data){
                let c_list = $('#c_list');
                let c_writer = $('<h4 style="font-family: SansSerif">' + $(data)[0].writer +'</h4>'); // 작성자 네임알려주쇼
                let c_text = $('<p>: ' + $('#c_content').val()+ '</p>')
                let deleteBtn = $('<button type="button" class="primary" style="font-family: SansSerif; float: right;">삭제</button>')
                c_list.prepend(deleteBtn);
                c_list.prepend(c_text);
                c_list.prepend(c_writer);
                deleteBtn.on('click', function (event){
                    $.ajax({
                        type: 'POST',
                        url: document.location.href,
                        data: {
                            'what': 'comment_delete',
                            'id': $('.logo').attr('id')
                        },
                        success: function(data){
                            c_writer.remove();
                            c_text.remove();
                            deleteBtn.remove();
                        },
                        error: function(){
                            alert('댓글삭제 실패');
                        }
                    })
                })
            },
            error: function (){
                alert('댓글달기 실패');
            }
        })
    })
})
