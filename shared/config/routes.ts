import {
  BsHouse,
  BsFolder2,
  BsBriefcase,
  BsFileEarmarkText,
} from "react-icons/bs";

export const routes = {
  root: {
    path: "/",
    label: "Home",
    icon: BsHouse,
  },
  projects: {
    path: "/projects",
    label: "Projects",
    icon: BsFolder2,
  },
  employment: {
    path: "/employment",
    label: "Employment",
    icon: BsBriefcase,
  },
  cv: {
    path: "/cv",
    label: "CV",
    icon: BsFileEarmarkText,
  },
} as const;
