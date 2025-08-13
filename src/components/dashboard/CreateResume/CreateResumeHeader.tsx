import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import useCreateResumeStore from "../../../store/useCreateResumeStore";

const CreateResumeHeader = () => {
  const { prevFormMenu, nextFormMenu } = useCreateResumeStore();
  return (
    <div className="w-full px-3 py-2">
      <header className="flex justify-between">
        <button className="bg-blue-600 p-2 rounded-sm cursor-pointer">
          <Home className="w-6 h-6 text-gray-300" />
        </button>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prevFormMenu}
            className="bg-blue-600 p-2 rounded-sm cursor-pointer"
          >
            <ArrowLeft className="text-gray-300 w-6 h-6" />
          </button>
          <button
            onClick={nextFormMenu}
            className="bg-blue-600 p-2 text-white rounded-sm cursor-pointer"
          >
            Next <ArrowRight className="text-gray-300 w-6 h-6 inline" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default CreateResumeHeader;
