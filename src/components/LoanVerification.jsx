import React, { useState, useEffect } from "react";
import axios from "axios";

function LoanVerification() {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL; // Using the environment variable
    console.log("Backend URL:", backendUrl);

    axios
      .get(`${backendUrl}/api/loans/pending`)
      .then((response) => {
        console.log("API Response: ", response.data);
        setPendingLoans(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pending loans:", error);
        setError("Error fetching pending loans.");
        setLoading(false);
      });
  }, []);

  const handleApprove = async (loanId) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL; // Using the environment variable
      await axios.patch(`${backendUrl}/api/loans/${loanId}/approve`);
      setPendingLoans((prevLoans) =>
        prevLoans.filter((loan) => loan.id !== loanId)
      ); // Remove approved loan from pending loans
    } catch (error) {
      console.error("Error approving loan:", error);
      setError("Error approving loan.");
    }
  };

  const handleReject = async (loanId) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL; // Using the environment variable
      await axios.patch(`${backendUrl}/api/loans/${loanId}/reject`);
      setPendingLoans((prevLoans) =>
        prevLoans.filter((loan) => loan.id !== loanId)
      ); // Remove rejected loan from pending loans
    } catch (error) {
      console.error("Error rejecting loan:", error);
      setError("Error rejecting loan.");
    }
  };

  return (
    <div className="admin-panel bg-gray-800 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel: Loan Approvals</h1>
      {loading && <p>Loading pending loans...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-left">
            <th className="p-4">Loan ID</th>
            <th className="p-4">Borrower Name</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Application Date</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingLoans.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                No pending loans
              </td>
            </tr>
          ) : (
            pendingLoans.map((loan) => (
              <tr key={loan.id} className="border-b border-gray-700">
                <td className="p-4">{loan.id}</td>
                <td className="p-4">{loan.borrowerName}</td>
                <td className="p-4">${loan.amount}</td>
                <td className="p-4">
                  {new Date(loan.applicationDate).toLocaleDateString()}
                </td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleApprove(loan.id)}
                    className="bg-green-600 hover:bg-green-500 text-white p-2 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(loan.id)}
                    className="bg-red-600 hover:bg-red-500 text-white p-2 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LoanVerification;
