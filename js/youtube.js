$.ajax({
    url: "https://www.googleapis.com/youtube/v3/playlistItems",
    dataType: 'jsonp',
    data: {
        part: "snippet",
        key: "AIzaSyDecgEaI4ClJpBehW8ABU-cHevtQhXlThI",
        maxResults: 9,
        playlistId: "PLY0mI6VcY3Yg5TR5noLNpoNOhoK4yjtdB",
        
    }

})
.success(function (data) {
// console.log(data); 

let items = data.items;
console.log(items);

//영상 갯수만큼 반복
$(items).each(function (index, data) {

    //본문 텍스트 내용이 200글자를 넘어가면 말줄임표 붙이기 
    let txt = data.snippet.description;
    let len = txt.length;
    if (len > 200) {
        txt = txt.substr(0, 200) + "..."
    }

    //날짜 텍스트 정리 
    let date = data.snippet.publishedAt;
    date = date.split("T")[0];
    //console.log(date);  

    $("#vidGallery")
        .append(
            $("<article>")
            .append(
                $("<a>").attr({
                    href: data.snippet.resourceId.videoId
                })
                .append(
                    $("<img>").attr({
                        src: data.snippet.thumbnails.medium.url
                    })
                ),
                // $("<div class='con'>")
                // .append(
                //     $("<h2>").text(data.snippet.title),
                //     $("<p>").text(txt),
                //     $("<span>").text(date)
                // )
            )
        )
});
})
.error(function (err) {
console.error(err);
})

// 썸네일 클릭시 레이어팝업으로 유튜브 영상 호출하기
$("body").on("click", "#vidGallery article a", function (e) {
e.preventDefault();

let vidId = $(this).attr("href");

$("body")
    .append(
        $("<div class='pop'>")
        .append(
            $("<iframe>")
            .attr({
                src: "https://www.youtube.com/embed/" + vidId,
                frameborder: 0,
                width: "100%",
                height: 600
            }),
            $("<span>").text("close")
        )
    )
})

$("body").on("click", "#vidGallery article a", function (e) {
    e.preventDefault();

    let vidId = $(this).attr("href");

    $("body")
        .append(
            $("<div class='pop'>")
            .append(
                $("<iframe>")
                .attr({
                    src: "https://www.youtube.com/embed/" + vidId,
                    frameborder: 0,
                    width: "100%",
                    height: 600
                }),
                $("<span>").text("close")
            )
        )
});

$("body").on("click", ".pop span", function () {
    $(".pop").remove();
});