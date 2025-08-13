import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

export interface CreateResume {
  fullname: string;
  jobtitle: string;
  address: string;
  phone: string;
  email: string;
  summary: string;
  experience: {
    positiontitle: string;
    companyname: string;
    city: string;
    state: string;
    startdate: string;
    enddate: string;
    summary: string;
  }[];
  education: {
    universityname: string;
    degree: string;
    major: string;
    startdate: string;
    enddate: string;
    summary: string;
  }[];
  projects: {
    projectname: string;
    description: string;
    startdate: string;
    enddate: string;
  }[];
  skills: {
    name: string;
  }[];
}

interface CreateResumeState {
  formMenu: number;
  form: CreateResume;
  formSubmitted: boolean;
  formSubmitting: boolean;
  prevFormMenu: () => void;
  nextFormMenu: () => void;
  getMyResumes: () => Promise<any>;
  handleFormStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreateResumeSubmit: () => void;
  addMoreExperienceButton: () => void;
  removeLastExperience: () => void;
  addMoreEducationButton: () => void;
  removeLastEducation: () => void;
  addMoreProjectButton: () => void;
  removeLastProject: () => void;
  addMoreSkillsButton: () => void;
  removeLastSkill: () => void;
  handleExperienceStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleEducationStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleProjectStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleSkillsStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleRichTextEditorText: (value: string, index: number) => void;
  reset: () => void;
}

const useCreateResumeStore = create<CreateResumeState>((set, get) => ({
  formMenu: 1,
  form: {
    fullname: "",
    jobtitle: "",
    address: "",
    phone: "",
    email: "",
    summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
  },
  formSubmitting: false,
  formSubmitted: false,
  prevFormMenu: () => {
    set((state) => ({
      formMenu: state.formMenu > 1 ? state.formMenu - 1 : state.formMenu,
    }));
  },
  nextFormMenu: () => {
    set((state) => ({
      formMenu: state.formMenu < 6 ? state.formMenu + 1 : state.formMenu,
    }));
  },
  handleCreateResumeSubmit: async () => {
    try {
      await axiosInstance.post("/api/v2/create-resume", get().form);
      set({ formSubmitted: true });
      set({ formSubmitting: true });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while creating the resume."
      );
    }
  },
  getMyResumes: async () => {
    try {
      const response = await axiosInstance.get("/api/v2/create-resume");
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching resumes."
      );
      return [];
    }
  },
  handleFormStrings: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      form: {
        ...state.form,
        [name]: value,
      },
    }));
    console.log(get().form);
  },
  addMoreExperienceButton: () => {
    set((state) => ({
      form: {
        ...state.form,
        experience: [
          ...state.form.experience,
          {
            positiontitle: "",
            companyname: "",
            city: "",
            state: "",
            startdate: "",
            enddate: "",
            summary: "",
          },
        ],
      },
    }));
  },
  removeLastExperience: () => {
    set((state) => {
      const updatedExperience = state.form.experience.slice(0, -1);
      return {
        form: {
          ...state.form,
          experience: updatedExperience,
        },
      };
    });
  },
  addMoreProjectButton: () => {
    set((state) => ({
      form: {
        ...state.form,
        projects: [
          ...state.form.projects,
          {
            projectname: "",
            description: "",
            startdate: "",
            enddate: "",
          },
        ],
      },
    }));
  },
  removeLastProject: () => {
    set((state) => {
      const updatedProjects = state.form.projects.slice(0, -1);
      return {
        form: {
          ...state.form,
          projects: updatedProjects,
        },
      };
    });
  },
  addMoreEducationButton: () => {
    set((state) => ({
      form: {
        ...state.form,
        education: [
          ...state.form.education,
          {
            universityname: "",
            degree: "",
            major: "",
            startdate: "",
            enddate: "",
            summary: "",
          },
        ],
      },
    }));
  },
  removeLastEducation: () => {
    set((state) => {
      const updatedEducation = state.form.education.slice(0, -1);
      return {
        form: {
          ...state.form,
          education: updatedEducation,
        },
      };
    });
  },
  addMoreSkillsButton: () => {
    set((state) => ({
      form: {
        ...state.form,
        skills: [
          ...state.form.skills,
          {
            name: "",
          },
        ],
      },
    }));
  },
  removeLastSkill: () => {
    set((state) => {
      const updatedSkills = state.form.skills.slice(0, -1);
      return {
        form: {
          ...state.form,
          skills: updatedSkills,
        },
      };
    });
  },
  handleExperienceStrings: (e, index) => {
    const { name, value } = e.target;
    set((state) => {
      const updatedExperience = [...state.form.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [name]: value,
      };
      return {
        form: {
          ...state.form,
          experience: updatedExperience,
        },
      };
    });
  },
  handleEducationStrings: (e, index) => {
    const { name, value } = e.target;
    set((state) => {
      const updatedEducation = [...state.form.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      };
      return {
        form: {
          ...state.form,
          education: updatedEducation,
        },
      };
    });
  },
  handleProjectStrings: (e, index) => {
    const { name, value } = e.target;
    set((state) => {
      const updatedProjects = [...state.form.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [name]: value,
      };
      return {
        form: {
          ...state.form,
          projects: updatedProjects,
        },
      };
    });
  },
  handleSkillsStrings: (e, index) => {
    const { value } = e.target;
    set((state) => {
      const updatedSkills = [...state.form.skills];
      updatedSkills[index] = {
        name: value,
      };
      return {
        form: {
          ...state.form,
          skills: updatedSkills,
        },
      };
    });
  },
  handleRichTextEditorText: (value, index) => {
    set((state) => {
      const updatedExperience = [...state.form.experience];
      updatedExperience[index].summary = value;
      return {
        form: {
          ...state.form,
          experience: updatedExperience,
        },
      };
    });
    console.log(get().form.experience[index].summary);
  },
  reset: () =>
    set({
      formMenu: 1,
      form: {
        fullname: "",
        jobtitle: "",
        address: "",
        phone: "",
        email: "",
        summary: "",
        experience: [],
        education: [],
        projects: [],
        skills: [],
      },
      formSubmitted: false,
      formSubmitting: false,
    }),
}));

export default useCreateResumeStore;
