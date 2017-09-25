import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import Slider from 'react-slick';
import { DefaultPlayer as Video } from 'react-html5video';

export default class SimpleSlider extends React.Component {

    constructor (props) {
        super (props);
        this.state = this.setInitialState();
        this.handleKeyDown = this.handleKeyNavigation.bind(this);
        this.handleVideoClick = this.playSelectedVideo.bind(this);
    }

    //**
    /* moved settings from this.state to const
    /* slidesToScroll limit will vary (not fixed to 5) specific to the breakpoint, for better UX
    */
    setInitialState () {
        const config = {
            settings: {
            accessibility: true,
            dots: false,
            lazyLoad: true,
            focusOnSelect: false,
            infinite: false,
            slideCount: this.props.videoData ? this.props.videoData.length : 0,
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
        }
        };

        return config;
    }

    //*method impl. to handle keyEvent
    /* initialized after user clicks on any video/title/nav arrows
    */
    handleKeyNavigation (event) {

        //KEYUP event- scroll to prev slide
        if (event.keyCode === 38 || event.which === 38) {
            this.slider.slickPrev();
        }

        //KEYDOWN event- scroll to next slide
        if (event.keyCode === 40 || event.which === 40) {
            this.slider.slickNext();
        }
    }

    //*
    /* method impl. to play fullscreen videos
    /* using vanilla js to handle video play func. --- though ideally should be done via ReactDOM
    */
    playSelectedVideo (selectedVidId) {
        var elem = document.getElementById(selectedVidId);

        if (elem != null) {

            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }

            //exit fullscreen when video ends
            document.getElementById(selectedVidId).addEventListener('ended', (e)=> {
                elem.webkitExitFullScreen();
            }, false);

            let resetVideo = ()=> {
                if (document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false) {
                    elem.pause();
                    elem.currentTime = 0;
                }
            };

            document.addEventListener('fullscreenchange', resetVideo, false);
            document.addEventListener('webkitfullscreenchange', resetVideo, false);
            document.addEventListener('mozfullscreenchange', resetVideo, false);
            document.addEventListener('MSFullscreenChange', resetVideo, false);
        }
    }

    //*
    /* create a list of renderable items from fetched data
    */
    prepareSlides (videos) {
        return videos.map(video => {

            let {id, title, images: [{url: imgUrl}], contents: [{url, format}]} = video,
                vidType = `video/${format}`;

            return (
                <div key={id} class="accedo-slide">
                    <div onClick={this.handleVideoClick.bind(this, id)}>
                        <Video id={id} class="accedo-slide-video"
                            muted controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                            poster={imgUrl}
                            preload="metadata"
                            alt={video.description}>
                            <source src={url} type={vidType}/>

                            <p>Your browser doesn't support HTML5 video.</p>
                        </Video>
                    </div>
                    <p class="accedo-slide-title">{title}</p>
                </div>
            );
        });
    }

    //*
    /* renders the slider component, show apt indicator while loading data/no data
    */
    render () {
        let videos = this.props.videoData;

        if (!videos || videos.length === 0) {
            return <div class="text-center">
                Loading ...
                <div class="loader"></div>
            </div>;
        }

        let slides = this.prepareSlides(videos);

        //caching the cmp ref into this.slider, to be used during key navigation
        return (
            <div class="slick-wrapper" onKeyDown={this.handleKeyDown}>
                <Slider ref={cmp => this.slider = cmp } {...this.state.settings}>
                    {slides}
                </Slider>
            </div>
        );
    }
}
