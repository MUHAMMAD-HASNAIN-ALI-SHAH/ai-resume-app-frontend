import Navbar from "../components/dashboard/Navbar";
import useCreateResumeStore from "../store/useCreateResumeStore";
import { useEffect } from "react";
import CreateResumeHeader from "../components/dashboard/CreateResume/CreateResumeHeader";
import CreateResumeForm from "../components/dashboard/CreateResume/CreateResumeForm";
import ResumePreview from "../components/dashboard/CreateResume/ResumePreview";

const CreateResume = () => {
  const { formSubmitted, reset } = useCreateResumeStore();
  useEffect(() => {
    reset();
  }, [reset]);
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center font-bold text-2xl text-blue-600">
          Create Resume
        </div>
        <div className="mt-4 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg">
            Use our intuitive builder to create your resume with ease.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row justify-center items-center gap-3">
          {!formSubmitted && (
            <div className="w-full md:w-[90%] lg:w-[60%] xl:w-[40%] px-7 py-5">
              <CreateResumeHeader />
              <CreateResumeForm />
            </div>
          )}

          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
