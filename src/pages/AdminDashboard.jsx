import React, { useState } from "react";
import UserProfile from "../components/UserProfile";
import UserManagement from "../components/UserManagement";
import LoanApplications from "../components/LoanApplications";
import Transactions from "../components/Transactions";
import LoanVerification from "../components/LoanVerification";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("user-management");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "loan-applications":
        return <LoanApplications />;
      case "loan-verification":
        return <LoanVerification />;
      case "transactions":
        return <Transactions />;
      case "user-management":
      default:
        return <UserManagement />;
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="h-screen flex">
      {/* Left Navigation */}
      <div className="w-1/6 bg-gray-900 text-white p-4 flex flex-col justify-between text-center">
        {/* Top Section with Circular Image */}
        <div>
          <UserProfile />
          <ul>
            <li
              className="mb-6 cursor-pointer hover:text-blue-300"
              onClick={() => setActiveTab("user-management")}
            >
              User Management
            </li>
            <li
              className="mb-6 cursor-pointer hover:text-blue-300"
              onClick={() => setActiveTab("loan-applications")}
            >
              Loan Applications
            </li>
            <li
              className="mb-6 cursor-pointer hover:text-blue-300"
              onClick={() => setActiveTab("loan-verification")} // New tab for loan verification
            >
              Loan Verification
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
          className="bg-red-600 hover:bg-red-500 text-white p-2 rounded flex items-center justify-center mt-10"
          onClick={handleLogout}
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

      {/* Main Body */}
      <div className="w-3/5 bg-gray-800 p-6">{renderActiveTab()}</div>

      {/* Right Section for Quick Stats or Summary */}
      <div className="w-1/4 bg-gray-900 p-4">
        <h2 className="text-xl font-bold mb-4 text-white">Quick Stats</h2>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-white">Total Users</h3>
          <p className="text-3xl font-bold text-green-400">1,234</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-white">
            Pending Applications
          </h3>
          <p className="text-3xl font-bold text-yellow-400">123</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">
            Recent Transactions
          </h3>
          <p className="text-3xl font-bold text-red-400">$25,000</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
