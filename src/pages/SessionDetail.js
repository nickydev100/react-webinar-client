import React, {Component} from "react";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import { Row, Col, Tabs, Tab, CardDeck, Card, Container } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as SessionActions from '../state/actions/session.actions';
import EmotionIcon from "../components/EmotionIcon";
import {videos} from "../helpers/videos";
import {emotions} from "../helpers/emotions";
import {Line} from 'react-chartjs-2';
import {sessionChartOptions, formatDataForChart} from "../helpers/sessionChart";

class SessionDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholders: {},
            sessionChartOptions: sessionChartOptions(),
            sessionChartData: {}
        }
    }

    componentDidMount() {
        const { fetchSession, match, session } = this.props;
        const sessionId = parseInt(match.params.sessionId, 10);
        fetchSession(sessionId);
        let faceEmotions = !!session.selectedSession.stats.current_stats.engagement.measurement ? session.selectedSession.stats.current_stats.engagement.measurement.face_emotions : null;
        const chartData = faceEmotions ? formatDataForChart(faceEmotions) : {};
        const roundedNumber = (number) => {
            return Math.round(number);
        }
        let placeholders = {
            randomLength: roundedNumber(Math.random() * 100),
            randomVisitors: roundedNumber(Math.random() * 100),
            randomAvgWatch: roundedNumber(Math.random() * 100),
            randomEngagement: roundedNumber(Math.random() * 100),
            randomDistraction: roundedNumber(Math.random() * 14 + 1),
            lastUpdated: videos[sessionId].lastUpdated,
            length: videos[sessionId].length,
            randomEmotion: emotions[roundedNumber(Math.random() * 8)]
        }
        this.setState({
            placeholders: placeholders,
            sessionChartData: chartData
        })
    }

    render() {
        console.log(this.props)
        const { selectedSession, sessionLoading } = this.props.session;
        const {placeholders} = this.state;
        if (sessionLoading) {
            return <div>Loading...</div>
        } else if (selectedSession){
            //const currentStats = selectedSession.stats.current_stats;
            return (
                <div>
                    <h1>{selectedSession.session.name}: Video Reaction Stats</h1>
                    <p><Link to="/">Back to Home</Link></p>

                    <Tabs defaultActiveKey="reactions" id="uncontrolled-tab-example">
                        <Tab eventKey="reactions" title="Reactions">
                            <Container>
                                <Row>
                                    <Col xs="12">
                                        <img src={selectedSession.session.thumbnail} alt={selectedSession.session.name} style={{maxWidth: '100%'}}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <Line data={this.state.sessionChartData} options={this.state.sessionChartOptions}/>
                                    </Col>
                                </Row>
                            </Container>
                        </Tab>
                        <Tab eventKey="performance" title="Performance">
                            <Row>
                                <Col xs="12">
                                    <CardDeck>
                                        <Card>
                                            <Card.Header>Last Updated</Card.Header>
                                            <Card.Body className="text-center">
                                                <h3>{placeholders.lastUpdated}{/*{selectedVideo.stats.latest_stat}*/}</h3>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>Length</Card.Header>
                                            <Card.Body className="text-center">
                                                <h1>{placeholders.length}</h1>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Header>Participants</Card.Header>
                                            <Card.Body className="text-center">
                                                <h1>{placeholders.randomVisitors}{/*{currentStats.visits.totals.visitor_count}*/}</h1>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Header>Avg. Engagement</Card.Header>
                                            <Card.Body className="text-center">
                                                <h1>{placeholders.randomEngagement} %{/*{(currentStats.engagement && currentStats.engagement.average_engagement) || '-'}*/}</h1>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Header>Avg. Distractions</Card.Header>
                                            <Card.Body className="text-center">
                                                <h1>{placeholders.randomDistraction}</h1>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Header>Avg. Emotion</Card.Header>
                                            <Card.Body className="text-center">
                                                <EmotionIcon emotion={placeholders.randomEmotion} size="3x"/>
                                            </Card.Body>
                                        </Card>
                                    </CardDeck>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
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
        {...SessionActions}, dispatch
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionDetail));
