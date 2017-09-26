import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import Slider from 'react-slick';
import { DefaultPlayer as Video } from 'react-html5video';
import config from '../config';

export default class SimpleSlider extends React.Component {

    constructor (props) {
        super (props);
        this.state = this._setInitialState();
        this.handleKeyDown = this.handleKeyNavigation.bind(this);
        this.handleVideoClick = this.playSelectedVideo.bind(this);
    }

    //**
    /* moved static settings to config
    /* slidesToScroll limit will vary (not fixed to 5) specific to the breakpoint, for better UX
    */
    _setInitialState () {
        let sliderSettings = config.sliderSettings;
        sliderSettings.slideCount = this.props.videoData ? this.props.videoData.length : 0;

        return {settings: sliderSettings};
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
    /* using document.getElementById handle video play func. since ReactDOM node does not occupy fullscreen by default
    */
    playSelectedVideo (selectedVidId) {
        let $video = document.getElementById(selectedVidId);//ReactDOM.findDOMNode(this.refs[selectedVidId]);

        if ($video != null) {

            //browser sepecific fullscreen apis list 
            let apis = config.fullscreenApis;

            for (let i = 0; i < apis.length; i++) {
                if ($video[apis[i][0]]) {
                    
                    //invoke full screen
                    $video[apis[i][0]]();
                    
                    let resetVideo = ()=> {
                        if (document[apis[i][2]] === false) {
                            $video.pause();
                            $video.currentTime = 0;
                        }
                    };
                    //bind reset video on fullscreen exit event
                    document.addEventListener(apis[i][1], i=> resetVideo(i), false);

                    //bind exit fullscreen when video ends
                    let exitFullScreenPlay = ()=> {
                        $video[apis[i][3]]();
                    };
                    $video.addEventListener('ended', (i)=> exitFullScreenPlay(i), false);

                    return;
                }
            }
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
                <div key={id} className="accedo-slide">
                    <div onClick={this.handleVideoClick.bind(this, id)}>
                        <Video id={id} ref={id} className="accedo-slide-video"
                            muted controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                            poster={imgUrl}
                            preload='metadata'
                            alt={video.description}>
                            <source src={url} type={vidType}/>

                            <p>Your browser doesn't support HTML5 video.</p>
                        </Video>
                    </div>
                    <p className='accedo-slide-title'>{title}</p>
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
            return <div className="text-center">
                Loading ...
                <div className='loader'></div>
            </div>;
        }

        let slides = this.prepareSlides(videos);

        //caching the cmp ref into this.slider, to be used during key navigation
        return (
            <div className="slick-wrapper" onKeyDown={this.handleKeyDown}>
                <Slider ref={cmp => this.slider = cmp } {...this.state.settings}>
                    {slides}
                </Slider>
            </div>
        );
    }
}
