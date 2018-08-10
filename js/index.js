$(function () {
    banner();

    initScorll();

    $('[data-toggle="tooltip"]').tooltip();
});

var banner=function () {

    var getDate=function (callback) {
        if(window.data){
            return callback && callback(window.data);
        }
        else {
            $.ajax({
                url:'js/index.json',
                type:'get',
                dataType:'json',
                success:function (data) {
                    window.data = data;
                    return callback && callback(window.data);
                }
            });
        }

    };

    var trans=function() {
        getDate(function (sense) {
            var isMobile = $(window).width() < 768;//得到true或false

            var dotHtml = template('dotTemplate', {list: sense});
            var imgHtml = template('imgTemplate', {list: sense, isM: isMobile});


            $('.carousel-indicators').html(dotHtml);
            $('.carousel-inner').html(imgHtml);
        });
    }

    $(window).on('resize',function () {
        trans();
    }).trigger('resize');

    /*移动端手势切换事件*/
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    /*originalEvent 代表js原生事件*/
    $('.banner').on('touchstart',function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function (e) {
        /*距离足够 50px 一定要滑动过*/
        if(isMove && Math.abs(distanceX) > 50){
            /*手势*/
            /*左滑手势*/
            if(distanceX < 0){
                //console.log('next');
                $('.carousel').carousel('next');
            }
            /*右滑手势*/
            else {
                //console.log('prev');
                $('.carousel').carousel('prev');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
    });
}

var initScorll=function () {

    var $navTab=$('.tab .nav_parent ul');
    var ulWidth=0;
    $navTab.find('li').each(function (i,item) {
        ulWidth += $(this).outerWidth(true);
    });
    $navTab.width(ulWidth);
    //IScroll第一个参数必须为DOM对象，需要转换
    new IScroll($('.nav_parent')[0],{
        scrollX:true,
        scrollY:false,
        click:true
    });
}
