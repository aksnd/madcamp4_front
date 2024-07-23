import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <DrawerIcon onClick={toggleDrawer}>
        <MenuIcon style={{ fontSize: 40 }} />
      </DrawerIcon>
      <Drawer open={open}>
        <DrawerContent>
          <DrawerCloseButton onClick={toggleDrawer}>×</DrawerCloseButton>
          <NavLink to="/" onClick={toggleDrawer}>Main Page</NavLink>
          <NavLink to="/emotion" onClick={toggleDrawer}>Emotion Page</NavLink>
          <NavLink to="/chatbot" onClick={toggleDrawer}>Chatbot Page</NavLink>
          <NavLink to="/predictor" onClick={toggleDrawer}>Stock Predictor</NavLink>
          <NavLink to="/news" onClick={toggleDrawer}>News Page</NavLink>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const DrawerIcon = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 1000;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #343a40;
  color: white;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
  z-index: 999;
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const DrawerCloseButton = styled.div`
  align-self: flex-end;
  cursor: pointer;
  font-size: 2rem;
`;

const NavLink = styled(Link)`
  margin: 10px 0;
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export default DrawerMenu;
