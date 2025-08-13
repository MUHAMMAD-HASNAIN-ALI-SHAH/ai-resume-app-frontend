import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useCreateResumeStore from "../../../store/useCreateResumeStore";

const ResumePreview = () => {
  const { form, formSubmitted} =
    useCreateResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${form.fullname || "resume"}`,
  });

  return (
    <div className={` flex flex-col items-center gap-4 mr-5 mt-5 min-h-[40vh]`}>
      {/* Print Button */}
      {formSubmitted && (
        <button
          type="button"
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      )}

      {/* Resume Preview */}
      <div
        ref={resumeRef}
        className="bg-white p-4 sm:p-6 font-sans w-full max-w-[800px] mx-auto text-xs sm:text-sm md:text-base print:w-[800px] print:mx-auto"
      >
        <h1 className="text-lg sm:text-xl font-semibold text-center">
          {form.fullname}
        </h1>
        <p className="text-center font-bold text-lg sm:text-2xl text-green-500">
          {form.jobtitle}
        </p>
        <p className="text-center text-sm sm:text-md">{form.address}</p>

        <div className="flex flex-col sm:flex-row justify-between mt-2 text-xs sm:text-sm text-gray-600 gap-1 sm:gap-0">
          <p>{form.phone}</p>
          <p>{form.email}</p>
        </div>

        {form.summary && (
          <div className="mt-3">
            <hr className="text-green-500 pb-1" />
            <p className="mt-2">{form.summary}</p>
          </div>
        )}

        {form.experience && form.experience.length > 0 && (
          <div className="mt-3">
            <h2 className="text-base sm:text-lg font-semibold text-center text-green-500 uppercase">
              Professional Experience
            </h2>
            <hr className="text-green-500 pb-1" />
            {form.experience.map((exp, index) => (
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

        {form.education && form.education.length > 0 && (
          <div className="mt-6">
            <h2 className="text-base sm:text-lg font-semibold text-center text-green-500 uppercase">
              Education
            </h2>
            <hr className="text-green-500 pb-1" />
            {form.education.map((edu, index) => (
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

        {form.projects && form.projects.length > 0 && (
          <div className="mt-6">
            <h2 className="text-base sm:text-lg font-semibold text-center text-green-500 uppercase">
              Projects
            </h2>
            <hr className="text-green-500 pb-1" />
            {form.projects.map((pro, index) => (
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

        {form.skills && form.skills.length > 0 && (
          <div className="mt-6">
            <h2 className="text-base sm:text-lg font-semibold text-center text-green-500 uppercase">
              Skills
            </h2>
            <hr className="text-green-500 pb-1" />
            <ul className="list-disc grid grid-cols-2 sm:grid-cols-5 pl-5 mt-3 text-xs sm:text-sm">
              {form.skills.map((skill, index) => (
                <li key={index} className="text-gray-700">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
