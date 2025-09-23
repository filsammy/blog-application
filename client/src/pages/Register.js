import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { notifySuccess, notifyError } from "../components/Notification";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

function Register() {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      notifySuccess("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      notifyError("Registration failed. Try again.");
    }
  };

  const isFormValid =
    formData.name.trim() && formData.email.trim() && formData.password.trim();

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card className="p-4 shadow-sm card-gothic" style={{ minWidth: "350px" }}>
        <h3 className="mb-3 text-center">Register</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            type="submit"
            className="btn-horror-universal w-100"
            disabled={!isFormValid}
          >
            Register
          </Button>
        </Form>

        <p className="mt-3 text-center text-light">
          Already have an account?{" "}
          <Link to="/login" className="text-danger">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
