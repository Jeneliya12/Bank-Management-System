import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import LoanApplications from "../components/LoanApplications";
import LoanStatus from "../components/LoanStatus";
import Transactions from "../components/Transactions";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "loan-applications":
        return <LoanApplications />;
      case "loan-status":
        return <LoanStatus />;
      case "transactions":
        return <Transactions />;
      case "dashboard":
      default:
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-white">
              Dashboard Overview
            </h1>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-white">
                  Active Loan Amount
                </h2>
                <p className="text-3xl font-bold text-green-400">$12,000</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-white">
                  Interest Rate
                </h2>
                <p className="text-3xl font-bold text-yellow-400">5.6%</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-white">
                  Total Payable
                </h2>
                <p className="text-3xl font-bold text-red-400">$15,600</p>
              </div>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4 text-white">
                Pending Loan Applications
              </h2>
              <ul className="text-white">
                <li className="mb-2">Loan Application #12345 - Pending</li>
                <li className="mb-2">Loan Application #67890 - Approved</li>
                <li className="mb-2">Loan Application #11223 - Rejected</li>
              </ul>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">
                Recent Transactions
              </h2>
              <ul className="text-white">
                <li className="mb-2">Deposit - $1000 - 10/10/2024</li>
                <li className="mb-2">Loan Payment - $500 - 15/10/2024</li>
                <li className="mb-2">Withdrawal - $200 - 18/10/2024</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/6 bg-gray-900 text-white p-4 flex flex-col justify-between text-center">
        <div>
          <UserProfile />
          <ul>
            <li
              className="mb-6 cursor-pointer hover:text-blue-300"
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </li>
            <li
              className="mb-6 cursor-pointer hover:text-blue-300"
              onClick={() => setActiveTab("loan-applications")}
            >
              Loan Applications
            </li>
            <li
              className="mb-6 cursor-pointer hover:text-blue-300"
              onClick={() => setActiveTab("loan-status")}
            >
              Loan Status
            </li>
            <li
              className="mb-6 cursor-pointer hover:text-blue-300"
              onClick={() => setActiveTab("transactions")}
            >
              Transactions
            </li>
            <li
              className="mb-6 cursor-pointer hover:text-blue-300"
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white p-2 rounded flex items-center justify-center mt-10"
        >
          <span className="mr-2">Logout</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v1"
            />
          </svg>
        </button>
      </div>

      <div className="w-3/5 bg-gray-800 p-6">{renderActiveTab()}</div>

      <div className="w-1/4 bg-gray-900 p-4">
        <h2 className="text-xl font-bold mb-4 text-white">Loan Summary</h2>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-white">Current Loan</h3>
          <p className="text-3xl font-bold text-green-400">$12,000</p>
          <p className="text-sm text-gray-300 mt-2">5.6% Interest Rate</p>
          <p className="text-sm text-gray-300">Due Date: 30/10/2024</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Next Payment</h3>
          <p className="text-2xl font-bold text-yellow-400">$500</p>
          <p className="text-sm text-gray-300 mt-2">Due: 30/10/2024</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
