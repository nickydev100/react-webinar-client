import '../App.scss';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React from "react";
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { withRouter } from 'react-router-dom';

const Sidebar = ({
    history,
    location, 
    expanded, 
    onToggle, 
    navItems
}) => {

    const renderNavItem = (navItem, index) => {
        return (
            <NavItem eventKey={navItem.eventKey} key={index}>
                <NavIcon>
                    <i className={`fa fa-fw fa-${navItem.icon}`} style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>{navItem.text}</NavText>
            </NavItem>
        )
    }

    return (
        <SideNav
            onSelect={(selected) => {
                const to = selected;
                if (location.pathname !== to) {
                    history.push(to);
                }
            }}
            onToggle={() => onToggle(!expanded)}
            style={{ height: '100%', position: 'fixed', top: 0, left: 0, backgroundColor: '#0892A5' }}
        >
            <Toggle />
            <SideNav.Nav defaultSelected="/">
                {navItems.map(renderNavItem)}
            </SideNav.Nav>
        </SideNav>
    )

}

export default withRouter(Sidebar)