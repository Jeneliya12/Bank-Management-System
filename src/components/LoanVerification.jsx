import React, { useState, useEffect } from "react";

function LoanVerification() {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mock data for demonstration
  useEffect(() => {
    const mockLoans = [
      {
        id: 1,
        borrowerName: "John Doe",
        amount: 5000,
        applicationDate: "2024-10-01",
      },
      {
        id: 2,
        borrowerName: "Jane Smith",
        amount: 7500,
        applicationDate: "2024-10-02",
      },
    ];

    setPendingLoans(mockLoans);
    setLoading(false);
  }, []);

  const approveLoan = (loanId) => {
    setPendingLoans(pendingLoans.filter((loan) => loan.id !== loanId));
  };

  const rejectLoan = (loanId) => {
    setPendingLoans(pendingLoans.filter((loan) => loan.id !== loanId));
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
                <td className="p-4">
                  <button
                    onClick={() => approveLoan(loan.id)}
                    className="bg-green-600 hover:bg-green-500 text-white p-2 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectLoan(loan.id)}
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
