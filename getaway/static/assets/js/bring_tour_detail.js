$(function (){
    let serviceKey = 'ikvqLLOyp69vvFkK1eGbmCQW0Eg9KcEEtAbgaXVRf7GVGqxh0TgoPastrL4xHJgKtyy2Ii%2F%2B5FTA0PYiBBlmBg%3D%3D';
    let contentId = $('.logo').attr('id');
    console.log(contentId);
    let article = $('#start_info');
    bring_tour_detail(article, contentId, serviceKey,);
    let login_id = $('#login_id').text();
    console.log(login_id);
    $('#btn_like').on('click', function(event){
        if (login_id == ""){
            alert('로그인한 사람만 누를 수 있습니다.');
        }
        else {
            $.ajax({
                type: 'POST',
                url: document.location.href,
                data: {
                    'what': 'like',
                    'user': login_id,
                },
                success: function (data) {
                    $('#btn_like').attr('value', "좋아요 " + data['like']);
                    console.log(data['like']);
                },
                error: function () {
                    alert('좋아요 실패');
                }
            })
        }
    })
    $('#btn_dislike').on('click', function(event){
        if (login_id == ""){
            alert('로그인한 사람만 누를 수 있습니다.');
        }
        else{
            $.ajax({
                type: 'POST',
                url: document.location.href,
                data: {
                    'what': 'dis',
                    'user': login_id,
                },
                success: function(data){
                     $('#btn_dislike').attr('value', "싫어요 " + data['dis']);
                },
                error: function(){
                    alert('싫어요 실패');
                }
            })
        }

    })
})





function bring_tour_detail(article, contentId, serviceKey, map_x, map_y){
    let xhr = new XMLHttpRequest();
    let url ='http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
    queryParams += '&' + encodeURIComponent('contentId') + '=' + contentId;
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + 'ETC';
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + 'AppTest';
    queryParams += '&' + encodeURIComponent('firstImageYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('defaultYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('addrinfoYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('mapinfoYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('overviewYN') + '=' + 'Y';
    queryParams += '&' + encodeURIComponent('transGuideYN') + '=' + 'Y';
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function (){
        if(this.readyState == 4){
            $(this.responseText).find('item').each(function(index, item){
                let title = $($(item).find('title')[0]).text();
                let tour_info = $('#tour_info');
                let image_add = $($(item).find('firstimage')[0]).text();
                let addr = $($(item).find('addr1')[0]).text();
                let explain = $($(item).find('overview')[0]).text();
                let map_x = $($(item).find('mapx')[0]).text();
                let map_y = $($(item).find('mapy')[0]).text();
                article.prepend('<h1 style="font-family: SansSerif">' + title + '</h1>');
                console.log(item);
                tour_info.append('<img style="width: 40em; height=40em;" src="' + image_add +'"/><br>');
                tour_info.append('<strong>위치: </strong> <div>' + addr +' </div><br>');
                tour_info.append('<strong>설명: </strong> <div> ' + explain + ' </div>')
                // $('.wrap_map').attr('id', map_x);
                // $('.wrap_roadview').attr('id', map_y);
                let mapContainer = document.getElementById('map'), // 지도를 표시할 div
                mapCenter = new kakao.maps.LatLng(Number(map_y),Number(map_x)), // 지도의 중심 좌표
                mapOption = {
                    center: mapCenter, // 지도의 중심 좌표
                    level: 4 // 지도의 확대 레벨
                };

                    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
                let map = new kakao.maps.Map(mapContainer, mapOption);

                    // 지도에 올릴 마커를 생성합니다.
                let mMarker = new kakao.maps.Marker({
                    position: mapCenter, // 지도의 중심좌표에 올립니다.
                    map: map // 생성하면서 지도에 올립니다.
                });

                    // 지도에 올릴 장소명 인포윈도우 입니다.
                let mLabel = new kakao.maps.InfoWindow({
                    position: mapCenter, // 지도의 중심좌표에 올립니다.
                    content: title // 인포윈도우 내부에 들어갈 컨텐츠 입니다.
                });

                mLabel.open(map, mMarker); // 지도에 올리면서, 두번째 인자로 들어간 마커 위에 올라가도록 설정합니다.


                let rvContainer = document.getElementById('roadview'); // 로드뷰를 표시할 div
                let rv = new kakao.maps.Roadview(rvContainer); // 로드뷰 객체 생성
                let rc = new kakao.maps.RoadviewClient(); // 좌표를 통한 로드뷰의 panoid를 추출하기 위한 로드뷰 help객체 생성
                let rvResetValue = {} //로드뷰의 초기화 값을 저장할 변수

                rc.getNearestPanoId(mapCenter, 50, function(panoId) {
                    rv.setPanoId(panoId, mapCenter);//좌표에 근접한 panoId를 통해 로드뷰를 실행합니다.
                    rvResetValue.panoId = panoId;
                });

                    // 로드뷰 초기화 이벤트
                kakao.maps.event.addListener(rv, 'init', function() {

                    // 로드뷰에 올릴 마커를 생성합니다.
                    let rMarker = new kakao.maps.Marker({
                        position: mapCenter,
                        map: rv //map 대신 rv(로드뷰 객체)로 설정하면 로드뷰에 올라갑니다.
                    });

                    // 로드뷰에 올릴 장소명 인포윈도우를 생성합니다.
                    let rLabel = new kakao.maps.InfoWindow({
                        position: mapCenter,
                        content: title
                    });
                    rLabel.open(rv, rMarker);

                    // 로드뷰 마커가 중앙에 오도록 로드뷰의 viewpoint 조정 합니다.
                    let projection = rv.getProjection(); // viewpoint(화면좌표)값을 추출할 수 있는 projection 객체를 가져옵니다.

                    // 마커의 position과 altitude값을 통해 viewpoint값(화면좌표)를 추출합니다.
                    let viewpoint = projection.viewpointFromCoords(rMarker.getPosition(), rMarker.getAltitude());
                    rv.setViewpoint(viewpoint); //로드뷰에 뷰포인트를 설정합니다.

                    //각 뷰포인트 값을 초기화를 위해 저장해 놓습니다.
                    rvResetValue.pan = viewpoint.pan;
                    rvResetValue.tilt = viewpoint.tilt;
                    rvResetValue.zoom = viewpoint.zoom;
                });

                    //지도 이동 이벤트 핸들러


                    //지도 초기화 이벤트 핸들러


            })
        }
    }
    xhr.send('');
}


function moveKakaoMap(self){

    let center = map.getCenter(),
        lat = center.getLat(),
        lng = center.getLng();

    self.href = 'https://map.kakao.com/link/map/' + encodeURIComponent('위치명') + ',' + lat + ',' + lng; //Kakao 지도로 보내는 링크
}


function resetKakaoMap(){
    map.setCenter(mapCenter); //지도를 초기화 했던 값으로 다시 셋팅합니다.
    map.setLevel(mapOption.level);
}

//로드뷰 이동 이벤트 핸들러
function moveKakaoRoadview(self){
    let panoId = rv.getPanoId(); //현 로드뷰의 panoId값을 가져옵니다.
    let viewpoint = rv.getViewpoint(); //현 로드뷰의 viewpoint(pan,tilt,zoom)값을 가져옵니다.
    self.href = 'https://map.kakao.com/?panoid='+panoId+'&pan='+viewpoint.pan+'&tilt='+viewpoint.tilt+'&zoom='+viewpoint.zoom; //Kakao 지도 로드뷰로 보내는 링크
}

//로드뷰 초기화 이벤트 핸들러
function resetRoadview(){
    //초기화를 위해 저장해둔 변수를 통해 로드뷰를 초기상태로 돌립니다.
    rv.setViewpoint({
        pan: rvResetValue.pan, tilt: rvResetValue.tilt, zoom: rvResetValue.zoom
    });
    rv.setPanoId(rvResetValue.panoId);
}