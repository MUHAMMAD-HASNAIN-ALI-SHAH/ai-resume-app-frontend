import useDashboardStore from "../../store/useDashboardStore";

const ResumeHero = () => {
  const { setMenu } = useDashboardStore();
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center gap-10 my-10">
      <button
        onClick={() => setMenu("create-resume")}
        className="cursor-pointer px-5 md:px-10 py-3 md:py-5 rounded-full text-md sm:text-xl whitespace-nowrap md:text-3xl bg-gradient-to-br from-blur-200 via-blue-300 to-blue-400"
      >
        Create Resume
      </button>
      <button className="cursor-pointer px-5 md:px-10 py-3 md:py-5 rounded-full text-md sm:text-xl whitespace-nowrap md:text-3xl bg-gradient-to-br from-blur-200 via-blue-300 to-blue-400">
        Analyse your resume
      </button>
    </div>
  );
};

export default ResumeHero;
