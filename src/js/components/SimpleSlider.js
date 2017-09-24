import React from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';
import { DefaultPlayer as Video } from 'react-html5video';

export default class SimpleSlider extends React.Component {

    constructor (props) {
        super (props);
        this.state = this.setInitialState();
        this.handleKeyDown = this.handleKeyNavigation.bind(this);
    }

    //moved settings from this.state to const
    //slidesToScroll limit will vary (not fixed to 5) specific to the breakpoint, for better UX
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

    //create a list of renderable items from fetched data
    prepareSlides (videos) {
        return videos.map(video => {

            let {id, title, images: [{url: imgUrl}], contents: [{url, format}]} = video,
                vidType = `video/${format}`;

            return (
                <div key={id} class="accedo-slide">
                    <Video class="accedo-slide-video" muted
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        poster={imgUrl}
                        preload="metadata">
                        <source src={url} type={vidType} />

                        <p>Your browser doesn't support HTML5 video.</p>
                    </Video>
                    <div class="accedo-slide-title">{title}</div>
                </div>
            );
        });
    }

    //method to handle keyEvent implementations/
    handleKeyNavigation (event) {

        //KEYUP event- scroll to prev slide
        if (event.keyCode === 38) {
            this.slider.slickPrev();
        }

        //KEYDOWN event- scroll to next slide
        if (event.keyCode === 40) {
            this.slider.slickNext();
        }
    }

    //renders the slider component, show apt indicator while loading data/no data
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
