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
      "/assets/app-screenhot/app_screen-5.jpg",
      "/assets/app-screenhot/app_screen-6.jpg",
      "/assets/app-screenhot/app_screen-7.jpg",
      "/assets/app-screenhot/app_screen-8.jpg",
      "/assets/app-screenhot/app_screen-9.jpg",
    ],
    repoUrl: "https://github.com/5H13LD2/capstone-android-app",
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
    title: "Enterprise Inventory Data Integration and Management",
    description:
      "Implemented an end-to-end enterprise-level data integration workflow to manage inventory across multiple branches. Performed ETL operations on multiple sources (Excel, Access DB) using Pentaho, including data cleaning, type validation, and date validation against Date_Dim. Loaded validated records into the Inventory_Fact table of a PostgreSQL data warehouse. Additionally, managed real-time inventory tracking for SM Supermarket branches using MongoDB, handling nested product arrays and stock updates per store. Built reports and dashboards using Jaspersoft for inventory monitoring and analytics.",
    tech: [
      "PostgreSQL",
      "SQL",
      "Pentaho Data Integration (Kettle)",
      "Jaspersoft",
      "IBM Cloud",
      "MongoDB",
    ],
    images: [
      "/assets/sqlmaster_screenshot/DATA_WAREHOUSE.png",
      "/assets/sqlmaster_screenshot/pentaho_db_ETL.png",
      "/assets/sqlmaster_screenshot/STORED_PROCEDURE.png",
      "/assets/sqlmaster_screenshot/SQL_SCRIPTING.png",
      "/assets/sqlmaster_screenshot/SQL_JOINS.png",
      "/assets/sqlmaster_screenshot/1NF.png",
      "/assets/sqlmaster_screenshot/MONGOSH_ATLAS.png",
      "/assets/sqlmaster_screenshot/REPORT_JASPERSOFTG.png",
    ],
  },
  {
    id: "5",
    title: "Data Analytics & Insights Project",
    description:
      "Performed end-to-end data analytics by cleaning and transforming datasets using Python (Pandas), generating actionable insights and visualizations in Power BI, and comparing dataset versions using WinMerge. Leveraged spreadsheets for data storage and organization, ensuring accurate and consistent reporting for decision-making.",
    tech: [
      "Python",
      "Pandas",
      "Power BI",
      "Google Sheets / Excel",
      "WinMerge",
      "Data Cleaning",
      "Data Visualization",
    ],
    images: [
      "/assets/data-analyst/Screenshot 2026-02-24 122147.png",
      "/assets/data-analyst/Screenshot 2026-02-24 122404.png",
    ],
  },
  {
    id: "6",
    title: "Portfolio Website",
    description:
      "Personal portfolio built with React and Tailwind CSS to showcase my projects and skills.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    images: ["/profile.jpg"],
  },
];
