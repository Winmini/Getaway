import requests
from bs4 import BeautifulSoup

whole_area = {'서울': '1', '인천': '2', '대전': '3', '대구': '4', '광주': '5', '부산': '6', '울산': '7', '세종': '8', '경기': '31', '강원': '32', '충북': '33', '충남': '34', '경북': '35', '경남': '36', '전북': '37', '전남': '38', '제주': '39'}
Seoul_area = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']
Incheon_area = ['강화군', '계양구', '미추홀구', '남동구', '동구', '부평구', '서구', '연수구', '옹진군', '중구']
Daejeon_area = ['대덕구', '동구', '서구', '유성구', '중구']
Daegu_area = ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구']
Gwangju_area = ['광산구', '남구', '동구', '북구', '서구']
Busan_area = ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구']
Ulsan_area = ['중구', '남구', '동구', '북구', '울주군']
Sejong_area = ['세종특별자치시']
Gyeonggi_area = ['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시']
Gangwon_area = ['강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군']
Chungbuk_area = ['괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '진천군', '청원군', '청주시', '충주시', '증평군']
Chungnam_area = ['공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '천안시', '청양군', '태안군', '홍성군', '계룡시']
Gyeongbuk_area = ['경산시', '경주시', '고령군', '구미시', '군위군', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '영천시', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군', '칠곡군', '포항시']
Gyeongnam_area = ['거제시', '거창군', '고성군', '김해시', '남해군', '마산시', '밀양시', '사천시', '산청군', '양산시', '의령군', '진주시', '진해시', '창녕군', '창원시', '통영시', '하동군', '함안군', '함양군', '합천군']
Jeonbuk_area = ['고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군']
Jeonnam_area = ['강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '신안군', '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군']
Jeju_area = ['남제주군', '북제주군', '서귀포시', '제주시']


url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode'
queryParams = '?' + 'ServiceKey=' + 'lA29%2FannvhdQHnNE4mon7ZoyNq0ue6P%2FPnYQuFsfaZ7D8YedR6DOISotomyacj0u15iLaCeruqZUsGe%2F79DpRA%3D%3D' \
              + '&MobileOS=' + 'ETC' \
              + '&MobileApp=' + 'AppTest' \
              + '&areaCode=' + '35'\
              + '&numOfRows=' + '32'
url = url + queryParams
result = requests.get(url)
bs_obj = BeautifulSoup(result.content, "html.parser")

print(bs_obj)

url2 = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList'
queryParams2 = '?' + 'ServiceKey=' + 'lA29%2FannvhdQHnNE4mon7ZoyNq0ue6P%2FPnYQuFsfaZ7D8YedR6DOISotomyacj0u15iLaCeruqZUsGe%2F79DpRA%3D%3D' \
               + '&MobileOS=' + 'ETC' \
               + '&MobileApp=' + 'AppTest' \
               + '&areaCode=' + '1'

url2 = url2 + queryParams2

result2 = requests.get(url2)
bs_obj2 = BeautifulSoup(result2.content, "html.parser")
print(bs_obj2)

print(bs_obj2.find("addr1"))

area = list()
for data in bs_obj.find_all("name"):
    area.append(data.text)

print(area)
