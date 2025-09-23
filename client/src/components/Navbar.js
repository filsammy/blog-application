import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";
import { notifySuccess } from "../components/Notification";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    notifySuccess("You have been logged out.");
    navigate("/login");
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <BsNavbar.Brand as={Link} to="/">BlogApp</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="navbar-nav" />
        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>

            {user && (
              <>
                <Nav.Link as={Link} to="/create-blog">Create Blog</Nav.Link>
                {user.isAdmin && <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>}
              </>
            )}

          </Nav>

          <Nav>
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : (
              <>
                <span className="navbar-text me-3">Hello, {user.name}</span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="btn-horror-universal"
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
