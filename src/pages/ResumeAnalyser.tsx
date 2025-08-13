import Navbar from "../components/dashboard/Navbar";
import ResumeAnalyserForm from "../components/dashboard/ResumeAnalyser/ResumeAnalyserForm";

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

        <ResumeAnalyserForm />
      </div>
    </div>
  );
};

export default ResumeAnalyser;
