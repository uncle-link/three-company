/// <reference path="jquery.js" />

$(function () {
    var bon = true;
    var s;
    // var alt = window.location.host
        
    // if (!window.location.hash=="")
    // {        
    //     window.location.href = "http://" + alt+ window.location.hash.toString().substr(1);//链接跳转
    // }
    $(document).on("click", ".case-bon.prve,.case-bon.next", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var url = $(this).attr("href");
        if (url == "javascript:void(0);") {
            alert("暂无下一页数据")
            return false;
        } else { 

        if (bon)
        {
                bon = false;
                var leftn = $(this).hasClass("prve") ? true : false;
                var l = leftn ? "100%" : "-100%";
            
                s = setInterval(function () {
                    $(".ajax-l-box").append("<div class='load-aa'>加载中…</div>");
                    clearInterval(s);
                }, 400);

                if (leftn) {
                    $(".ajax-l-box").addClass("leftn")
                } else {
                    $(".ajax-l-box").removeClass("leftn")
                }

                $.ajax({
                    type: "get",
                    url: url,
                    dataType: "html",
                    context: document.body,
                    success: function (msg) {
                        $(".curr-box.next").html($(msg).find(".curr-box").html());
                        window.location.hash = url;
                        $(".ajax-move").animate({ left: l }, 600, function () {
                            $(".ajax-move").css({ left: 0 });
                            $(".curr-box.next").removeClass("next").siblings().html("").addClass("next");
                            $(".curr-box.next").remove();
                            $(".curr-box").after('<div class="curr-box next"></div>');
                            $("body,html").animate({ scrollTop: 0});
                            // $("body,html").animate({ scrollTop: $(".ajax-move .curr-box .ajax-lod").offset().top-$(".header").height()});
                            $("img.lazy").lazyload({effect: "fadeIn",threshold :180});
                            if ($(".innplay-box").is(":visible"))
                            {
                                ieajax()
                            }
                            bon = true;

                        });

                        $(".load-aa").remove();
                        clearInterval(s);
                        var s1 = setInterval(function () {
                           // $(".load-aa").remove();
                            clearInterval(s1);
                        }, 400);
                    }
                });
            }
        }
    });
});