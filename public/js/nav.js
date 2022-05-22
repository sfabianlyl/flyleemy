var tStart = 100 // Start transition 100px from top
  , tEnd = 500   // End at 500px
  , cStart = [243, 250, 255, 0]  // transparent
  , cEnd = [243, 250, 255, 1]   // bgwhite
  , cDiff = [
      cEnd[0] - cStart[0], 
      cEnd[1] - cStart[1], 
      cEnd[2] - cStart[2],
      cEnd[3] - cStart[3],
    ];

$(document).ready(function(){

    var startNav=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--navheight").replace("px",""));
    var endNav=startNav/1.5;
    var diffNav=endNav-startNav;
    $(window).on("resize",function(){
        startNav= ($(document).width() > 800) ? 200 : 100;
        endNav= ($(document).width() > 800) ? startNav/1.5: startNav/1.25;
        diffNav=endNav-startNav;
        $(document).trigger("scroll");
    }).trigger("resize");
    $(document).scroll(function() {
        var p = ($(this).scrollTop() - tStart) / (tEnd - tStart); // % of transition
        p = Math.min(1, Math.max(0, p)); // Clamp to [0, 1]
        var cBg = [
            Math.round(cStart[0] + cDiff[0] * p), 
            Math.round(cStart[1] + cDiff[1] * p), 
            Math.round(cStart[2] + cDiff[2] * p), 
            (cStart[3] + cDiff[3] * p).toFixed(3)
        ];
        document.documentElement.style.setProperty("--navheight",(startNav + diffNav * p).toFixed(1).toString()+"px");
        $("header").css('background-color', 'rgba(' + cBg.join(',') +')');
    }).trigger("scroll");

    $('.overlay').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay
        $('.overlay').removeClass('active');
        $("#menu_toggle").addClass("collapsed");
    });

    $('#menu_toggle').on('click', function () {
        // open sidebar
        $('#sidebar').toggleClass('active');
        // fade in the overlay
        $('.overlay').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $(this).toggleClass("collapsed");
    });

    setTimeout(function(){
        $.each($("a[href*='#']"),function(key,value){
            $(value).replaceWith($(value).clone());
        });
        $("a[href*='#']").on("click",function(){
            var section=$(this).attr("href");
            var offset=$(section).offset();
            offset.left-=20;
            $("html,body").animate({
                scrollTop:offset.top,
                scrollLeft:offset.left
            });
        });
    },1000);
    

    var url=window.location.href;
    

    if(url.split("#").length>1){
        var section="#"+url.split("#")[1];
        var offset=$(section).offset();
        offset.left-=20;
        $("html,body").animate({
            scrollTop:offset.top,
            scrollLeft:offset.left
        });
    }
});