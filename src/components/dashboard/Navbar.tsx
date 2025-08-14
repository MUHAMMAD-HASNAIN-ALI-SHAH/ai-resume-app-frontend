import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const Navbar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  return (
    <nav className="w-full shadow-sm select-none mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      {/* Logo / Title */}
      <div className="flex gap-5">
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-2xl font-bold text-gray-800"
        >
          Dashboard
        </h1>
      </div>
      {/* Links */}
      <div className="flex gap-1 md:gap-3">
        <button
          onClick={logout}
          className="px-2 md:px-4 py-1 md:py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
