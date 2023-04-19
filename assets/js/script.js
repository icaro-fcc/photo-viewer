$(document).ready(function() {
    $(photosList).each(function(index, element) {
        console.log('index: ', element);
        console.log('element: ', index);
        let newPhotoElement = $('<img>');
        newPhotoElement.attr('src', $(this)[0].source);
        newPhotoElement.addClass('photo');
        console.log(newPhotoElement);
        let newPhotoWrapperElement = $('<div>');
        newPhotoWrapperElement.addClass('photoWrapper');
        newPhotoWrapperElement.append(newPhotoElement);
        $('.slide').append(newPhotoWrapperElement);
    });


    //Applying the hover function for all the photo elements
    $('.photoWrapper').hover(function() {
        console.log('Hovering...');
        $(this).find('.photo').css('transform', 'scale(1.3)');
    }, function(){
        $(this).find('.photo').css('transform', 'scale(1)');
    });

    let currentPhotoElement;

    $('.photo').bind('click', function() {
        $('.photoDisplay').css('background-image', `url('${$(this).attr('src')}'`);
        currentPhotoElement = $(this);
        console.log(currentPhotoElement);
    });

    // $('.arrowRightEnd').bind('click', function() {
    //     if ($(currentPhotoElement).next()) {
    //         console.log('Foi pra foto da direita');
    //         console.log(currentPhotoElement);
    //         console.log(currentPhotoElement.next().attr('src'));
    //         $('.photoDisplay').css('background-image', `url('${$(currentPhotoElement).next().attr('src')}'`);
    //     }
            
    // });

    $('.arrows').hover(function() {
        $('.arrowLeftEnd, .arrowRightEnd').css('opacity', 1);
    }, function() {
        $('.arrowLeftEnd, .arrowRightEnd').css('opacity', '1');
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
