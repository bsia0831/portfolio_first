//쿠키에서 popup=done이라는 문자열의 순서값을 저장 
//해당 문자자체가 없으면 isCookie변수에는 -1 반환 
//isCookie 가 -1 이면  쿠키가 현재 없는 것임  
//indexOf :문자열위치 찾는 메소드 -있으면 0  반환 /없으면 -1 반환
var isCookie = document.cookie.indexOf("popup=done");
console.log(isCookie);

//처음 로딩시에 쿠키가 없으면 팝업을 보이고 
if (isCookie == -1) {
    $("#popup").show();
    console.log("쿠키없음");
} else {
    //쿠키가 있으면 팝업을 숨김 
    $("#popup").hide();
    console.log("쿠키있음");
}

//팝업 닫기 버튼을 클릭했을 때 
$("#popup .accpet").on("click", function (e) {
    e.preventDefault();

    $(this).setCookie(1);
    //체크가 되어 있는지 변수에 저장  
    var isChecked = $("#popup").find("input[type=checkbox]").is(":checked");

    //체크가 되어 있으면 setCookie함수 실행 
    if (isChecked) setCookie(1);

    $("#popup").hide();
});

$("#popup .close").on("click", function (e) {
    e.preventDefault();

    $("#popup").hide();
});

//쿠키 생성 함수 정의 
//해당 함수가 실행되는 날짜에서 인수로 받은 날짜만큼 유효기간 설정 
function setCookie(time) {
    var today = new Date(); //2021 10 14 14:22:24
    var date = today.getDate(); //14 

    today.setDate(date + time); //14+1 = 15 

    var duedate = today.toGMTString(); //2021 10 15 14:22:24

    //쿠키 생성 코드 
    document.cookie = "popup=done; expires=" + duedate;
}