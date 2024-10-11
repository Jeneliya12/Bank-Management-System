import React, { useState, useEffect } from "react";
import axios from "axios";

function TestConnection() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/greeting`)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching from backend:", error);
      });
  }, []);

  return (
    <div>
      <h1>Test Backend Connection</h1>
      <p>Message from Backend: {message}</p>
    </div>
  );
}

export default TestConnection;
