$(function() {
    //Applying the hover function for all the photo elements
    $('.photoWrapper').hover(function() {
        console.log('Hovering...');
        $(this).find('.photo').css('transform', 'scale(1.3)');
    }, function(){
        $(this).find('.photo').css('transform', 'scale(1)');
    });

    $('.photo').bind('click', function() {
        $('.photoDisplay').css('background-image', `url('${$(this).attr('src')}'`);
    });

    $('.arrows').hover(function() {
        $('.arrowLeftEnd, .arrowRightEnd').css('display', 'block');
    }, function() {
        $('.arrowLeftEnd, .arrowRightEnd').css('display', 'none');
    });



    let slideMargin = 0;
    let slideWidth = $('.photoWrapper').length * 80;
    let galleryWidth = parseInt($('.gallery').css('width'), 10);
    console.log('slideWidth: ', slideWidth, 'e gallery.length: ', galleryWidth);

    if (slideWidth < galleryWidth) {
        $('.slide').css('display', 'flex').css('justify-content', 'center');
    } else {
        let slideLengthLimit = -($('.photoWrapper').length - 6) * 80;

        console.log('slideLengthLimit: ', slideLengthLimit);

        
        console.log($('.photoWrapper').length);
    
        
    
        //80px is the length of every photo element
    
        $('.arrowRight').bind('click', function() {
            
            if (slideMargin != slideLengthLimit) {
                console.log(slideMargin);
                    slideMargin -= 80;
                $('.slide').css('margin-left', slideMargin);
                console.log(slideMargin);
            }
            
        });
    
        $('.arrowLeft').bind('click', function() {
            
            console.log(slideMargin);
            if (slideMargin != 0) {
                slideMargin += 80;
                $('.slide').css('margin-left', slideMargin);
                console.log(slideMargin);
            }
            
        });
    }


    
});
