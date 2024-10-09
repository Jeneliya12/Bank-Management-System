import React, { useState, useEffect } from "react";

function LoanStatus() {
  const [loanStatus, setLoanStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoanStatus = () => {
      const mockData = [
        { loanId: 1, status: "Approved" },
        { loanId: 2, status: "Pending" },
        { loanId: 3, status: "Rejected" },
      ];

      setTimeout(() => {
        setLoanStatus(mockData);
        setLoading(false);
      }, 1000);
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
          <tr className="bg-gray-700">
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
