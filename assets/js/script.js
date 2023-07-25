import {photosList} from '../js/photos.js';

$(document).ready(function() {


    for (let i = 1; i <= 20; i++) {
        let randomNum = Math.floor(Math.random() * 20) + 1;
        console.log(randomNum); // outputs a random integer between 1 and 1607
        let newPhotoElement = $('<img>');
        newPhotoElement.attr('src', photosList[randomNum].source);
        newPhotoElement.addClass('photo');
        console.log(newPhotoElement);
        let newPhotoWrapperElement = $('<div>');
        newPhotoWrapperElement.addClass('photoWrapper');
        newPhotoWrapperElement.append(newPhotoElement);
        $('.slide').append(newPhotoWrapperElement);

        //Setting the 1st random photo as the 1st one showing on the page
        if (i == 1)
        $('.photoDisplay').css('background-image', `url('${photosList[randomNum].source}'`);
    }

    

    console.log(photosList[0]);

    //Applying the hover function for all the photo elements
    // $('.photoWrapper').hover(function() {
    //     console.log('Hovering...');
    //     $(this).find('.photo').css('transform', 'scale(1.3)');
    // }, function(){
    //     $(this).find('.photo').css('transform', 'scale(1)');
    // });

    $('.photo').hover(function() {
        console.log('Hovering...');
        $(this).parent().css('transform', 'scale(1.3)');
    }, function(){
        $(this).parent().css('transform', 'scale(1)');
    });


    let currentPhotoElement;

    $('.photo').bind('click', function() {
        $('.photoDisplay').css('background-image', `url('${$(this).attr('src')}'`);
        currentPhotoElement = $(this);
        console.log(currentPhotoElement);
        

        $('.photo').each(function() {
            if ($(this) != currentPhotoElement) {
                console.log('Setting the border of the element: ', $(this));
                $(this).css('border', 'none');
            }
                
        });

        $(this).css('border', '5px solid #CCC');
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
    let slideWidth = ($('.photoWrapper').length * 90);
    let galleryWidth = parseInt($('.gallery').css('width'), 10);
    console.log('slideWidth: ', slideWidth, 'e gallery.length: ', galleryWidth);

    if (slideWidth < galleryWidth) {
        $('.slide').css('display', 'flex').css('justify-content', 'center');
    } else {
        let slideLengthLimit = -($('.photoWrapper').length - 16) * 90;

        console.log('slideLengthLimit: ', slideLengthLimit);

        
        console.log($('.photoWrapper').length);
    
        
    
        //60px is the length of every photo element
    
        $('.arrowRight').bind('click', function() {
            
            if (slideMargin >= slideLengthLimit) {
                console.log(slideMargin);
                    slideMargin -= 90;
                $('.slide').css('margin-left', slideMargin);
                console.log(slideMargin);
            }
            
        });
    
        $('.arrowLeft').bind('click', function() {
            
            console.log(slideMargin);
            if (slideMargin < 0) {
                slideMargin += 90;
                $('.slide').css('margin-left', slideMargin);
                console.log(slideMargin);
            }
            
        });
    }


    
});