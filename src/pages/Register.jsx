import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user:", { email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded mb-4">
      <div className="mb-4">
        <label className="block text-gray-300" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 p-2 w-full bg-gray-600 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 p-2 w-full bg-gray-600 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
