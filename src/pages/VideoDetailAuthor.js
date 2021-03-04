import React, {Component} from "react";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as VideoActions from '../state/actions/videos.actions';
import EmotionIcon from "../components/EmotionIcon";

class VideoDetail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        placeholders: {}
    }
  }

  componentDidMount() {
      const { fetchVideo, match, location } = this.props;
      const videoId = parseInt(match.params.videoId, 10);
      fetchVideo(videoId)
      const {placeholders} = this.props.location.state;
      this.setState({
          placeholders: placeholders
      })
  }

  render() {
      const { selectedVideo, videoLoading } = this.props.videos;
        const {placeholders} = this.state;
      if (videoLoading) {
        return <div>Loading...</div>
    } else if (selectedVideo){
        return (
            <div>
                <h1>{selectedVideo.video.name}: Video Reaction Stats</h1>
                <p><Link to="/">Back to Home</Link></p>
                <Row>
                    <Col xs="12" md={6}>
                        <img src={selectedVideo.video.thumbnail} alt={selectedVideo.video.name} style={{maxWidth: '100%'}}/>
                    </Col>
                    <Col xs="12" md={6}>
                        <p>Last Updated: {placeholders.lastUpdated}{/*{selectedVideo.stats.latest_stat}*/}</p>
                        <p>Length: {placeholders.length}</p>
                        <p>Participants: {placeholders.randomVisitors}{/*{currentStats.visits.totals.visitor_count}*/}</p>
                        <p>Avg. Engagement: {placeholders.randomEngagement} %{/*{(currentStats.engagement && currentStats.engagement.average_engagement) || '-'}*/}</p>
                        <p>Avg. Distractions: {placeholders.randomDistraction}</p>
                        <p>Avg. Emotion: <EmotionIcon emotion={placeholders.randomEmotion} size="2x"/></p>
                    </Col>
                </Row>
            </div>
        )
    }
  }
}


const mapStateToProps = (state) => {
  return {
      ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
      {...VideoActions}, dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoDetail));
