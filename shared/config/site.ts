export const siteConfig = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://igorator.site",
  name: "Ihor Kliushnyk",
  author: "Ihor Kliushnyk",
  description:
    "Frontend Developer specializing in React, Next.js, and TypeScript — building fast, accessible, production-grade web applications.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "UI Engineer",
    "JavaScript",
  ] as string[],
  socials: {
    github: "https://github.com/igorator",
    linkedin: "https://www.linkedin.com/in/ihor-kliushnyk/",
    upwork: "https://upwork.com/freelancers/ihorkliushnyk",
    email: "ihor.kliushnyk@gmail.com",
  },
  pages: {
    home: {
      title: "Ihor Kliushnyk — Frontend Developer",
      description:
        "Frontend Developer specializing in React, Next.js, and TypeScript. Building performant, accessible web applications and modern UI.",
    },
    projects: {
      title: "Projects",
      description:
        "Frontend projects by Ihor Kliushnyk — React apps, Next.js sites, and modern web development with TypeScript.",
    },
    project: {
      fallbackDescription:
        "A frontend project by Ihor Kliushnyk built with React, Next.js, and TypeScript.",
    },
    employment: {
      description:
        "Work history of Ihor Kliushnyk — Frontend Developer with hands-on experience in React, Next.js, TypeScript, and performance optimization.",
    },
  },
  og: {
    brand: "Ihor Kliushnyk",
    subtitle: "Frontend Developer",
  },
} as const;
