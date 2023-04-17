import React, { useState } from "react";
import { Sidebar, Sidenav, Nav, Navbar, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GearCircleIcon from '@rsuite/icons/legacy/Gear';

import CharacterDrawer from "./CharacterDrawer";

const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };

  const NavToggle = ({ expand, onChange }) => {
    return (
      <Navbar appearance="subtle" className="nav-toggle">
        <Nav>
        </Nav>
  
        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  };

const DefaultSidebar = (character, t) => {
  const [expanded, setExpanded] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [expand, setExpand] = useState(false);
  return (
    <Sidebar
          style={{ display: 'flex', flexDirection: 'column', backgroundColor: "black", height: "calc(100vh - 4em)", boxShadow: "0px 0px 10px black"}}
          width={expand ? 260 : 56}
          collapsible
        >
          
          <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                  Game
                </Nav.Item>
                <Nav.Menu
                  eventKey="3"
                  trigger="hover"
                  title="Character"
                  icon={<MagicIcon />}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="3-1"><CharacterDrawer title="Statistics" character={character} t={t}/></Nav.Item>
                  <Nav.Item eventKey="3-2"><CharacterDrawer title="Achievements" character={character} t={t}/></Nav.Item>
                  <Nav.Item eventKey="3-2"><CharacterDrawer title="Inventory" character={character} t={t}/></Nav.Item>
                  <Nav.Item eventKey="3-2"><CharacterDrawer title="Skills" character={character} t={t}/></Nav.Item>
                </Nav.Menu>
                <Nav.Menu
                  eventKey="4"
                  trigger="hover"
                  title="Settings"
                  icon={<GearCircleIcon />}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="4-1">Game</Nav.Item>
                  <Nav.Item eventKey="4-2">Character</Nav.Item>
                  <Nav.Item eventKey="4-3">Account</Nav.Item>
                </Nav.Menu>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} style={{fontSize: "30px"}} />
        </Sidebar>
  );
};

export default DefaultSidebar;