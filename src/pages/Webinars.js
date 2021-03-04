import React from "react";
import {Card, Col, Row, ButtonGroup, FormControl, CardDeck, CardColumns} from 'react-bootstrap';
import {connect} from "react-redux";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import InputGroup from "react-bootstrap/InputGroup";
import {dispatchFetchWebinars} from "../state/actions/webinar.actions";

const StyledDropDown = styled(props => <DropDown {...props} />)`
    margin-bottom: 14px;
`;

class Webinars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            currentPage: 1,
            itemsPerPage: 6,
        }
    }

    componentDidMount() {
        const {currentPage, itemsPerPage} = this.state;
        const {dispatch} = this.props;
        dispatch(dispatchFetchWebinars(currentPage, itemsPerPage));
    }

    renderHeaderInfoRow = () => {
        const {nextWebinar, totalScheduledWebinars, totalScheduledWebinarsAvgMinutes} = this.props;

        return (
            <Row className="p-2 p-md-3 mb-3">
                <CardDeck>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                NEXT WEBINAR
                                <div style={{fontWeight: 'bold'}}>{nextWebinar.name}</div>
                                <br/>
                                {!!nextWebinar.dateTime && nextWebinar.dateTime}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{minWidth: '15rem'}}>
                        <Card.Body>
                            <Card.Text>
                                UPCOMING WEBINAR
                                <div>
                                    <div className={"mr-1"} style={{float: "left", fontWeight: 'bold'}}>{totalScheduledWebinars}</div>
                                    <span>{" scheduled"}</span>
                                </div>
                                <br/>
                                <span>{totalScheduledWebinarsAvgMinutes}</span>
                                <span>{" minutes avg. watch"}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Row>
        )
    };

    handleFilterChange = () => {


    };

    renderFilterRow = () => {
        const filterOptions = [
            {value: "sortAsc", label: "Sort by date ascending"},
            {value: "sortDesc", label: "Sort by date descending"},
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

                <Col xs={"12"} md={"1"}>
                    <ButtonGroup>
                        <Button>Grid</Button>
                        <Button>List</Button>
                    </ButtonGroup>
                </Col>

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

    renderWebinarGridRow = (webinars) => {
        const cards = [];
        webinars.forEach((w, i) => {
            cards.push(
                <React.Fragment>
                    <Card key={i}>
                        <Card.Body>
                            <Card.Body>
                                <Row>
                                    <Col>Tue, Oct 15, 2019</Col>
                                    <Col>options</Col>
                                </Row>
                                <Card.Text>
                                    <h4>{w.title}</h4>
                                    <p>{w.duration}</p>
                                    <div>Presenters:</div>
                                    <div>{w.presenters.join(", ")}</div>
                                    <p>{`${w.registered} of ${w.webinarCapacity} registrants.`}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </React.Fragment>
            );
        });

        return (
            <Row className="p-2 p-md-3 mb-3">
                <CardColumns>{cards}</CardColumns>
            </Row>
        )
    };

    onSelectedPageChange = (page) => {
        const {itemsPerPage} = this.state;
        const {dispatch} = this.props;
        dispatch(dispatchFetchWebinars(page, itemsPerPage));
        this.setState({
            currentPage: page
        })
    };

    render() {
        const {itemsPerPage} = this.state;
        const {webinars, webinarsQty} = this.props;

        return (
            <React.Fragment>
                <h1>Webinars</h1>

                {this.renderHeaderInfoRow()}
                {this.renderFilterRow()}
                {this.renderWebinarGridRow(webinars)}

                <Row style={{marginTop: '0.7em'}}>
                    <Col>
                        <Pagination itemsPerPage={itemsPerPage}
                                    itemsQty={webinarsQty}
                                    onSelectedPageChange={(page) => this.onSelectedPageChange(page)}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {webinars} = state;
    const {nextWebinar, totalScheduledWebinars, totalScheduledWebinarsAvgMinutes, webinarsList, webinarsQty} = webinars;

    return {
        ...ownProps,
        nextWebinar,
        totalScheduledWebinars,
        totalScheduledWebinarsAvgMinutes,
        webinars: webinarsList,
        webinarsQty,
    }
};

export default connect(mapStateToProps)(Webinars);
