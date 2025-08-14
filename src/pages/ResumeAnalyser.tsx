import { ArrowBigLeftIcon } from "lucide-react";
import Navbar from "../components/dashboard/Navbar";
import ATSOverview from "../components/dashboard/ResumeAnalyser/ATSOverview";
import ResumeAnalyserForm from "../components/dashboard/ResumeAnalyser/ResumeAnalyserForm";
import useResumeAnalyserStore from "../store/useResumeAnalyserStore";

const ResumeAnalyser = () => {
  const { submitForAnalysis } = useResumeAnalyserStore();
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10">
         <ArrowBigLeftIcon className="absolute left-0 top-10 cursor-pointer text-gray-500 hover:text-gray-700 transition-transform transform -translate-x-6" />
        <div className="text-center font-bold text-2xl text-blue-600">
          Resume Analyzer
        </div>
        {!submitForAnalysis && (
          <div className="mt-4 text-center max-w-2xl mx-auto">
            <p className="text-gray-600 text-lg">
              Upload your resume to analyze its ATS compatibility and get
              optimization suggestions.
            </p>
          </div>
        )}

        {!submitForAnalysis && <ResumeAnalyserForm />}
        {submitForAnalysis && <ATSOverview />}
      </div>
    </div>
  );
};

export default ResumeAnalyser;
