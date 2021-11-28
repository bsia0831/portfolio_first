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
    $(this).find(".sub").show(); 
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


//DOM Caching
var listCall = document.querySelector(".transition_btn"); 

var visual = document.querySelector(".main-visual"); 

var list = document.querySelector(".list"); 

var list_img = document.querySelector("img"); 


listCall.onclick = function(e){
    e.preventDefault(); 

    visual.classList.add("on"); 
    list.classList.add("on"); 
}

list_img.onclick = function(e){
    e.preventDefault(); 

    visual.classList.remove("on"); 
    list.classList.remove("on"); 
}