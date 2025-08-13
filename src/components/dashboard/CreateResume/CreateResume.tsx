import { useEffect } from "react";
import useCreateResumeStore from "../../../store/useCreateResumeStore";
import CreateResumeHeader from "./CreateResumeHeader";
import CreateResumeForm from "./CreateResumeForm";
import ResumePreview from "./ResumePreview";

const CreateResume = () => {
  const { formSubmitted, reset } = useCreateResumeStore();
  useEffect(() => {
    reset();
  }, [reset]);
  return (
    <div className="flex justify-center gap-3">
      {!formSubmitted && (
        <div className="w-[40%] px-7 py-5">
          <CreateResumeHeader />
          <CreateResumeForm />
        </div>
      )}

      <ResumePreview />
    </div>
  );
};

export default CreateResume;
