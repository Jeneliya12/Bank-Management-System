import React from "react";

const LoanTable = ({ loanApplications }) => {
  return (
    <div className="loan-applications bg-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Loan Applications</h2>
      {loanApplications.length === 0 ? (
        <p className="text-gray-600">No loan applications yet.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">Loan ID</th>
              <th className="p-2">Loan Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Term (Months)</th>
              <th className="p-2">Purpose</th>
              <th className="p-2">Application Date</th>
            </tr>
          </thead>
          <tbody>
            {loanApplications.map((application) => (
              <tr key={application.id} className="border-b border-gray-700">
                <td className="p-2">{application.id}</td>
                <td className="p-2">{application.loanType}</td>
                <td className="p-2">${application.amount}</td>
                <td className="p-2">{application.term}</td>
                <td className="p-2">{application.purpose}</td>
                <td className="p-2">
                  {new Date(application.applicationDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoanTable;
