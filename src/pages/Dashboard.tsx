import { Loader2 } from "lucide-react";
import Navbar from "../components/dashboard/Navbar";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
        <p className="mt-3 text-gray-500 font-medium">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="w-full max-w-5xl mx-auto mt-36 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Welcome, <span className="text-blue-500">{user.username}</span> 👋
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your resumes, analyze for ATS optimization, and export them
          professionally.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/dashboard/resume-builder")}
            className="px-6 py-3 sm:px-10 sm:py-4 rounded-full text-lg font-semibold text-white shadow-md bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 hover:scale-105 transition-transform duration-200"
          >
            Create Resume
          </button>
          <button
            onClick={() => navigate("/dashboard/resume-analyser")}
            className="px-6 py-3 sm:px-10 sm:py-4 rounded-full text-lg font-semibold text-white shadow-md bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-400 hover:scale-105 transition-transform duration-200"
          >
            Analyze Your Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
