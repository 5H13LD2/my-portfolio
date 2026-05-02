export type Experience = {
    id: string;
    title: string;
    company: string;
    period: string;
    status?: string;
    description: string;
    tech: string[];
};

export const experiences: Experience[] = [
    {
        id: "1",
        title: "Data Engineer OJT",
        company: "Simplevia Technologies Inc.",
        period: "Feb 2026 - Present · 3 mos",
        status: "OJT · Hybrid · Pasig, National Capital Region, Philippines",
        description:
            "Worked on production-grade data engineering workflows involving AWS, Apache Airflow, Snowflake, Docker, Python, and SQL. Built and maintained scalable ETL/ELT pipelines, including an S3-to-Snowflake retail data pipeline that processed 200,000+ transaction records. Designed containerized workflows using Docker Compose, orchestrated DAGs with Apache Airflow, and optimized SQL transformations for analytics-ready datasets.",
        tech: [
            "Amazon Web Services (AWS)",
            "Apache Airflow",
            "Snowflake",
            "Amazon S3",
            "AWS EC2",
            "Docker Compose",
            "Python",
            "Boto3",
            "SQL",
            "ETL/ELT",
        ],
    },
    {
        id: "2",
        title: "Full Stack OJT",
        company: "Nephila Web",
        period: "Sep 2025 - Dec 2025 · 4 mos",
        status: "OJT · On-site · National Capital Region, Philippines",
        description:
            "Contributed to the development and production support of an HRIS and Payroll Management Platform used by HR and Accounting teams. Built backend modules using Laravel MVC, developed dynamic UI components with Blade, Livewire, Bootstrap, and JavaScript, and assisted in structured data migration from Excel into CRM/database systems. Supported features related to payroll computation, employee records, reporting, and payslip generation.",
        tech: [
            "Laravel",
            "PHP",
            "MySQL",
            "Blade",
            "Livewire",
            "Bootstrap",
            "JavaScript",
            "jQuery",
            "SQL",
            "Full-Stack Development",
        ],
    },
    {
        id: "3",
        title: "Web Developer",
        company: "Self Employed",
        period: "May 2024 - Oct 2025 · 1 yr 6 mos",
        status: "Freelance · Remote · National Capital Region, Philippines",
        description:
            "Designed and developed custom websites and web applications as a freelance web developer. Worked on responsive user interfaces, backend functionality, database integration, deployment, and maintenance. Built portfolio and business-focused web solutions while handling the full development lifecycle from requirements gathering to production deployment.",
        tech: [
            "React",
            "TypeScript",
            "JavaScript",
            "PHP",
            "MySQL",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "AWS EC2",
            "Docker",
            "Web Development",
        ],
    },
];
