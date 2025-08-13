import { useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center font-bold text-3xl text-blue-600 mt-12">
          Resume Builder
        </div>
        <div className="mt-3 text-center">
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create, edit, and manage your resumes effortlessly with our
            easy-to-use tools.
          </p>
        </div>

        {/* Card Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {/* Create Resume */}
          <div
            onClick={() => navigate("/dashboard/resume-builder/create-resume")}
            className="h-72 w-60 shadow-md border border-gray-200 flex flex-col justify-center items-center cursor-pointer select-none rounded-xl bg-white hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out"
          >
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Create Resume
            </h1>
          </div>

          {/* Resume Templates */}
          <div className="relative bg-green-300 h-72 w-60 shadow-md border border-gray-200 flex flex-col items-center cursor-pointer select-none rounded-xl hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out">
            <img
              src="/resume.png"
              alt="Resume Templates"
              className="h-36 w-36 mt-8"
            />
            <h1 className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-lg font-semibold text-gray-700">
              Resume Templates
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
