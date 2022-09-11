
    $('.owl-carousel').owlCarousel({
        autoPlay: 2500,
        autoplay: true,
        autoplayTimeout: 5000,  
        loop:true,
        margin:10,
        nav:true,
        dots: true,
        // rtl:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:3
            }
            
        },
        
    });

$('mousewheel', '.owl-stage', function(e){
    console.log(e.deltaX, e.deltaY, e.deltaFactor);
    if(e.delta>0){
        $(this).trigger('next.owl');
    }else{
        $(this).trigger('prev.owl');
    }
    e.preventDefault();
})