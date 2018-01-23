var indexfun = true;
var trs =supportCss3("transition");
function checkifscroll() {
    

    $(".service-banner").css("position") != "fixed" ? indexfun = false : indexfun = true;
    //console.log($(".index .service-banner").css("position"))

    if (indexfun) {//是否执行鼠标滚轮
        $(".service-banner .banneritem").css({ "min-height": 0 });
        $("body").css("overflow","hidden");
        $("html,body").animate({scrollTop: 0},0);
        // if($(".service-banner").hasClass("otherpage_down")){
        //     end_up();
        // }
    }
    else {
        $(".service-banner").attr({ "class": "service-banner" });
        $(".service-banner .banneritem").css({ "min-height": $(window).width() / 1920 * 800 });
        $("body").css("overflow","auto");
    }
}
$(function () {
    if (!trs) {
        $("body").addClass("no-ts");//添加不支持transition class；
    }

    $(".service-banner").css("position") != "fixed" ? indexfun = false : indexfun = true;
    if (indexfun) {//是否执行鼠标滚轮
        setTimeout(function(){window.scrollTo(0,0);}, 500);

        index();
    }
    checkifscroll();
    //鼠标滚动；
    $(window).resize(function () {
        //checkifscroll();
    });
   
});
var mouses = true;//是否滚动状态
function mousefun() {
    mouses = false
    var s = setInterval(function () {
        mouses = true;
        clearInterval(s)
    }, 1100)
}
var indestrue = true;
function index() {
    if (indestrue) {
        indestrue = false;
        var cur = 0, //当前滚动屏数
            up1 = false,
            down1 = true,
            pagecount=6//总共6屏
        //鼠标滚轮事件

        $(document).mousewheel(function (event, delta, deltaX, deltaY) {
            if (indexfun) {
                if($(window).scrollTop()>0&&delta<0){//向下滚动且没有露出最后一屏
                    return true;
                }
                if($(window).scrollTop()>0&&delta>0&&($(window).scrollTop()>$(".service-banner").height())){//向上滚动且没有露出最后一屏
                    return true;
                }
                if (delta < 0) {
                    if (mouses) {
                        mouses = true;
                        if (down1) {
                            up1 = true;
                            cur++;
                            cur >= pagecount ? cur = pagecount : 0;
                            cur == pagecount ? down1 = false : 0;
                            $(".right-button i").eq(cur).click();
                            mousefun()
                        }
                    }

                }
                else if (delta > 0) {
                    if (mouses) {
                        mouses = true;
                        if (up1) {
                            down1 = true;
                            cur--;
                            cur <= 0 ? cur = 0 : 0;
                            cur == 0 ? up1 = false : 0;
                            $(".right-button i").eq(cur).click();
                            mousefun()
                        }
                    }

                }
                
                return false;
            }
        })

        //键盘按下事件
        $(document).keydown(function (event) {
            if (indexfun) {
                if (event.keyCode == 40) {
                    cur++;
                    cur >= pagecount ? cur = pagecount : 0;
                    $(".right-button i").eq(cur).click();
                    mousefun()

                } else if (event.keyCode == 38) {
                    cur--;
                    cur <= 0 ? cur = 0 : 0;
                    $(".right-button i").eq(cur).click();
                    mousefun()
                }
            }
        });
        //


        var curpage = 0 //当前页码
        $(document).on("click", ".right-button i", function () {
            $(".mousebox").fadeOut();
            var c = $(this).index();
            cur = c;

            if (curpage == c) {
                return false;
            }

            $(this).addClass("on").siblings().removeClass("on");

            if (c == 0) {
                anim1_up()
            }
            if (c == 1 && curpage == 0) {
                anim2_down()
            }
            if (c == 1 && curpage == 2) {
                anim2_up()
            }
            if (c == 2 && curpage == 1) {
                anim3_down()
            }
            if (c == 2 && curpage == 3) {
                anim3_up()
            }
            if (c == 3 && curpage == 2) {
                anim4_down()
            }
            if (c == 3 && curpage == 4) {
                anim4_up()
            }
            if (c == 4 && curpage == 3) {
                anim5_down()
            }
            if (c == 4 && curpage == 5) {
                anim5_up()
            }
            if (c == 5 && curpage == 4) {
                anim6_down()
            }
            if (c == pagecount-1 && curpage == pagecount) {
                end_up()
            }
            if (c == pagecount) {
                otherpage_down()
            }
            curpage = c;
        });
    }
}

//第2屏返回第1屏
function anim1_up() {

    if (trs) {
        $(".service-banner").attr({ "class": "service-banner" }).addClass("anim1_up");
        
    }
    else {
        $(".banneritem.i2").css({ zIndex: 2 }).stop().velocity({ top: "100%" }, 800, "easeOutSine");
        $(".banneritem.i1").css({ zIndex: 1 }).stop().velocity({ top: "0" }, 800, "easeOutSine");
    }

}
//第1屏到第2屏

function anim2_down() {

   
    if (trs) {
        $(".service-banner").attr({ "class": "service-banner" }).addClass("anim2_down");
       
    }
    else {
        $(".banneritem.i1").css({ zIndex: 1 }).stop().velocity({ top: "-100%" }, 800, "easeOutSine", function () {
         
        });
        $(".banneritem.i2").css({ zIndex: 2 }).stop().velocity({ top: "0" }, 800, "easeOutSine");
    }
}
//第3屏返回第2屏
function anim2_up() {
    if (trs) {
        $(".service-banner").attr({ "class": "service-banner" }).addClass("anim2_up");
    }
    else {
        $(".banneritem.i3").css({ zIndex: 1 }).stop().velocity({ top: "100%" }, 800, "easeOutSine");
        $(".banneritem.i2").css({ zIndex: 2 }).stop().velocity({ top: "0" }, 800, "easeOutSine", function () {

        });
    }


}
//第2屏到第3屏
function anim3_down() {
    if (trs) {
        $(".service-banner").attr({ "class": "service-banner" }).addClass("anim3_down")
        
    }
    else {
        $(".banneritem.i2").css({ zIndex: 1 }).stop().velocity({ top: "-100%" }, 800, "easeOutSine", function () {
        });
        $(".banneritem.i3").css({ zIndex: 2 }).stop().velocity({ top: "0" }, 800, "easeOutSine");
    }


}
//第4屏返回第3屏
function anim3_up() {
    if (trs) {
        $(".service-banner").attr({ "class": "service-banner" }).addClass("anim3_up")
        
    }
    else {
        $(".banneritem.i4").css({ zIndex: 1 }).stop().velocity({ top: "100%" }, 800, "easeOutSine");
        $(".banneritem.i3").css({ zIndex: 2 }).stop().velocity({ top: "0" }, 800, "easeOutSine", function () { });

    }
}
//第3屏到第4屏
function anim4_down() {
    if (trs) {
        $(".service-banner").attr({ "class": "service-banner" }).addClass("anim4_down")
        
    }
    else {
        $(".banneritem.i3").css({ zIndex: 1 }).stop().velocity({ top: "-100%" }, 800, "easeOutSine", function () {
           
        });
        $(".banneritem.i4").css({ zIndex: 2 }).stop().velocity({ top: "0" }, 800, "easeOutSine");
    }
}
//第5屏返回第4屏
function anim4_up() {
    if (trs) {
        $(".service-banner").attr({ "class": "service-banner" }).addClass("anim4_up")
        
    }
    else {

        $(".banneritem.i4").css({ zIndex: 2 }).stop().velocity({ top: "0" }, 800, "easeOutSine", function () { });
        $(".banneritem.i5").css({ zIndex: 1 }).stop().velocity({ top: "100%" }, 800, "easeOutSine");
    }
}
//第4屏到第5屏
function anim5_down() {
    if (trs) {
        $(".service-banner").attr({ "class": "service-banner" }).addClass("anim5_down")
        
    }
    else {
        $(".banneritem.i4").css({ zIndex: 1 }).stop().velocity({ top: "-100%" }, 800, "easeOutSine", function () {
           
        });
        $(".banneritem.i5").css({ zIndex: 2 }).stop().velocity({ top: "0" }, 800, "easeOutSine");
    }
}
//第6屏返回第5屏
function anim5_up() {
    if (trs) {
        $(".service-banner").attr({ "class": "service-banner" }).addClass("anim5_up")
        
    }
    else {

        $(".banneritem.i5").css({ zIndex: 2 }).stop().velocity({ top: "0" }, 800, "easeOutSine", function () { });
        $(".banneritem.i6").css({ zIndex: 1 }).stop().velocity({ top: "100%" }, 800, "easeOutSine");
    }
}
//第5屏到第6屏
function anim6_down() {
    if (trs) {
        $(".service-banner").attr({ "class": "service-banner" }).addClass("anim6_down")
        
    }
    else {
        $(".banneritem.i5").css({ zIndex: 1 }).stop().velocity({ top: "-100%" }, 800, "easeOutSine", function () {
           
        });
        $(".banneritem.i6").css({ zIndex: 2 }).stop().velocity({ top: "0" }, 800, "easeOutSine");
    }
}
//由底部其他内容滚回到最后一屏
function end_up() {
    $("body").css("overflow","hidden");
    if (trs) {
        $("html,body").animate({scrollTop: 0},0);
        $(".service-banner").attr({ "class": "service-banner" }).addClass("end_up");
        $(".banneritem.end").attr({ style: "" });
       
    }
    else {
        $("html,body").animate({scrollTop: 0},0);
        $(".service-banner").removeClass("otherpage_down");
        $(".banneritem.end").attr({ style: "" });
        $(".banneritem.end").css({ zIndex: 2 }).stop().velocity({ top: "0" }, 800, "easeOutSine", function () { });

    }
}
//最后一屏到下面其他页面（跳出）
function otherpage_down() {
    $("body").css("overflow","auto");
    $(".service-banner").attr({ "class": "service-banner" }).addClass("otherpage_down");
    $(".service-banner .banneritem.end").height($(window).height()-$(".header").height());
    
    $("html,body").animate({scrollTop: $(".service-banner").height()}, 800);
    
}
