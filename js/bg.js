$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 1000) {
            $(".people").css("background", "#fff");
        } else {
            $(".navbar").css("background", "#E7A7A7");
        }
    })
})