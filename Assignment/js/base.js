
$(function (){

    // Configure/customize these variables.
    var showChar = 100;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "Show less";
    

    $('.more').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
 
    });
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });


    /*function hide(element, index, array) {
      if (index > 0) {
        slides[index].setAttribute('style', 'opacity:0;');
      }
    } 

    var carousel = document.getElementById("carousel"),
      slides = carousel.getElementsByTagName('li'),
      counter = 0,
      liList = Array.prototype.slice.call(slides);

    setInterval(function() {
      slides[counter].setAttribute('style', 'opacity:1;');
      counter++;

      if (counter == slides.length) {
        counter = 0;
        setTimeout(function() {
          liList.forEach(hide);
        }, 3000); // setTimeout
      }
    }, 3000);*/

});

