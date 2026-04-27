import type { Experience } from "../types/experience";

export const experience: Experience[] = [
    {
        id: "simplevia-junior-full-stack-engineer-intern",
        title: "Junior Full-Stack Engineer Intern",
        company: "Simplevia Technologies",
        location: "Pasig City, Metro Manila",
        period: "Feb 2026 - Apr 2026",
        description:
            "Engineered modules for the Makati City Accounting & Information System, building Laravel backend services and Vue.js interfaces for journalization and financial reporting. Implemented secure role-based workflows, automated OR/JEV generation, multi-stage approval logic, audit trails, and maintained complex MySQL migrations across a production-scale government system.",
        tech: [
            "Laravel 9",
            "Vue.js",
            "MySQL",
            "Spatie RBAC",
            "PHP",
            "Financial Workflows",
            "Audit Trails",
            "Government Systems",
        ],
    },
    {
        id: "nephila-junior-full-stack-developer-internship",
        title: "Junior Full-Stack Developer",
        company: "Nephila Web Technology",
        location: "Quezon City, Metro Manila",
        period: "Aug 2025 - Dec 2025",
        status: "Internship / Project-Based",
        description:
            "Built and deployed core Payroll and HRIS modules using Laravel and MySQL, automating reporting and payslip generation for HR and Accounting workflows. Executed structured data migration from Excel to CRM systems, optimized backend SQL queries to reduce processing time, and supported the live HRIS platform with Blade and Livewire UI work.",
        tech: [
            "Laravel 12",
            "MySQL",
            "Blade",
            "Livewire",
            "Bootstrap",
            "JavaScript",
            "SQL Optimization",
            "Data Migration",
            "HRIS",
            "Payroll",
        ],
    },
    {
        id: "self-employed-web-developer-freelance",
        title: "Web Developer",
        company: "Self Employed",
        location: "National Capital Region, Philippines · Remote",
        period: "May 2024 - Oct 2025",
        status: "Freelance",
        description:
            "Provided freelance web development services for remote clients, building and maintaining web applications with backend and frontend technologies.",
        tech: [
            "Spring Boot",
            "HTML",
            "Web Development",
        ],
    },
];
