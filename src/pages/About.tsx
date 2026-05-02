import { BriefcaseBusiness, CalendarDays } from "lucide-react";
import CertificatesSection from "../components/CertificatesSection";
import { experience } from "../data/experience";

const skillGroups = [
  { category: "Data Engineering", items: ["Python", "Apache Airflow", "Snowflake", "Amazon S3", "Pentaho", "ETL Pipelines", "Data Cleaning", "Data Visualization"] },
  { category: "Backend", items: ["Laravel 12", "Node.js", "PHP", "REST APIs", "Livewire", "Kotlin", "Firebase"] },
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Blade", "Bootstrap", "Android XML", "JavaScript"] },
  { category: "Cloud & DevOps", items: ["AWS EC2", "Docker Compose", "IBM Cloud", "GitHub", "Vite", "Postman"] },
  { category: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase Firestore", "SQL", "Data Modeling"] },
];

export default function About() {
  return (
    <main className="relative z-10 min-h-[calc(100vh-56px)]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-16 w-full">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-8 items-stretch mb-14">
          <section className="rounded-xl border border-[#1e1e1e] bg-[#111] p-6 sm:p-8">
            <p className="text-[11px] font-medium text-[#4d7cc7] uppercase tracking-[0.18em] mb-3">About</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#f0f0f0] mb-5">Background, Skills & Credentials</h1>
            <div className="space-y-4 text-base text-[#888] leading-[1.85] max-w-[760px]">
              <p>
                I'm <span className="text-[#e5e5e5]">Jerico Jimenez</span>, a Data Engineer based in the Philippines with a strong foundation in Full Stack Development.
              </p>
              <p>
                With nearly <span className="text-[#e5e5e5]">1 year of professional experience</span>, I've built and managed <span className="text-[#e5e5e5]">200k+ record datasets</span> using modern data stacks such as <span className="text-[#e5e5e5]">AWS, Airflow, Snowflake, and Athena</span>, designing end-to-end data pipelines from ingestion to analytics-ready layers. I specialize in <span className="text-[#e5e5e5]">Medallion Architecture</span> (Bronze-Silver-Gold), ETL orchestration, and SQL-based data transformation, enabling reliable and scalable data systems for reporting and analytics.
              </p>
              <p>
                I bring a hybrid skill set that bridges backend engineering and data engineering, allowing me to understand both application-level data generation and downstream analytics. I'm particularly focused on building efficient, maintainable, and cost-optimized data pipelines in cloud environments.
              </p>
            </div>
          </section>

          <aside className="h-full bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
            {[
              ["Full name", "Jerico Jimenez"],
              ["Role", "Data Engineer"],
              ["Location", "Philippines"],
              ["Experience", "~1 year"],
              ["Status", "Open to work"],
            ].map(([label, value]) => (
              <div key={label} className="py-3 border-b border-[#1e1e1e] flex flex-col gap-1">
                <span className="text-[10px] text-[#444] uppercase tracking-wider">{label}</span>
                <span className={`text-sm ${label === "Status" ? "text-[#4ade80]" : "text-[#bbb]"}`}>{value}</span>
              </div>
            ))}
            <div className="py-3 border-b border-[#1e1e1e] flex flex-col gap-1">
              <span className="text-[10px] text-[#444] uppercase tracking-wider">GitHub</span>
              <a href="https://github.com/5H13LD2" target="_blank" rel="noopener noreferrer" className="text-sm text-[#4d7cc7] hover:underline">github.com/5H13LD2</a>
            </div>
            <div className="py-3 border-b border-[#1e1e1e] flex flex-col gap-1">
              <span className="text-[10px] text-[#444] uppercase tracking-wider">LinkedIn</span>
              <a href="https://www.linkedin.com/in/jerico-jimenez-a504852a4/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#4d7cc7] hover:underline">View profile</a>
            </div>
            <div className="py-3 flex flex-col gap-1">
              <span className="text-[10px] text-[#444] uppercase tracking-wider">Email</span>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jimenezjerico227@gmail.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#4d7cc7] hover:underline">jimenezjerico227@gmail.com</a>
            </div>
          </aside>
        </div>

        <section className="mb-14">
          <div className="border border-[#1e1e1e] bg-[#111] rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-[#f0f0f0] mb-8">Experience</h2>

            <div className="relative border-l border-[#242424] pl-5 sm:pl-7 space-y-10">
              {experience.map((item) => (
                <article key={item.id} className="relative">
                  <span className="absolute -left-[29px] sm:-left-[37px] top-1 h-4 w-4 rounded-full border-2 border-[#f0f0f0] bg-[#111]" />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold leading-tight text-[#f0f0f0]">{item.title}</h3>
                      <div className="mt-2 flex items-center gap-2 text-sm text-[#9a9a9a]">
                        <BriefcaseBusiness className="h-4 w-4 text-[#b8b8b8]" aria-hidden="true" />
                        <span>{item.location ? `${item.company} · ${item.location}` : item.company}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#9a9a9a] sm:justify-end sm:pt-0.5">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-[#8d8d8d]" aria-hidden="true" />
                        {item.period}
                      </span>
                      {item.status ? (
                        <span className="rounded-full bg-[#242424] px-3 py-1 text-[11px] font-semibold text-[#e7e7e7]">
                          {item.status}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <p className="mt-4 max-w-[920px] text-[15px] leading-7 text-[#c7c7c7]">{item.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span
                        key={`${item.id}-${tech}`}
                        className="rounded-full border border-[#272727] bg-[#0a0a0a] px-3 py-1 text-xs font-semibold leading-none text-[#eeeeee]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-[11px] font-medium text-[#4d7cc7] uppercase tracking-[0.18em] mb-3">Expertise</p>
          <h2 className="text-3xl font-semibold text-[#f0f0f0] mb-6">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {skillGroups.map((group) => (
              <div key={group.category} className="border border-[#1e1e1e] bg-[#111] rounded-xl p-5">
                <h3 className="text-base font-medium text-[#e0e0e0] mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="tech-pill px-3 py-1.5 rounded-md border border-[#1e1e1e] bg-[#0a0a0a] text-[#aaa] text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <CertificatesSection />
      </div>
    </main>
  );
}
