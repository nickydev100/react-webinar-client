import React from "react";
import {Row, Col} from 'react-bootstrap';
import {fetchVideo} from "../state/actions/videos.actions";
import {connect} from "react-redux";

class Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const {match, dispatch} = this.props;
        const id = match.params.videoId;
        dispatch(fetchVideo(id));
    }

    getVideoToRender = () => {
        const {match, videos} = this.props;
        const id = match.params.videoId;
        return videos[id];
    };


    render() {
        const video = this.getVideoToRender();
        const title = (!!video && !!video.title && video.title) || "";
        const url   = (!!video && !!video.url && video.url) || "";
        console.log({video});

        return (
            <Row style={{paddingTop: '60px'}}>
                <Col xs="12" md={{span: 8, offset: 2}}>
                    <h1>{title}</h1>
                    <video controls style={{width: '100%'}}>

                        <source src={url}
                                type="video/webm"/>

                        <source src={url}
                                type="video/mp4"/>

                        Sorry, your browser doesn't support embedded videos.
                    </video>
                </Col>
            </Row>
        )

    }
}

const mapStateToProps = (state) => {
    const {videos} = state;
    return {
        videos,
    }
};

export default connect(mapStateToProps)(Viewer);
