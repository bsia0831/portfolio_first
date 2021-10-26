//DOM Caching
const $frame = $(".faq .inner .right .wrap"); 
const $btns = $frame.find("dt"); 
const $boxs = $frame.find("dd");  
let speed = 500; 

//event binding 
$btns.on("click", function(e){
    e.preventDefault(); 
    //클릭한 dt에 on이 있는지 판별하여 isOn에 담기 
    var isOn = $(this).hasClass("on"); 

    //isOn이 참이라면 
    if(isOn){ //이미 클릭해서 on이 있는 상태라면 
        //클릭한 dt에 on을 제거 
        $(this).removeClass("on");
        //클릭한 dt의 다음에 있는 dd를 안보이게 처리  
        $(this).next().slideUp(speed); 
    }else{
        //on이 없다면 
        //클릭한 dt에 on 활성화 
        $(this).addClass("on"); 
        //클릭한 dt의 다음 dd를 보이게 처리 
        $(this).next().slideDown(speed); 
    }

    
});

/*
.slideDown(speed) - show()와 같이 보이게 처리 
.slideUp(speed) - hide()와 같이 숨김 처리 
*/