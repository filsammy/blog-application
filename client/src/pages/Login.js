import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { notifySuccess, notifyError } from "../components/Notification";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      notifySuccess("Logged in successfully!");
      navigate("/blogs");
    } catch (err) {
      notifyError("Invalid credentials");
    }
  };

  const isFormValid = email.trim() && password.trim();

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card className="p-4 shadow-sm card-gothic" style={{ minWidth: "350px" }}>
        <h3 className="mb-3 text-center">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            className="btn-horror-universal w-100"
            disabled={!isFormValid}
          >
            Login
          </Button>
        </Form>

        <p className="mt-3 text-center text-light">
          Don’t have an account?{" "}
          <Link to="/register" className="text-danger">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;
