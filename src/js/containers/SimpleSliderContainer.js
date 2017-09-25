import React from 'react';
import { Link } from 'react-router';
import config from '../config';
import SimpleSlider from '../components/SimpleSlider';
import VODService from '../services/VODService';

let vodService = new VODService(config.vodService.endpointUrl);

export default class SimpleSliderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: []
        };
    }

    componentDidMount() {
        vodService.getData().then(videoData =>
            this.setState({
                videoData
            })
        );
    }

    render() {
        return <div class="row">
            <div class="col-md-12">
                <div class="container-title">Top Rated Videos</div>
                <SimpleSlider videoData={this.state.videoData}></SimpleSlider>
            </div>
        </div>;
    }
}
