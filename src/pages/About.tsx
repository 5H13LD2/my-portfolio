import CertificatesSection from "../components/CertificatesSection";

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
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start mb-14">
          <div>
            <p className="text-[11px] font-medium text-[#4d7cc7] uppercase tracking-[0.18em] mb-3">About</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#f0f0f0] mb-5">Background, Skills & Credentials</h1>
            <div className="space-y-4 text-base text-[#888] leading-[1.85] max-w-[760px]">
              <p>
                I'm <span className="text-[#e5e5e5]">Jerico Jimenez</span>, a Data Engineer based in the Philippines with a strong foundation in Full Stack Development.
              </p>
              <p>
                With almost <span className="text-[#e5e5e5]">1 year of professional experience</span>, I've managed <span className="text-[#e5e5e5]">200k+ record datasets</span> using the <span className="text-[#e5e5e5]">AWS-Airflow-Snowflake stack</span>, bridging backend engineering with high-performance data analytics.
              </p>
            </div>
          </div>

          <aside className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
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
