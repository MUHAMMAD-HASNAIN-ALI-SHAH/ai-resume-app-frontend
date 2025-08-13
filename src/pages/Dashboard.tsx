import { Loader2, FileText, BarChart3, Clock } from "lucide-react";
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
      <div className="w-full max-w-5xl mx-auto mt-28 px-4 text-center">
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

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {/* Total Resumes */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3">
              <FileText className="h-10 w-10 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Total Resumes</p>
                <h2 className="text-2xl font-bold text-gray-800">3</h2>
              </div>
            </div>
          </div>

          {/* Last Analyzed Score */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-10 w-10 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Last ATS Score</p>
                <h2 className="text-2xl font-bold text-gray-800">85%</h2>
              </div>
            </div>
          </div>

          {/* Last Edited */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3">
              <Clock className="h-10 w-10 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Last Edited</p>
                <h2 className="text-2xl font-bold text-gray-800">2 days ago</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
