import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "HRIS & Payroll Management Platform (Production)",
    description:
      "Contributed to the development and production support of a live HRIS and Payroll platform used by HR and Accounting teams for payroll computation, employee record management, reporting, and payslip generation. Built backend modules using Laravel (MVC), implemented dynamic UI components, and assisted in structured data migration from Excel into CRM systems.",
    tech: [
      "Laravel 12",
      "MySQL",
      "Blade",
      "Livewire",
      "Bootstrap",
      "JavaScript (jQuery)",
    ],
    images: [
      "/assets/hris-screenshot/photo1.jpg",
      "/assets/hris-screenshot/photo2.jpg",
      "/assets/hris-screenshot/photo3.jpg",
    ],
  },
  {
    id: "2",
    title: "TechLaunch Mobile LMS – Android App",
    description:
      "Designed and developed a native Android mobile app for an IT interview preparation platform, enabling students and fresh graduates to practice coding, track progress, and access assessments. Integrated Firebase for authentication, data storage, and backend services, with Chaquopy enabling in-app Python, SQL, and Java code execution. The platform is complemented by a React-based CMS for managing content and user progress.",
    tech: ["Kotlin", "Firebase", "XML", "Chaquopy", "SQL", "Android Studio"],
    images: [
      "/assets/app-screenhot/app_screen-1.jpg",
      "/assets/app-screenhot/app_screen-2.jpg",
      "/assets/app-screenhot/app_screen-3.jpg",
      "/assets/app-screenhot/app_screen-4.jpg",
    ],
  },
  {
    id: "3",
    title: "TechLaunch CMS – Content Management System",
    description:
      "Admin CMS for managing interview prep content, assessments, and user progress tracking.",
    tech: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    images: [
      "/assets/cms-screenshot/cms_screenshot-1.jpg",
      "/assets/cms-screenshot/cms_screenshot-2.jpg",
    ],
    repoUrl: "https://github.com/5H13LD2/admin-cms",
  },
  {
    id: "4",
    title: "Portfolio Website",
    description:
      "Personal portfolio built with React and Tailwind CSS to showcase my projects and skills.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    images: ["/profile.jpg"],
  },
];
