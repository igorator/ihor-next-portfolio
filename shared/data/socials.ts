import { FaGithub, FaLinkedin, FaUpwork } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const socials = {
  email: {
    url: "ihor.kliushnyk@gmail.com",
    icon: MdEmail,
  },

  github: {
    url: "https://github.com/igorator",
    icon: FaGithub,
  },

  linkedIn: {
    url: "https://www.linkedin.com/in/ihor-kliushnyk/",
    icon: FaLinkedin,
  },

  upwork: {
    url: "https://upwork.com/freelancers/ihorkliushnyk",
    icon: FaUpwork,
  },
} as const;
