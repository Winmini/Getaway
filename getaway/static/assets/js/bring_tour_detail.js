$(function (){
    let serviceKey = 'ikvqLLOyp69vvFkK1eGbmCQW0Eg9KcEEtAbgaXVRf7GVGqxh0TgoPastrL4xHJgKtyy2Ii%2F%2B5FTA0PYiBBlmBg%3D%3D';
    let contentId = $('.logo').attr('id');

})

function bring_tour_detail(article, contentId, serviceKey){
    let xhr = new XMLHttpRequest();
    let url ='http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
    queryParams += '&' + encodeURIComponent('contentId') + '=' + contentId;
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + 'ETC';
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + 'AppTest';
    queryParams += '&' + encodeURIComponent('firstImageYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('addrinfoYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('mapinfoYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('overviewYN') + '=' + 'Y';
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function (){
        if(this.readyState == 4){
            console.log(this.responseText);
            $(this.responseText).find('item').each(function(index, item){
                console.log(item);
                let explain = $($(item).find('overview')[0]).text().substr(0,100);
                article.append('<p> 설명: ' + explain + ' ...</p>');
                article.append('<ul class="actions" style="width: 50%;"><li><a href="#" class="button">More</a></li></ul>');
            })
        }
    }
    xhr.send('');
}