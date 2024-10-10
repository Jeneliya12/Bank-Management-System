import React, { useState, useEffect } from "react";
import axios from "axios";

function LoanStatus() {
  const [loanStatus, setLoanStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoanStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/api/loans/status"
        );
        setLoanStatus(response.data);
      } catch (err) {
        setError("Failed to fetch loan statuses");
      } finally {
        setLoading(false);
      }
    };

    fetchLoanStatus();
  }, []);

  return (
    <div className="loan-status bg-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Loan Status</h2>
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2">Loan ID</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {loanStatus.length === 0 ? (
            <tr>
              <td colSpan="2" className="p-2 text-center">
                No loan statuses available
              </td>
            </tr>
          ) : (
            loanStatus.map((status) => (
              <tr key={status.loanId} className="border-b border-gray-700">
                <td className="p-2">{status.loanId}</td>
                <td className="p-2">{status.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LoanStatus;
