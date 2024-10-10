import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // State for role selection
  const [errorMessage, setErrorMessage] = useState(""); // To handle error messages
  const [successMessage, setSuccessMessage] = useState(""); // To handle success messages
  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message
    setIsLoading(true); // Set loading state

    try {
      // Send request to the backend API for registration
      const response = await axios.post("http://localhost:8080/api/register", {
        email,
        password,
        role, // Include the selected role
      });
      console.log("User registered:", response.data);
      setSuccessMessage("Registration successful!"); // Set success message
      setEmail("");
      setPassword("");
      setRole("USER"); // Reset role selection
    } catch (error) {
      // Handle error response from the server
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Error registering user"
        ); // Display the error message from server
      } else {
        setErrorMessage("Network error. Please try again."); // Handle network error
      }
      console.error("Error registering user:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Register
        </h1>

        {/* Display error message */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {/* Display success message */}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 p-2 w-full bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading} // Disable button while loading
            className={`w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded transition duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
