import { create } from "zustand";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axios";

interface User {
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
  authLoader: boolean;
  googleSignin: () => void;
  verify: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthenticatedLoading: true,
  authLoader: false,

  verify: async () => {
    try {
      console.log("Verifying authentication status...");
      const response = await axiosInstance.get("/api/v1/auth/verify");
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      set({ isAuthenticatedLoading: false });
    } catch (error: any) {
      set({ user: null, isAuthenticated: false });
      set({ isAuthenticatedLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ user: null, isAuthenticated: false });
      await axiosInstance.get("/api/v1/auth/logout");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Logout failed");
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  googleSignin: async () => {
    try {
      set({ user: null, isAuthenticated: false });
      window.location.href = `${
        import.meta.env.VITE_API_URL
      }/api/v1/auth/google`;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Google Signin failed");
    } finally {
    }
  },
}));

export default useAuthStore;
