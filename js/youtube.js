getYoutube({
    frame: ".vidGallery",
    playlist: "PLYOPkdUKSFgX5CgKf68RJzJHec0XEdBNd",
    num: 4
});


getYoutube({
    frame: ".vidGallery2",
    playlist: "PLYOPkdUKSFgXiJXlCnCmIoeK_QReBgOlu",
    num: 4
})

getYoutube({
    frame: ".vidGallery3",
    playlist: "PLY0mI6VcY3Yg5TR5noLNpoNOhoK4yjtdB",
    num: 4
})

function getYoutube(opt) {
    if (opt.frame === undefined) console.error("frame속성값은 필수 입력사항입니다.");
    if (opt.playlist === undefined) opt.playlist = "PLYOPkdUKSFgWPLsAWpqRpK0cCiAGdxi-Y";
    if (opt.num === undefined) opt.num = 2;

    $.ajax({
            url: "https://www.googleapis.com/youtube/v3/playlistItems",
            dataType: 'jsonp',
            data: {
                part: "snippet",
                key: "AIzaSyDecgEaI4ClJpBehW8ABU-cHevtQhXlThI",
                maxResults: opt.num,
                playlistId: opt.playlist
            }
        })
        .success(function (data) {
            let items = data.items;

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

                $(opt.frame)
                    .append(
                        $("<article>")
                        .append(
                            $("<a>").attr({
                                href: data.snippet.resourceId.videoId
                            })
                            .append(
                                $("<img>").attr({
                                    src: data.snippet.thumbnails.high.url
                                })
                            ),
                            $("<div class='con'>")
                            .append(
                                $("<h2>").text(data.snippet.title),
                                $("<p>").text(txt),
                                $("<span>").text(date)
                            )
                        )
                    )
            });
        })
        .error(function (err) {
            console.error(err);
        });

    //썸네일 클릭시 레이어팝업으로 유튜브 영상 호출하기 
    $("body").on("click", opt.frame + " article a", function (e) {
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
                        allowfullscreen: true
                    }),
                    $("<span>").text("close")
                )
            )
    });

    $("body").on("click", ".pop span", function () {
        $(".pop").remove();
    });
}







$.ajax({
        url: "https://www.googleapis.com/youtube/v3/playlistItems",
        dataType: 'jsonp',
        data: {
            part: "snippet",
            key: "AIzaSyDecgEaI4ClJpBehW8ABU-cHevtQhXlThI",
            maxResults: 5,
            playlistId: "PLY0mI6VcY3Yg5TR5noLNpoNOhoK4yjtdB"
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
                                src: data.snippet.thumbnails.high.url
                            })
                        ),
                        $("<div class='con'>")
                        .append(
                            $("<h2>").text(data.snippet.title),
                            $("<p>").text(txt),
                            $("<span>").text(date)
                        )
                    )
                )

            $("#vidGallery2")
                .append(
                    $("<article>")
                    .append(
                        $("<a>").attr({
                            href: data.snippet.resourceId.videoId
                        })
                        .append(
                            $("<img>").attr({
                                src: data.snippet.thumbnails.high.url
                            })
                        ),
                        $("<div class='con'>")
                        .append(
                            $("<h2>").text(data.snippet.title),
                            $("<p>").text(txt),
                            $("<span>").text(date)
                        )
                    )
                )

            $("#vidGallery3")
                .append(
                    $("<article>")
                    .append(
                        $("<a>").attr({
                            href: data.snippet.resourceId.videoId
                        })
                        .append(
                            $("<img>").attr({
                                src: data.snippet.thumbnails.high.url
                            })
                        ),
                        $("<div class='con'>")
                        .append(
                            $("<h2>").text(data.snippet.title),
                            $("<p>").text(txt),
                            $("<span>").text(date)
                        )
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

// 썸네일 클릭시 레이어팝업으로 유튜브 영상 호출하기
$("body").on("click", "#vidGallery2 article a", function (e) {
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

$("body").on("click", "#vidGallery3 article a", function (e) {
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

$("body").on("click", ".pop span", function () {
    $(".pop").remove();
});