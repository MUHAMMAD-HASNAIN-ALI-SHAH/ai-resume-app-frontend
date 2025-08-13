import Navbar from "../components/dashboard/Navbar";
import { Upload } from "lucide-react";

const ResumeAnalyser = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center font-bold text-2xl text-blue-600">
          Resume Analyzer
        </div>
        <div className="mt-4 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg">
            Upload your resume to analyze its ATS compatibility and get
            optimization suggestions.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Upload Resume Button */}
          <form className="flex flex-col gap-6 p-8 bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-200 hover:border-blue-400 w-full max-w-lg mx-auto">
            {/* Company Name */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Enter company name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            {/* Company Description */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter a brief company description"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Save Details
            </button>
          </form>

          {/* Previous Resume Button */}
          <button className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-200 hover:border-blue-400">
            <Upload className="w-10 h-10 text-blue-500 mb-3" />
            <span className="text-lg font-semibold text-gray-700">
              Upload New Resume
            </span>
            <span className="text-sm text-gray-500 mt-1">
              PDF or DOCX format
            </span>
          </button>
        </div>

        {/* Placeholder for future results */}
        <div className="mt-12 p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto text-center border border-gray-200">
          <p className="text-gray-500 italic">
            Analysis results will appear here...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyser;
