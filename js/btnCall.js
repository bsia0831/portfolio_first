var btnCall = document.querySelector(".btnCall"); 

var menuMo = document.querySelector(".menuMo"); 

var closeBtn = document.querySelector(".closeBtn"); 


btnCall.onclick = function(e){
    e.preventDefault(); 

    menuMo.classList.add("on"); 
}

closeBtn.onclick = function(e){
    e.preventDefault(); 

    menuMo.classList.remove("on"); 
}


//마우스 호버시 2depth 활성화 
$("#gnb>li").off("mouseenter").on("mouseenter", function(){
    $(this).find(".sub").slideDown(); 
});

$("#gnb>li").on("mouseleave", function(){
    $(this).find(".sub").hide(); 
});

//포커스 이동시 2depth 활성화 
//.each(function(){}) - 배열반복문
$("#gnb>li").each(function(index){

    //1depth li에서 첫번째 a요소에 focusin이벤트 연결 
    $("#gnb>li").eq(index).find("a").on("focusin", function(){
        $("#gnb>li").eq(index).find(".sub").show(); 
    }); 

    //1depth li에서 마지막 a요소에 focusout 이벤트 연결 
    $("#gnb>li").eq(index).find("a").last().on("focusout", function(){
        $("#gnb>li").eq(index).find(".sub").hide(); 
    })
})