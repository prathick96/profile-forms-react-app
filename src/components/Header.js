import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText
} from "reactstrap";

import { NavLink } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="#0e101c" dark expand="md" className="mb-5">
        <NavLink className="navbar-brand" to="/form">
          Profile Forms App
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink activeClassName="active" className="nav-link" to="/form">
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/profile"
              >
                View Profile
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>{""}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
