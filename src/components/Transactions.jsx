import React, { useState, useEffect } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = () => {
      const mockData = [
        { id: 1, loanId: 1, amount: 1500.0, date: "2024-10-01" },
        { id: 2, loanId: 2, amount: 2500.0, date: "2024-10-02" },
        { id: 3, loanId: 1, amount: 500.0, date: "2024-10-03" },
      ];

      setTimeout(() => {
        setTransactions(mockData);
        setLoading(false);
      }, 1000);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transactions bg-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">Transaction ID</th>
            <th className="p-2">Loan ID</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-2 text-center">
                No transactions available
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-700">
                <td className="p-2">{transaction.id}</td>
                <td className="p-2">{transaction.loanId}</td>
                <td className="p-2">${transaction.amount.toFixed(2)}</td>
                <td className="p-2">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
