import React from 'react';
import { assert, expect } from 'chai';
import { shallow, mount } from 'enzyme';
import SimpleSlider from '../../src/js/components/SimpleSlider';

let videoData = [{
    "id": "10 Things I Hate About You",
    "title": "10 Things I Hate About You",
    "metadata": [{
        "value": "en",
        "name": "language"
    }],
    "contents": [{
        "url": "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
        "format": "mp4",
        "width": 640,
        "height": 360,
        "language": "en",
        "duration": 3600000,
        "geoLock": false,
        "id": "vid_103"
    }],
    "images": [{
        "type": "cover",
        "url": "http://lorempixel.com/214/317/?t=1",
        "width": 214,
        "height": 317,
        "id": "f67e6e8a7478d1dae24e869f3d7081cf"
    }]
}];

describe('<SimpleSlider>', ()=> {

    it('should render with passed args', function () {
        const wrapper = shallow(<SimpleSlider videoData={videoData}></SimpleSlider>);
        expect(wrapper.state().settings.slideCount).to.be.equal(1);
    });

    // it('test handleKeyDown', ()=> {

    // })
});
