import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeAnalyser from "./pages/ResumeAnalyser";
import CreateResume from "./pages/CreateResume";
import PreviewResume from "./pages/PreviewResume";

function App() {
  const { verify, isAuthenticated, isAuthenticatedLoading } = useAuthStore();

  useEffect(() => {
    verify();
    console.log("Verifying authentication status...");
  }, []);

  if (isAuthenticatedLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={!isAuthenticated ? <Signin /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to={"/signin"} />
          }
        />
        <Route
          path="/dashboard/resume-builder"
          element={
            isAuthenticated ? <ResumeBuilder /> : <Navigate to={"/signin"} />
          }
        />
        <Route
          path="/dashboard/resume-builder/create-resume"
          element={
            isAuthenticated ? <CreateResume /> : <Navigate to={"/signin"} />
          }
        />
        <Route
          path="/dashboard/preview-resume/:resumeId"
          element={
            isAuthenticated ? <PreviewResume /> : <Navigate to={"/signin"} />
          }
        />
        <Route
          path="/dashboard/resume-analyser"
          element={
            isAuthenticated ? <ResumeAnalyser /> : <Navigate to={"/signin"} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
