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