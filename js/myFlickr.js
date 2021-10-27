//로딩시
getList({
    type: "userid",
    user_id: "82828410@N02"
});


//검색창에 검색어 입력후 클릭시 
$("#searchBox button").on("click", function () {

    $("#gallery ul").removeClass("on");
    $(".loading").removeClass("off");
    var inputs = $("#searchBox input").val();
    $("#searchBox input").val("");

    getList({
        type: "search",
        tag: inputs
    });
});

//검색어 입력후 enter 이벤트
$(window).on("keypress", function (e) {
    if (e.keyCode == 13) {

        $("#gallery ul").removeClass("on");
        $(".loading").removeClass("off");
        var inputs = $("#searchBox input").val();
        $("#searchBox input").val("");

        getList({
            type: "search",
            tag: inputs
        });
    }
})

//제목 클릭시 다시 초기 상태로
$(".content h1").on("click", function () {
    $("#gallery ul").removeClass("on");
    $(".loading").removeClass("off");

    getList({
        type: "userid",
        user_id: "82828410@N02"
    })
})

//리스트 클릭시 팝업생성
$("body").on("click", "#gallery ul li", function (e) {
    e.preventDefault();
    let imgSrc = $(this).find("a").attr("href");

    $("body").append(
        $("<div class='pop'>")
        .append(
            $("<img>").attr({
                src: imgSrc
            }),
            $("<span>").text("close")
        )
    )
});

//닫기버튼 클릭시 팝업제거
$("body").on("click", ".pop span", function () {
    $(".pop").remove();
});


function getList(opt) {
    var result_opt = {};

    if (opt.type == "interest") {
        result_opt = {
            url: "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList",
            dataType: "json",
            data: {
                api_key: "d61e30a1010fe3e1dab106d3a2df0f21",
                per_page: 9,
                format: "json",
                nojsoncallback: 1,
                privacy_filter: 1
            }
        }
    }

    if (opt.type == "search") {
        result_opt = {
            url: "https://www.flickr.com/services/rest/?method=flickr.photos.search",
            dataType: "json",
            data: {
                api_key: "d61e30a1010fe3e1dab106d3a2df0f21",
                per_page: 9,
                format: "json",
                nojsoncallback: 1,
                privacy_filter: 1,
                tags: opt.tag
            }
        }
    }

    if (opt.type == "userid") {
        result_opt = {
            url: "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos",
            dataType: "json",
            data: {
                api_key: "d61e30a1010fe3e1dab106d3a2df0f21",
                per_page: 9,
                format: "json",
                nojsoncallback: 1,
                privacy_filter: 1,
                user_id: opt.user_id
            }
        }
    }
    $.ajax(result_opt)
        .success(function (data) {
            let items = data.photos.photo;

            $("#gallery").empty();
            $("#gallery").append("<ul>");

            $(items).each(function (index, data) {
                let text = data.title;
                if (!data.title) {
                    text = "No description in this photo";
                }

                //데이터의 갯수만큼 반복을 돌며 li의 동적요소 생성
                $("#gallery ul")
                    .append(
                        $("<li>")
                        .append(
                            $("<div>").append(
                                $("<a>").attr({
                                    href: "https://live.staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_b.jpg"
                                })
                                .append(
                                    $("<img class='thumb'>").attr({
                                        src: "https://live.staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_m.jpg"
                                    })
                                ),
                                $("<hr>"),
                                $("<p>").text("Lorem, ipsum dolor."),
                                $("<h3>").text(text),

                                $("<div class='profile'>")
                                .append(
                                    $("<span>").text(data.owner),
                                ),

                                $("<div class='location'>")
                                .append(
                                    $("<span>").text("Canada"),
                                )

                            )
                        )
                    ) //gallery append ends       
            });

            //모든 li가 완성되고 img 요소 생성후 
            //모든 소스이미지까지 로딩완료되면 isotope레이아웃 적용
            const total = $("#gallery ul li").length;
            let imgNum = 0;

            $("#gallery img").each(function (index, data) {
                data.onerror = function () {
                    $(data).attr("src", "img/default.jpg");
                }

                data.onload = function () {
                    imgNum++;

                    if (imgNum === total) {
                        $(".loading").addClass("off");

                        new Isotope("#gallery ul", {
                            itemSelector: "#gallery ul li",
                            columnWidth: "#galley ul li",
                            transitionDuration: "0.5s"
                        });

                        $("#gallery ul").addClass("on");
                    }
                }
            });
        })
        .error(function (err) {
            console.err("데이터를 호출하는데 실패했습니다");
        });
}