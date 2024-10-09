import React, { useState } from "react";
import LoanForm from "../pages/LoanForm";
import LoanTable from "../pages/LoanTable";

const LoanApplication = () => {
  const [loanApplications, setLoanApplications] = useState([]);

  const addLoanApplication = (application) => {
    setLoanApplications((prevApplications) => [
      ...prevApplications,
      application,
    ]);
  };

  return (
    <div className="bg-gray-800 p-4 rounded">
      <h1 className="text-3xl font-bold text-white mb-4">Loan Application</h1>
      <LoanForm addLoanApplication={addLoanApplication} />
      <LoanTable loanApplications={loanApplications} />
    </div>
  );
};

export default LoanApplication;
