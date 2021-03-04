import '../App.scss';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, { useState } from "react";
import { Nav, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import Logo from './Logo';
import {connect} from "react-redux";

const DashboardLayout = (props) => {

    const [expanded, setExpanded] = useState(false)

    const navItemsAuthor = [
        {
            eventKey: '/home',
            icon: 'home',
            text: 'Home'
        },
        {
          eventKey: '/post-video',
          icon: 'file-video',
          text: 'Post Video'
        },
        {
            eventKey: '/analytics',
            icon: 'chart-line',
            text: 'Analytics'
        },
        {
            eventKey: '/webinar',
            icon: 'clipboard-list',
            text: 'Webinar'
        },
        {
            eventKey: '/webinars',
            icon: 'list',
            text: 'Webinars'
        },
        {
            eventKey: '/focusgroup',
            icon: 'users',
            text: 'Focus Group'
        },
        {
            eventKey: '/settings',
            icon: 'cog',
            text: 'Settings'
        }
    ]
    const navItemsViewer = [
        {
            eventKey: '/home',
            icon: 'home',
            text: 'Home'
        },
        {
            eventKey: '/webinar',
            icon: 'clipboard-list',
            text: 'Webinar'
        },
        {
            eventKey: '/settings',
            icon: 'cog',
            text: 'Settings'
        }
    ]

    return (
        <React.Fragment>
            <Sidebar
                onToggle={setExpanded}
                expanded={expanded}
                navItems={props.isAuthor ? navItemsAuthor : navItemsViewer}
            />
            <main className={`app-main ${expanded ? 'expanded' : ''}`}>
              <Container fluid="true" style={{backgroundColor: '#ffffff', height: '64px', padding: '10px 20px', position: 'relative'}}>
                <Container>
                <Nav className="justify-content-end" activeKey="/" style={{position: 'relative'}}>
                  <div style={{width: '150px', position: 'absolute', top: '0px', left: '0px'}}><Logo/></div>
                  <Nav.Item>
                    <Nav.Link href="/profile"><i className="fa fa-fw fa-user"/>{props.username}</Nav.Link>
                  </Nav.Item>
                </Nav>
                </Container>
              </Container>
              <Container className="pt-3 pt-md-4 pb-3 pb-md-4">
                  {props.children}
              </Container>
            </main>
        </React.Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        username: (state.session.user && state.session.user.username)? state.session.user.username : "User Name",
        ...ownProps
    }
};

export default connect(mapStateToProps)(withRouter(DashboardLayout))
