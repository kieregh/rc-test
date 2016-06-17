<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">

<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<link href="http://kimsq.github.io/rc/dist/css/ratchet.css" rel="stylesheet">
<link href="http://kimsq.github.io/rc/dist/css/rc-plus.css" rel="stylesheet">
<link href="http://www.withconsumer.net/rc-test/dist/css/material-modal2.css" rel="stylesheet">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<link href="http://www.withconsumer.net/rc-test/dist/css/gmail.css" rel="stylesheet">

<script src="http://211.253.8.119/plugins/jquery/1.11.2/jquery-1.11.2.min.js" type="text/javascript"></script>

<title>Gmail Demo - Material Zoom in effect</title>

</head>
<body>
    

<div class="snap-content" id="content-wrap">

    <header class="bar bar-nav rb-inverse" id="main-header">

        <button class="btn btn-link btn-nav pull-left" data-drawer-open="left">
            <span class="icon icon-bars rc-main"></span>
            <span class="icon icon-left-nav rc-view"></span>
        </button>


        <span id="list-header" class="">
            <button href="#search" data-toggle="modal" class="btn btn-link btn-nav pull-right">
                <span class="icon icon-search"></span>
            </button>
            <button data-location="reload" class="btn btn-link btn-nav pull-right">
                <span class="icon icon-refresh"></span>
            </button>
            <h1 class="title">
                받은편지함
            </h1>
        </span>
        <span id="view-header" class="rb-hidden">
            <button class="btn btn-link btn-nav pull-right">
                <span class="icon icon-more-vertical"></span>
            </button>
            <button class="btn btn-link btn-nav pull-right">
                <span class="icon fa fa-envelope-o"></span>
            </button>
            <button class="btn btn-link btn-nav pull-right">
                <span class="icon fa fa-trash"></span>
            </button>
            <button class="btn btn-link btn-nav pull-right">
                <span class="icon fa fa-archive"></span>
            </button>
            <h1 class="title">
            </h1>
        </span>
    </header>


    <div id="page-home" class="page transition center">
        <div class="rb-floating-br">
            <div class="rb-floating-wrap">
                <a href="#compose" data-toggle="page" data-start="#page-home" class="rb-floating-button-main">
                    <i class="rb-floating-icon fa fa-pencil"></i>
                </a>
            </div>
        </div>
        <div class="content">
            <div class="table-view">
                <?php for($i=1;$i<15;$i++):?>
                 <div class="modal__trigger table-view-cell media rippler rippler-rc-inverse" data-toggle="modal" data-target="#myModal" data-self="true" data-title="메일주셔서 감사드립니다. 검토하고 연락드리도록 하겠습니다._<?php echo $i?>">
                      <a>
                        <span class="media-object pull-left fa-stack fa-lg">
                            <i class="fa fa-circle fa-stack-2x"></i>
                            <i class="fa fa-stack-1x fa-inverse"><?php echo $i?></i>
                        </span>
                        <span class="badge badge-inverted rb-time">오전 10:43</span>
                        <span class="badge badge-inverted pull-right icon icon-star rb-bookmark"></span>
                        <div class="media-body">
                            홍길동-<?php echo $i?>
                            <p>메일주셔서 감사드립니다. 검토하고 연락드리도록 하겠습니다.- <?php echo $i?></p>
                        </div>
                        </a>
                  </div>
                <?php endfor?>
   
            </div>
        </div>
    </div>
    <div id="compose" class="page right">
        <header class="bar bar-nav rb-inverse">
            <a data-history="back" class="btn btn-link btn-nav pull-left">
            <span class="icon icon-left-nav"></span>
            </a>
            <button class="btn btn-link btn-nav pull-right">
            <span class="icon icon-more-vertical"></span>
            </button>
            <button class="btn btn-link btn-nav pull-right">
            <span class="icon fa fa-paper-plane"></span>
            </button>
            <button class="btn btn-link btn-nav pull-right">
            <span class="icon fa fa-paperclip"></span>
            </button>
            <h1 class="title">편지쓰기</h1>
        </header>

        <div class="content" style="top:0">
            <form class="input-group">
                <div class="input-row rb-navigate-down">
                    <label>보낸사람</label>
                    <select>
                        <option label="선택하세요" disabled="disabled">선택하세요</option>
                        <option>test@email.com</option>
                        <option>test2@email.com</option>
                        <option>test3@email.com</option>
                    </select>
                </div>
                <div class="input-row rb-navigate-down">
                    <label>받는사람</label>
                    <input type="text" placeholder="">
                </div>
                <input type="text" placeholder="제목">
                <textarea rows="2" placeholder="이메일 작성"></textarea>
            </form>
        </div>
    </div>
<!-- modal 시작 -->
    <div id="myModal" class="material-modal">
        <div class="modal__content content">
             <div class="content">
                <header>
                    <ul class="table-view">
                        <li class="table-view-cell media">
                            <a class="navigate-right">
                                <span class="badge badge-inverted pull-right icon icon-star rb-bookmark"></span>
                                <div class="media-body">
                                <h4>메일 주셔서 감사드립니다. 오후에 연락드리겠습니다.</h4>
                                <p><span class="badge">받은편지함</span> <span class="badge badge-negative">중요</span></p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </header>
                <section>
                    <ul class="table-view">
                        <li class="table-view-cell media">
                            <a class="navigate-right">
                                <img class="media-object pull-left" src="./image/noavatar-blue.png">
                                <span class="badge badge-inverted pull-right icon icon-more-vertical rb-more"></span>
                                <span class="badge badge-inverted pull-right icon fa fa-share rb-foward"></span>
                                <div class="media-body">
                                    홍길동
                                    <p>받는사람 : break, tester</p>
                                    <p>
                                        <span class="badge badge-inverted">오후 2:52</span> 
                                        <span class="badge badge-primary badge-inverted">세부정보 보기</span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </section>
                <article class="content-padded">

                    <p>국제 과학학술지 네이처는 지난달 28일 구글의 인공지능(AI) 바둑 프로그램 '알파고'가 유럽 바둑 챔피언 판후이를 꺾자 이렇게 평가했다. AI가 바둑으로 인간을 이긴 것은 이번이 처음이다. 1997년 체스 챔피언, 2011년 퀴즈쇼 챔피언을 누른 데 이어 AI의 발전 역사에 또 하나의 이정표가 남게 됐다. 학술적 개념으로서의 AI가 탄생한 지 60년만에 이룩한 '쾌거'다.</p>
                </article>
            </div>
         </div>
    </div>
<script src="http://www.withconsumer.net/rc-test/dist/js/rc-control.js"></script>
<script src="http://www.withconsumer.net/rc-test/dist/js/rc-component.js"></script>
<script src="http://www.withconsumer.net/rc-test/dist/js/rc-extension.js"></script>
<script>
// .rippler ripple 효과 초기화 
$(document).ready(function() {
  $(".rippler").rippler({duration:200});
});

$('#myModal').on('shown.rc.modal', function() {
    $('#view-header').removeClass('rb-hidden')
    $('#list-header').addClass('rb-hidden')
    $('#main-header').addClass('active')
    $('#main-header .btn-nav.pull-left').attr("data-history","back").removeAttr("data-drawer-open");
    setTimeout(function(){
        $('#page-home').css({
           'transform': 'scale(0.95)'
        });     
    },300)
   
})
$('#myModal').on('hidden.rc.modal', function() {
    $('#view-header').addClass('rb-hidden')
    $('#list-header').removeClass('rb-hidden')
    $('#main-header').removeClass('active')
    $('#main-header .btn-nav.pull-left').attr("data-drawer-open","left").removeAttr("data-history");
     $('#page-home').css({
       'transform': 'scale(1)'
    });
})
$('#compose').on('shown.rc.modal', function() {
    $('#main-header').addClass('rb-hidden')
})
$('#compose').on('hidden.rc.modal', function() {
    $('#main-header').removeClass('rb-hidden')
})

</script>
</body>
</html>