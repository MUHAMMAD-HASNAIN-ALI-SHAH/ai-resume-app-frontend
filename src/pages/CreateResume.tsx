import Navbar from "../components/dashboard/Navbar";
import CreateResumeUi from "../components/dashboard/CreateResume/CreateResume";

const CreateResume = () => {
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

        <CreateResumeUi />
      </div>
    </div>
  );
};

export default CreateResume;
