export default {
    version: '1.0.0',
    vodService: {
        endpointUrl: 'http://127.0.0.1:3000/api/videos'
    },
    sliderSettings: {
        accessibility: true,
        dots: false,
        lazyLoad: true,
        focusOnSelect: false,
        infinite: false,
        slideCount: 0,
        slidesToShow: 5,
        slidesToScroll: 5,
        speed: 800,
        //slider config- responsive features
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    },
    fullscreenApis: [['requestFullScreen', 'fullscreenchange', 'fullScreen', 'exitFullScreen'],
                    ['webkitRequestFullscreen', 'webkitfullscreenchange', 'webkitIsFullScreen', 'webkitExitFullScreen'],
                    ['mozRequestFullScreen', 'mozfullscreenchange', 'mozFullScreen', 'mozCancelFullScreen'],
                    ['msRequestFullscreen', 'msFullscreenChange', 'msFullscreenElement', 'msExitFullScreen']]
};
