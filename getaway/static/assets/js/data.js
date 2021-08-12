let area_1 = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']
let area_2 = ['강화군', '계양구', '미추홀구', '남동구', '동구', '부평구', '서구', '연수구', '옹진군', '중구']
let area_3 = ['대덕구', '동구', '서구', '유성구', '중구']
let area_4 = ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구']
let area_5 = ['광산구', '남구', '동구', '북구', '서구']
let area_6 = ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구']
let area_7 = ['중구', '남구', '동구', '북구', '울주군']
let area_8 = ['세종특별자치시']
let area_31 = ['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시']
let area_32 = ['강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군']
let area_33 = ['괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '진천군', '청원군', '청주시', '충주시', '증평군']
let area_34 = ['공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '천안시', '청양군', '태안군', '홍성군', '계룡시']
let area_35 = ['경산시', '경주시', '고령군', '구미시', '군위군', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '영천시', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군', '칠곡군', '포항시']
let area_36 = ['거제시', '거창군', '고성군', '김해시', '남해군', '마산시', '밀양시', '사천시', '산청군', '양산시', '의령군', '진주시', '진해시', '창녕군', '창원시', '통영시', '하동군', '함안군', '함양군', '합천군']
let area_37 = ['고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군']
let area_38 = ['강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '신안군', '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군']
let area_39 = ['남제주군', '북제주군', '서귀포시', '제주시']
let whole_area = {'서울': area_1, '인천': area_2, '대전': area_3, '대구': area_4, '광주': area_5, '부산': area_6, '울산': area_7, '세종': area_8, '경기': area_31, '강원': area_32, '충북': area_33, '충남': area_34, '경북': area_35, '경남': area_36, '전북': area_37, '전남': area_38, '제주': area_39}
let area_key = {'서울': '1', '인천': '2', '대전': '3', '대구': '4', '광주': '5', '부산': '6', '울산': '7', '세종': '8', '경기': '31', '강원': '32', '충북': '33', '충남': '34', '경북': '35', '경남': '36', '전북': '37', '전남': '38', '제주': '39'}


$(function (){
    // 선택지 초기화
    let serviceKey = 'lA29%2FannvhdQHnNE4mon7ZoyNq0ue6P%2FPnYQuFsfaZ7D8YedR6DOISotomyacj0u15iLaCeruqZUsGe%2F79DpRA%3D%3D';
//    let serviceKey = 'rE%2BzSIwPU%2FdmQTVNnIRGBCcv6FWXOyrTEKBJFzviUwqs53ZPdiXDrDai8Cmc946Hzp0e0IK19jC7l5FS61TFBw%3D%3D'; //
//    let serviceKey = 'ikvqLLOyp69vvFkK1eGbmCQW0Eg9KcEEtAbgaXVRf7GVGqxh0TgoPastrL4xHJgKtyy2Ii%2F%2B5FTA0PYiBBlmBg%3D%3D';
//    let serviceKey = '';
    let area_select = $('#area_select');
    let detail_select = $('#detail_select');

    for(let area in whole_area){
        area_select.append($('<option value="'+ area + '"></option>').text(area));
    }
    whole_area['서울'].forEach((value, index, array) => {
        detail_select.append($('<option value="' + value + '"></option>').text(value));
    })
    let pageNo = 1;
    let selected = $('#area_select option:selected')
    let areaCode = area_key[selected.val()];
    let sigunguCode = whole_area[selected.val()].indexOf($('#detail_select option:selected').val()) + 1;
    bring_tour_with_areaCode(areaCode, sigunguCode, pageNo, serviceKey);



    area_select.on('change', function (event) {
        $('html').scrollTop(0);
        pageNo = 1;
        $('.posts').empty();
        selected = $('#area_select option:selected');
        detail_select.empty();
        whole_area[$('#area_select option:selected').val()].forEach((value, index, array) => {
            detail_select.append($('<option value="' + value + '"></option>').text(value));
        })
        areaCode = area_key[selected.val()];
        sigunguCode = whole_area[selected.val()].indexOf($('#detail_select option:selected').val()) + 1;
        bring_tour_with_areaCode(areaCode, sigunguCode, pageNo, serviceKey);
    })

    detail_select.on('change',function (event){
        $('html').scrollTop(0);
        pageNo = 1;
        $('.posts').empty();
        selected = $('#area_select option:selected');
        areaCode = area_key[selected.val()];
        sigunguCode = whole_area[selected.val()].indexOf($('#detail_select option:selected').val()) + 1;
        bring_tour_with_areaCode(areaCode, sigunguCode, pageNo, serviceKey);
    })
})


function bring_tour_with_areaCode(areaCode, sigunguCode, pageNo, serviceKey){
    let xhr = new XMLHttpRequest();
    let url ='http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + 'ETC';
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + 'AppTest';
    queryParams += '&' + encodeURIComponent('areaCode') + '=' + areaCode;
    queryParams += '&' + encodeURIComponent('sigunguCode') + '=' + sigunguCode;
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + '100';
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + pageNo;
    queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + '12';
    queryParams += '&' + encodeURIComponent('overviewYN') + '=' + 'Y';
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function (){
        if(this.readyState == 4){
            $(this.responseText).find('item').each(function(index, item){

                let post = $('.posts');
                let article = $('<article></article>');
                let image_add = $($(item).find('firstimage')[0]).text();
                let t_title = $($(item).find('title')[0]).text();
                let t_addr = $($(item).find('addr1')[0]).text();
                // console.log(item);
                post.append(article);
                article.append('<a href="#" class="image"><img src="' + image_add +'"/></a>');
                article.append('<h3>' + t_title + '</h3>');
                article.append('<p> 위치: '+ t_addr + ' </p>');

                // console.log($(item).find('title')[0]);
                let contentId = $($(item).find('contentid')[0]).text();
                console.log(contentId);
//              bring_tour_detail(article, contentId, serviceKey);'
                let detail_url = "{% url 'getaway:signup', " +  contentId +  "%}";
                console.log(detail_url);
                article.append('<ul class="actions" style="width: 50%;"><li><a href="/' + contentId + '" class="button">More</a></li></ul>');
            })
        }
    }
    xhr.send('');
}

/*
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + 'ETC';
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + 'TourAPI3.0_Guide';
    queryParams += '&' + encodeURIComponent('defaultYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('firstImageYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('defaultYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('areacodeYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('catcodeYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('addrinfoYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('mapinfoYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('overviewYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('transGuideYN') + '=' + 'Y';
* */



function bring_tour_detail(article, contentId, serviceKey){
    let xhr = new XMLHttpRequest();
    let url ='http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
    queryParams += '&' + encodeURIComponent('contentId') + '=' + contentId;
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + 'ETC';
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + 'AppTest';
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