import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaDumbbell, FaChartLine } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          <span className="text-primary">FIT</span>IN5
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/classes">
              Classes
            </Nav.Link>
            <Nav.Link as={NavLink} to="/trainers">
              Trainers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/memberships">
              Memberships
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>

            {isAuthenticated ? (
              <NavDropdown
                title={
                  <span>
                    <FaUser className="me-1" /> {user?.role === 'admin' ? 'Admin' : (user?.name?.split(' ')[0] || 'User')}
                  </span>
                }
                id="basic-nav-dropdown"
              >
                {user?.role === 'admin' && (
                  <NavDropdown.Item as={Link} to="/dashboard">
                    <FaChartLine className="me-2" /> Dashboard
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="ms-lg-2">
                  Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  className="ms-lg-2 btn btn-primary text-white"
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;