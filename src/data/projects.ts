import type { Project } from "../types/project"

export const projects: Project[] = [
    {
        id: "1",
        title: "Human Resource Management System And Payroll System",
        description: "Developed features and handled system enhancements for the Human Resource Management System and Payroll System ",
        tech: ["Laravel", "MySQL", "Bootstrap", "JavaScript (jQuery)"],
        images: [
            "/assets/app-screenhot/app_screen-1.jpg",
            "/assets/app-screenhot/app_screen-2.jpg",
            "/assets/app-screenhot/app_screen-3.jpg",
            "/assets/app-screenhot/app_screen-4.jpg"
        ]
    },
    {
        id: "2",
        title: "TechLaunch CMS – Content Management System",
        description: "Admin CMS for managing interview prep content, assessments, and user progress tracking.",
        tech: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
        images: [
            "/assets/cms-screenshot/cms_screenshot-1.jpg",
            "/assets/cms-screenshot/cms_screenshot-2.jpg"
        ],
        repoUrl: "https://github.com/5H13LD2/admin-cms"
    },
    {
        id: "3",
        title: "Portfolio Website",
        description: "Personal portfolio built with React and Tailwind CSS to showcase my projects and skills.",
        tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
        images: ["/profile.jpg"]
    }
]
