import React from "react";
import {Card, CardDeck, Col, FormControl, Row, Table} from "react-bootstrap";
import * as SessionActions from "../state/actions/session.actions";
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";
import DropDown from "../components/DropDown";

const StyledDropDown = styled(props => <DropDown {...props} />)`
    margin-bottom: 14px;
`;

class Analytics extends React.Component {

    componentDidMount() {
        const {fetchSessions} = this.props;
        fetchSessions();
    }

    renderHeaderInfoRow = () => {
        const {sessions} = this.props.session;
        return (
            <Row className="p-2 p-md-3 mb-3">
                <CardDeck>
                    <Card bg="secondary" text="white" style={{ width: '25rem' }}>
                        <Card.Header>
                            REGISTRANTS/ATTENDEES
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h1 style={{fontWeight: 'bold'}}>14.2%</h1>
                                400,000/700,000
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg="dark" text="white" style={{ width: '25rem' }}>
                        <Card.Header>
                            Avg. Watch Time
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h1 style={{fontWeight: 'bold'}}>14.2%</h1>
                                400,000/700,000
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg="secondary" text="white" style={{ width: '25rem' }}>
                        <Card.Header>
                            Engagement
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h1 style={{fontWeight: 'bold'}}>14.2%</h1>
                                400,000/700,000
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg="dark" text="white" style={{ width: '25rem' }}>
                        <Card.Header>
                            Avg Distractions / Avg. Emotion
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h1 style={{fontWeight: 'bold'}}>14.2%</h1>
                                400,000/700,000
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Row>
        )
    };

    renderFilterRow = () => {
        const filterOptions = [
            {value: "value1", label: "Value 1"},
            {value: "value2", label: "Value 2"},
        ];

        return (
            <Row>
                <Col xs={"12"} md={"3"}>
                    <StyledDropDown
                        customStyles={{
                            container: (provided) => ({
                                ...provided,
                                flex: '1',
                            })
                        }}
                        required={false}
                        options={filterOptions}
                        handleChange={this.handleFilterChange}
                        placeholder={"Filter"}
                    />
                </Col>

                <Col style={{flex: 5}}/>

                <Col xs={"12"} md={"3"}>
                    <InputGroup>
                        <FormControl
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>
                                <i className="fa fa-fw fa-search"/>
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
        )
    };

    renderSessionsTable = () => {
        let list = [];
        return (
            <Table hover size="sm">
                <thead>
                <tr>
                    <th></th>
                    <th>Session name</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Length</th>
                    <th>Avg. watched</th>
                    <th>Engagement</th>
                    <th>Registrants</th>
                    <th>Live</th>
                    <th>Replay</th>
                    <th>Emotion</th>
                </tr>
                </thead>
                <tbody>
                {list.map((item) => {
                    return (
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    )
                })}

                </tbody>
            </Table>
        )
    }

    render() {
        return (
            <React.Fragment>
                <h1>Analytics</h1>
                {this.renderHeaderInfoRow()}
                {this.renderFilterRow()}
                {this.renderSessionsTable()}
            </React.Fragment>
        )

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Analytics));
