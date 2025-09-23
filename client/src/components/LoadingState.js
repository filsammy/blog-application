// src/components/LoadingState.js
import Spinner from "react-bootstrap/Spinner";

function LoadingState({ message = "Loading..." }) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
      <Spinner animation="border" role="status" />
      <span className="ms-2">{message}</span>
    </div>
  );
}

export default LoadingState;
