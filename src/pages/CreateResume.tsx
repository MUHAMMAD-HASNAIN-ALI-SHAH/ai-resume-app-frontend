import Navbar from "../components/dashboard/Navbar";
import useCreateResumeStore from "../store/useCreateResumeStore";
import { useEffect, useState } from "react";
import CreateResumeHeader from "../components/dashboard/CreateResume/CreateResumeHeader";
import CreateResumeForm from "../components/dashboard/CreateResume/CreateResumeForm";
import ResumePreview from "../components/dashboard/CreateResume/ResumePreview";
import { useNavigate } from "react-router-dom";

const CreateResume = () => {
  const { formSubmitted, reset } = useCreateResumeStore();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (formSubmitted) {
      setIsPreviewOpen(true);
    }
  }, [formSubmitted]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full flex flex-col justify-center mx-auto px-2 sm:px-6 lg:px-8 pt-10">
        <div className="text-center font-bold text-2xl text-blue-600">
          Create Resume
        </div>
        <div className="mt-4 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg">
            Use our intuitive builder to create your resume with ease.
          </p>
        </div>
        {!formSubmitted && (
          <div className="text-center mt-4">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Preview Resume
            </button>
          </div>
        )}

        <div className="flex flex-col xl:flex-row justify-center items-center gap-3">
          {!formSubmitted && (
            <div className="w-full md:w-[90%] lg:w-[60%] xl:w-[40%] px-7 py-5">
              <CreateResumeHeader />
              <CreateResumeForm />
            </div>
          )}

          <ResumePreview
            isOpen={isPreviewOpen}
            onClose={() => {
              setIsPreviewOpen(false);
              if (formSubmitted) {
                reset();
                navigate("/dashboard/resume-builder");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
