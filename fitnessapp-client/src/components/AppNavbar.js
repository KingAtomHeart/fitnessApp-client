import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AppNavbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = React.useCallback(() => {
    onLogout();
    navigate('/login');
  }, [onLogout, navigate]);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Fitness App</Navbar.Brand>
      <Nav className="ms-auto">
        {isAuthenticated ? (
          <>
            <Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;
