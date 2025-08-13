import { useEffect, useState } from "react";
import useCreateResumeStore, {
  type CreateResume,
} from "../../store/useCreateResumeStore";

const MyResumes = () => {
  const { getMyResumes } = useCreateResumeStore();
  const [resumes, setResumes] = useState<CreateResume[]>();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getMyResumes();
        setResumes(data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };
    fetchResumes();
  }, [getMyResumes]);

  return (
    <div className="w-full">
      <div className="text-center font-bold text-2xl text-blue-500">
        My Resumes
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {resumes && resumes.length > 0 ? (
          resumes.map((resume, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl p-4 m-2 rounded hover:shadow-lg transition-shadow select-none cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{resume.fullname || ""}</h2>
              <p className="text-sm text-gray-600">{resume.jobtitle || ""}</p>
              <p className="text-sm text-gray-600">{resume.email || ""}</p>
              <p className="text-sm text-gray-600">{resume.phone || ""}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-4">
            <p>No resumes found. Please create a resume.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResumes;
