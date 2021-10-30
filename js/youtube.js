getYoutube({
    frame: ".vidGallery",
    playlist: "PLY0mI6VcY3Yh5L1xHNoQnEArQHqIclH8h",
    num: 4
});


getYoutube({
    frame: ".vidGallery2",
    playlist: "PLY0mI6VcY3YgEIbb1OqL-kiYqgKS5dZwR",
    num: 4
})

getYoutube({
    frame: ".vidGallery3",
    playlist: "PLY0mI6VcY3YhAelb2icNk03baDBXvX60H",
    num: 4
})

function getYoutube(opt){ 
    if(opt.frame===undefined) console.error("frame속성값은 필수 입력사항입니다.");
    if(opt.playlist===undefined) opt.playlist = "PLYOPkdUKSFgWPLsAWpqRpK0cCiAGdxi-Y";
    if(opt.num===undefined) opt.num = 2;

    $.ajax({
        url:"https://www.googleapis.com/youtube/v3/playlistItems",
        dataType : 'jsonp',
        data :{
            part : "snippet", 
            key : "AIzaSyCbARLbftvbPSX5cjABTy1LZpet3RVkrh4", 
            maxResults : opt.num, 
            playlistId : opt.playlist
        }
    })
    .success(function(data){   
        let items = data.items;         
    
        //영상 갯수만큼 반복
        $(items).each(function(index, data){
            //본문 텍스트 내용이 200글자를 넘어가면 말줄임표 붙이기 
            let txt = data.snippet.description; 
            let len = txt.length; 
            if(len>200){
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
                            $("<a>").attr({ href : data.snippet.resourceId.videoId })
                                    .append(
                                        $("<img>").attr({ src : data.snippet.thumbnails.high.url })
                                    ),
                            $("<div class='con'>")
                                    .append(
                                        $("<h2>")
                                            .text(data.snippet.title)
                                            .attr({href : data.snippet.resourceId.videoId })
                                        ,
                                        $("<p>").text(txt),
                                        $("<span>").text(date)
                                    )
                        )
                )
        });
    })
    .error(function(err){
        console.error(err); 
    });

    //썸네일 클릭시 레이어팝업으로 유튜브 영상 호출하기 
    $("body").on("click", opt.frame+" article a", function(e){
        e.preventDefault(); 
        createPop(this);
    });

    $("body").on("click", opt.frame+" article h2", function(){
        createPop(this);
    });

    $("body").on("click", ".pop span", function(){
        $(".pop").remove(); 
    });
    

    function createPop(item){
        let vidId = $(item).attr("href"); 

        $("body")
            .append(
                $("<div class='pop'>")
                    .append(
                        $("<iframe>")
                            .attr({
                                src : "https://www.youtube.com/embed/"+vidId,
                                frameborder : 0   ,
                                allowfullscreen : true                         
                            }), 
                        $("<span>").text("close")
                    )
            )
    }
}