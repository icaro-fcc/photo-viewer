// import {photosList, totalPhotos} from './photos.js';

$(document).ready(function() {


    let photosToShow = 20;    // <-- Define here how many photos will be shown in the slider!


    /*This function selects the photos randomly to be used in the slider, and already
    wrapping and adding their respective wrapper classes*/
    function photosSetUp() {       

        photosToShow = (photosToShow > totalPhotos) ? totalPhotos : photosToShow;
        //Just making sure the number of photos selected will be max the total photos in the folder

        for (let i = 1; i <= photosToShow; i++) {
            let randomNum = Math.floor(Math.random() * totalPhotos);

            let newPhotoElement = $('<img>');
            newPhotoElement.attr('src', photosList[randomNum].source);
            newPhotoElement.addClass('photo');
            let newPhotoWrapperElement = $('<div>');
            newPhotoWrapperElement.addClass('photoWrapper');
            newPhotoWrapperElement.append(newPhotoElement);
            $('.slide').append(newPhotoWrapperElement);

            //Setting the 1st random photo as the 1st one displayed on the page
            if (i == 1)
                $('.photoShown').attr('src', photosList[randomNum].source);
        };

        eventsSetUp(); //After creating the photos elements, create the events for each
    };

    

    /*This function is responsible for adding the events for the
    photos on the slider, the zoom on the photo displayed, arrow buttons (navigation),
    as well as displaying the photo that's clicked*/
    function eventsSetUp() {
        $('.photo').hover(function() {
            $(this).parent().css('transform', 'scale(1.3)');
        }, function(){
            $(this).parent().css('transform', 'scale(1)');
        });
    
    
        let currentPhotoElement;
    
        $('.photo').bind('click', function() {

            $('.photoShown').attr('src', $(this).attr('src'));
            currentPhotoElement = $(this);
            
    
            $('.photo').each(function() {
                if ($(this) != currentPhotoElement)
                    $(this).css('border', 'none');                    
            });
    
            currentPhotoElement.css('border', '5px solid #CCC');
        });


        //Creating the zoom option:
        const img = $('.photoShown');

        //Zoom option for when hovering the photo
        img.bind('mousemove', function(e){
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            img.css('transform-origin', `${x}px ${y}px`);
            img.css('transform', 'scale(2.5)');
        });

        //Zoom option for when touching/swiping the photo
        img.bind('touchmove', function(e){
            var touch = e.originalEvent.touches[0];
            var x = touch.pageX;
            var y = touch.pageY;

            console.log(x, y);

            img.css('transform-origin', `${x}px ${y}px`);
            img.css('transform', 'scale(2.5)');
        });


        //And reseting the original photo size for when stopping hovering/touching
        img.bind('mouseleave', function(){

            img.css('transform-origin', 'center center');
            img.css('transform', 'scale(1)');
        });

        img.bind('touchend', function(){

            img.css('transform-origin', 'center center');
            img.css('transform', 'scale(1)');
        });

    };



    /*This function gets the sizes of the elements involved in the slider such as total width's
    and sends them to the function that will handle the navigation according to them*/
    function setSliderSizes() {
        //The total width (the wrapper's width) of a single photo
        let photoWrapperWidth = parseInt($('.photoWrapper').eq(0).css('width'), 10);
        let photoWrapperMargin = (parseInt($('.photoWrapper').eq(0).css('margin-left'), 10)) * 2;
        let photoTotalWidth = photoWrapperWidth + photoWrapperMargin;


        let slideMargin = 0;
        let slideWidth = ($('.photoWrapper').length * photoTotalWidth); //the total width of all photos
        let galleryWidth = parseInt($('.gallery').css('width'), 10); //the width of the gallery (slide) which is based on the viewport
        console.log('slideWidth: ', slideWidth, 'e galleryWidth: ', galleryWidth);

        //Number of clicks that will be possible to go to the right
        let maxRightClicks = Math.ceil(photosToShow - (galleryWidth / photoTotalWidth));
        /*
        This math was thought like: since the galleryWidth (which is based on viewport)
        divided by photoTotalWidth (each photo) is the number of photos that are firstly shown on the screen,
        then if considering the total of photos, and subtracting this number of photos shown,
        we know how many clicks (which takes a single photo, or photoTotalWidth) will take until
        reaching the last photo on the slider. It works for any viewport size.
        */

        /*Checking if the slide width (based on the number of photos to show) is shorter
        than the screen width. If so, then it'll be adjusted better on the screen*/
        if (slideWidth < galleryWidth) {
            $('.slide').css('display', 'flex').css('justify-content', 'center');
            $('.gallery').css('display', 'flex').css('justify-content', 'center');
            $('.arrows').css('display', 'none');

        } else {
            //Calling the function that will handle the slider navigation
            handleSliderArrowClick(photoTotalWidth, maxRightClicks, slideMargin);

        }
    };



    /*This function handles the click events for the arrows (navigation), as well as
    the limits for showing the beginning and the end of the slide*/
    function handleSliderArrowClick(photoTotalWidth, maxRightClicks, slideMargin) {
        let slideMarginLimit = - (photoTotalWidth * maxRightClicks);

        console.log('maxRightClicks: ', maxRightClicks);
        console.log('slideMarginLimit: ', slideMarginLimit);

        
        console.log($('.photoWrapper').length);

    
        $('.arrowRight').bind('click', function() {
            
            if (slideMargin > slideMarginLimit) {
                console.log(slideMargin);
                    slideMargin -= photoTotalWidth;
                $('.slide').css('margin-left', slideMargin);
                console.log(slideMargin);
            }
            
        });
    
        $('.arrowLeft').bind('click', function() {
            
            console.log(slideMargin);
            if (slideMargin < 0) {
                slideMargin += photoTotalWidth;
                $('.slide').css('margin-left', slideMargin);
                console.log(slideMargin);
            }
            
        });
    };


    //Initializing the slider:
    photosSetUp();
    setSliderSizes();

    
});
