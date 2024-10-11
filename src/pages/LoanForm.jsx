import React, { useState } from "react";
import apiClient from "../services/ApiClient";

const LoanForm = ({ addLoanApplication }) => {
  const [loanData, setLoanData] = useState({
    amount: "",
    term: "",
    purpose: "",
    loanType: "",
    annualInterestRate: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLoanApplication = {
      ...loanData,
      amount: parseFloat(loanData.amount),
      term: parseInt(loanData.term),
      annualInterestRate: parseFloat(loanData.annualInterestRate),
      applicationDate: new Date().toISOString(),
      status: "PENDING",
      monthlyPayment: null,
      user: {
        id: 1,
      },
    };

    try {
      const response = await apiClient.post("/loans", newLoanApplication);
      const data = response.data;
      addLoanApplication(data);

      setLoanData({
        amount: "",
        term: "",
        purpose: "",
        loanType: "",
        annualInterestRate: "",
      });
      setError("");
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded mb-4">
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-300" htmlFor="amount">
          Loan Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={loanData.amount}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full bg-gray-600 rounded"
          min="0"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300" htmlFor="term">
          Loan Term (Months)
        </label>
        <input
          type="number"
          id="term"
          name="term"
          value={loanData.term}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full bg-gray-600 rounded"
          min="1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300" htmlFor="annualInterestRate">
          Annual Interest Rate (%)
        </label>
        <input
          type="number"
          step="0.01"
          id="annualInterestRate"
          name="annualInterestRate"
          value={loanData.annualInterestRate}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full bg-gray-600 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300" htmlFor="loanType">
          Loan Type
        </label>
        <select
          id="loanType"
          name="loanType"
          value={loanData.loanType}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full bg-gray-600 rounded"
        >
          <option value="">Select Loan Type</option>
          <option value="personal">Personal Loan</option>
          <option value="home">Home Loan</option>
          <option value="auto">Auto Loan</option>
          <option value="student">Student Loan</option>
          <option value="business">Business Loan</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300" htmlFor="purpose">
          Purpose of Loan
        </label>
        <textarea
          id="purpose"
          name="purpose"
          value={loanData.purpose}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full bg-gray-600 rounded"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded"
      >
        Submit Application
      </button>
    </form>
  );
};

export default LoanForm;
