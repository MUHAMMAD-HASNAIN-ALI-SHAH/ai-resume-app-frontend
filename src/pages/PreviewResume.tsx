import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import useCreateResumeStore, {
  type CreateResume,
} from "../store/useCreateResumeStore";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";

const PreviewResume = () => {
  const { resumeId } = useParams();
  const [resume, setResume] = useState<CreateResume>();
  const {
    getMyResumeById,
    getMyResumeByIdLoader,
    deleteResumeById,
    deleteResumeByIdLoader,
  } = useCreateResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);
  if (!resumeId) {
    return <div className="text-red-500">Resume ID is missing.</div>;
  }
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getMyResumeById(resumeId);
        setResume(data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };
    fetchResume();
  }, [resumeId, getMyResumeById]);
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${resume?.fullname || "resume"}`,
  });
  const navigate = useNavigate();
  const deleteResume = async () => {
    if (resume?._id) {
      await deleteResumeById(resume._id);
      navigate("/dashboard/resume-builder");
    }
  };
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <header className="flex justify-between items-center py-4 mt-5">
          <button
            disabled={deleteResumeByIdLoader}
            onClick={deleteResume}
            className={`${
              deleteResumeByIdLoader ? "opacity-50 cursor-not-allowed" : ""
            } bg-red-500 text-white px-4 py-2 rounded`}
          >
            Delete Resume
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download Resume
          </button>
        </header>
      </div>
      {getMyResumeByIdLoader && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">
            <Loader2 className="animate-spin h-6 w-6 mr-2 inline-block" />
          </p>
        </div>
      )}
      {resume && (
        <div
          ref={resumeRef}
          className="bg-white p-4 sm:p-6 font-sans w-full max-w-[800px] mx-auto text-xs sm:text-sm md:text-base print:w-[800px] print:mx-auto"
        >
          <h1 className="text-lg sm:text-xl font-semibold text-center">
            {resume.fullname}
          </h1>
          <p className="text-center font-bold text-lg sm:text-2xl text-green-500">
            {resume.jobtitle}
          </p>
          <p className="text-center text-sm sm:text-md">{resume.address}</p>

          <div className="flex flex-col sm:flex-row justify-between mt-2 text-xs sm:text-sm text-gray-600 gap-1 sm:gap-0">
            <p>{resume.phone}</p>
            <p>{resume.email}</p>
          </div>

          {resume.summary && (
            <div className="mt-3">
              <hr className="text-green-500 pb-1" />
              <p className="mt-2">{resume.summary}</p>
            </div>
          )}

          {resume.experience && resume.experience.length > 0 && (
            <div className="mt-3">
              <h2 className="text-base sm:text-lg font-semibold text-center text-green-500 uppercase">
                Professional Experience
              </h2>
              <hr className="text-green-500 pb-1" />
              {resume.experience.map((exp, index) => (
                <div key={index} className="mt-2 mb-5">
                  <h3 className="font-bold text-green-500">
                    {exp.positiontitle}
                  </h3>
                  <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm">
                    <p>
                      {exp.companyname}, {exp.city}, {exp.state}
                    </p>
                    <p>
                      {exp.startdate} - {exp.enddate}
                    </p>
                  </div>
                  <p
                    className="mt-1"
                    dangerouslySetInnerHTML={{ __html: exp.summary }}
                  ></p>
                </div>
              ))}
            </div>
          )}

          {resume.education && resume.education.length > 0 && (
            <div className="mt-6">
              <h2 className="text-base sm:text-lg font-semibold text-center text-green-500 uppercase">
                Education
              </h2>
              <hr className="text-green-500 pb-1" />
              {resume.education.map((edu, index) => (
                <div key={index} className="mb-6 p-2 sm:p-4">
                  <h3 className="text-sm sm:text-lg font-semibold text-green-700">
                    {edu.universityname}
                    <span className="text-gray-600 font-medium">
                      {" "}
                      — {edu.degree}
                    </span>
                  </h3>
                  <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-500 mt-1">
                    <p className="italic">{edu.major}</p>
                    <p>
                      {edu.startdate} — {edu.enddate}
                    </p>
                  </div>
                  {edu.summary && (
                    <p className="mt-3 text-gray-700 leading-relaxed">
                      {edu.summary}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {resume.projects && resume.projects.length > 0 && (
            <div className="mt-6">
              <h2 className="resumetext-base sm:text-lg font-semibold text-center text-green-500 uppercase">
                Projects
              </h2>
              <hr className="text-green-500 pb-1" />
              {resume.projects.map((pro, index) => (
                <div key={index} className="mb-6 p-2 sm:p-4">
                  <div className="flex flex-row justify-between items-center text-xs sm:text-sm text-gray-500 mt-1">
                    <h3 className="text-sm sm:text-lg font-semibold text-green-700">
                      {pro.projectname}
                    </h3>
                    <h3>
                      {pro.startdate} — {pro.enddate}
                    </h3>
                  </div>
                  {pro.description && (
                    <p className="mt-3 text-gray-700 leading-relaxed">
                      {pro.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {resume.skills && resume.skills.length > 0 && (
            <div className="mt-6">
              <h2 className="text-base sm:text-lg font-semibold text-center text-green-500 uppercase">
                Skills
              </h2>
              <hr className="text-green-500 pb-1" />
              <ul className="list-disc grid grid-cols-2 sm:grid-cols-5 pl-5 mt-3 text-xs sm:text-sm">
                {resume.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PreviewResume;
