const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
const branch_btns = document.querySelectorAll(".branch li");
const options = { //지도를 생성할 때 필요한 기본 옵션
   center: new kakao.maps.LatLng(37.5109446, 127.0567967), //지도의 중심좌표.
   level: 3 //지도의 레벨(확대, 축소 정도)
};

const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

//마커표시하기 -----------------------------------------------------------
const markerOptions = [{
      title: "본점",
      latlng: new kakao.maps.LatLng(37.5109446, 127.0567967),
      imgSrc: "img/marker.png",
      imgSize: new kakao.maps.Size(50, 50),
      imgPos: {
         offset: new kakao.maps.Point(50, 50)
      },
      button: branch_btns[0]
   }
];

new kakao.maps.Marker({
   map: map,
   position: markerOptions[0].latlng,
   title: markerOptions[0].title,
   image: new kakao.maps.MarkerImage(markerOptions[0].imgSrc, markerOptions[0].imgSize, markerOptions[0].imgPos)
});

function moveTo(target) {
   // 이동할 위도 경도 위치를 생성합니다 
   var moveLatLon = target;

   // 지도 중심을 이동 시킵니다
   map.setCenter(moveLatLon);
}


//브라우저 사이즈를 변경할 때 마커이미지와 지도 중심 가운데로 유지 
window.onresize = () => {
   //활성화된 버튼의 data-index값 구하기  
   var active_btn = document.querySelector(".branch li.on");
   var active_index = active_btn.getAttribute("data-index");
   console.log(active_index);
   map.setCenter(markerOptions[0].latlng)
}


//지도 이동 막기 
setDraggable(true);
// 버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용합니다
function setDraggable(draggable) {
   // 마우스 드래그로 지도 이동 가능여부를 설정합니다
   map.setDraggable(draggable);
}

//지도 확대 축소 켜기 //끄기는 false  
setZoomable(true);
// 버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
function setZoomable(zoomable) {
   // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
   map.setZoomable(zoomable);
}