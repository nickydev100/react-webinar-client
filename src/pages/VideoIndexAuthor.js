import React, {Component} from "react";
import { connect } from "react-redux";
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import * as VideoActions from '../state/actions/videos.actions'
import { emotions, getEmotionIcon } from '../helpers/emotions'
import EmotionIcon from '../components/EmotionIcon'
import Logo from '../components/Logo';
import {videos} from '../helpers/videos';

class HomeAuthor extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
      const { fetchVideoIndex } = this.props;
      fetchVideoIndex()
  }

  renderVideos = () => {
      const { videos, videoListLoading } = this.props;
      if (videoListLoading) {
          return <div>Loading...</div>
      } else {
          if (!videos.videoList || videos.videoList.length === 0) {
              return <div>No videos found.</div>
          } else {
              return videos.videoList.map((video, index) => {
                  return this.renderVideoBlock(video, index)
              })
          }
      }
  }



  renderVideoBlock = (video, index) => {
      const roundedNumber = (number) => {
          return Math.round(number);
      }

      let placeholders = {
          randomLength: roundedNumber(Math.random() * 100),
          randomVisitors: roundedNumber(Math.random() * 100),
          randomAvgWatch: roundedNumber(Math.random() * 100),
          randomEngagement: roundedNumber(Math.random() * 100),
          randomDistraction: roundedNumber(Math.random() * 14 + 1),
          lastUpdated: videos[index].lastUpdated,
          length: videos[index].length,
          randomEmotion: emotions[roundedNumber(Math.random() * 8)]
      }

    return (
      <Card className="mb-2 mb-md-4 p-2 p-md-3" key={index}>
        <Row>
          <Col xs="12" md={2}>
              {video.thumbnail ? (<img src={video.thumbnail} alt={video.name} style={{maxWidth: '100%'}}/>):(<Logo/>)}
          </Col>
          <Col xs="12" md={4}>
            <h2><Link to={{pathname: `/videos/${video.id}`, state: {placeholders}}}>{video.name}</Link></h2>
            <p>
              <span>Length: {placeholders.length}</span>{' '}
              <span>Last Updated: {placeholders.lastUpdated}</span>{' '}
              <span>Visitors: {placeholders.randomVisitors}</span>
            </p>
          </Col>
          <Col xs="12" md={6}>
            <Row>
              <Col xs="3">
                <p>{placeholders.randomAvgWatch} minutes</p>
                <p className="text-small">Avg. watch time</p>
              </Col>
              <Col xs="3">
                <p>{placeholders.randomEngagement} %</p>
                <p className="text-small">Engagement</p>
              </Col>
              <Col xs="3">
                <p>{placeholders.randomDistraction}</p>
                <p className="text-small">Distractions</p>
              </Col>
              <Col xs="3">
                <p><EmotionIcon emotion={placeholders.randomEmotion} size="5x"/></p>
                <p className="text-small">Avg. emotion</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    )
  }

  render() {

    const { videos } = this.props;

    return (
      <div>
        <h1>Recent Videos</h1>
        {this.renderVideos(videos)}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const {
    videos
  } = state;

  return {
      videos
  }
}

const mapDispatchToProps = (dispatch) => {
return bindActionCreators(
    {...VideoActions}, dispatch
);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeAuthor);
