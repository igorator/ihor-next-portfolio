export const siteConfig = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://igorator.site",
  name: "Ihor Kliushnyk",
  author: "Ihor Kliushnyk",
  description:
    "Developer specializing in React, Next.js, and TypeScript — building fast, accessible, production-grade web applications.",
  keywords: [
    "Developer",
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
      title: "Ihor Kliushnyk — Developer",
      description:
        "Developer specializing in React, Next.js, and TypeScript. Building performant, accessible web applications and modern UI.",
    },
    projects: {
      title: "Projects",
      description:
        "My projects — React apps, Next.js sites, and modern web development with TypeScript.",
    },
    project: {
      fallbackDescription:
        "One of my projects built with React, Next.js, and TypeScript.",
    },
    employment: {
      description:
        "My work history — Developer with hands-on experience in React, Next.js, TypeScript, and performance optimization.",
    },
  },
  og: {
    brand: "Ihor Kliushnyk",
    subtitle: "Developer",
    image: "/opengraph-image.png",
  },
} as const;
