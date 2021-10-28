const swiper = new Swiper('#visual_sub .wrap', {
    //좌우버튼 옵션
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    //페이징 버튼 옵션 
    pagination: {
        el: ".swiper-pagination",
        type: "fraction" //현재슬라이드/전체슬라이드수
    },
    loop: true, //순환여부 결정 
    speed: 500, //슬라이딩 속도 
    direction: "horizontal", //슬라이딩 방향 vertical:세로 
    spaceBetween: 0, //사이간격( 숫자 px )
    slidesPerView: "auto", // 하나의 화면당 보일 패널의 갯수 
    centeredSlides: true, //활성화 슬라이드를 화면 가운데 배치
    grabCursor: true, //마우스 커서 모양 변경 
    //자동롤링 
    autoplay: {
        delay: 1000,
        disableOnInteraction: true
        //false : 롤링중에 스와이프되더라도 계속 롤링 
        //true : 롤링중에 스와이프되면 롤링 중지 
    },
    effect: "coverflow", //cube 효과         
    coverflowEffect: {
        rotate: 50, //슬라이드 회전 각도 
        stretch: -100, //슬라이드 간 거리, 클수록 많이 겹침 
        depth: 400, //깊이 효과값 
        modifier: 1, //효과 배수 
        slideShadows: false, //슬라이더 그림자 
    },
});

var btnStart = document.querySelector(".btnStart");
var btnStop = document.querySelector(".btnStop");

swiper.autoplay.stop();

btnStart.onclick = function () {
    swiper.autoplay.start();
}
btnStop.onclick = function () {
    swiper.autoplay.stop();
}