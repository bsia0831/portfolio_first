$.ajax({
    url:"https://www.flickr.com/services/rest/?method=flickr.photos.search",
    //url:"https://www.flickr.com/services/rest/?method=flickr.interestingness.getList", 
    dataType:"json", 
    data:{
        api_key:"d61e30a1010fe3e1dab106d3a2df0f21", 
        per_page: 10, 
        format:"json",
        nojsoncallback:1, //json객체를 감싸고 있는 wrapping 함수를 걷어냄 
        privacy_filter : 5, 
        tags :"park" // 검색할 이미지 키워드 입력 - method가 photos.search일 때 (interestingnesss일때는 주석처리)
    }
})
.success(function(data){
    console.log(data.photos.photo); 
    let items = data.photos.photo; 

    //#gallery프레임안에 ul 태그 생성 
    $("#gallery").append("<ul>");

    //이미지 데이터 갯수만큼 안쪽 코드 반복 
    $(items).each(function(index, data){

        //변수 text에 이미지 데이터의 title을 담음 
        let text = data.title; 
        //본문 텍스트 내용이 200글자를 넘어가면 말줄임표 붙이기 
        let len = text.length;
        if (len > 40) {
            txt = txt.substr(0, 40) + "..."
        }
        
        //만약 해당 이미지 데이터에 제목 텍스트가 없으면 
        if(!data.title){
            //변수 text에 임의의 텍스트를 저장하여 추후 발생할 수 있는 오류 방지 
            text = "No description in this photo"; 
        }

        //#gallery ul 프레임에 이미지 데이터 갯수만큼 반복을 돌면서 li 생성 
        $("#gallery ul")
            .append(
                $("<li>")
                .append(
                    $("<div class='inner'>")
                        //다시 자식으로 p태그 생성해서 이미지 제목 출력
                        .append(
                            //a태그를 만들어서 큰 이미지의 주소를 href속성에 대입
                            $("<a>").attr({
                                href : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                            })
                            .append(
                                //다시 a태그안쪽에 img태그를 만들어서 작은 이미지 주소값을 대입하여 썸네일 생성 
                                $("<img>").attr({
                                    src : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_m.jpg"
                                })
                            )
                        )
                        .append(
                            $("<p>").text(text)
                        )
                    )
            )
    })
})
.error(function(err){
    console.err("데이터를 호출하는데 실패했습니다"); 
})


//리스트의 버튼 클릭했을 때 레이어팝업으로 큰 이미지 출력하기 
$("body").on("click", "#gallery ul li", function(e){
    e.preventDefault(); 

    let imgSrc = $(this).children("a").attr("href"); 

    $("body").append(
        $("<div class='pop'>")
            .append(
                $("<img>").attr({ src : imgSrc}),
                $("<span>").text("close")
            )
    )
});

$("body").on("click", ".pop span", function(){
    $(".pop").remove(); 
});