import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

const FlyoutNav = () => {
  return (
    <SideNav
        onSelect={(selected) => {
            const to = '/' + selected;
            if (this.props.location.pathname !== to) {
                this.props.history.push(to);
            }
        }}
        onToggle={(expanded) => {
          this.setState({ expanded: expanded });
        }}
        style={{height: '100%'}}
    >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="">
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="about">
                <NavIcon>
                    <i className="fa fa-fw fa-address-card" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    About
                </NavText>
            </NavItem>
            <NavItem eventKey="topics">
                <NavIcon>
                    <i className="fa fa-fw fa-clipboard-list" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Topics
                </NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
  )
}

export default FlyoutNav;
