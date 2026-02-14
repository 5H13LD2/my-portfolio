import { projects } from "../data/projects";

import ProjectCard from "../components/ProjectCard";
import CertificatesSection from "../components/CertificatesSection";
import ResumeButton from "../components/ResumeButton";
import PDFModal from "../components/PDFModal";
import { useState } from "react";

const Home = () => {
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

  const openPDFModal = () => {
    setIsPDFModalOpen(true);
  };

  const closePDFModal = () => {
    setIsPDFModalOpen(false);
  };

  return (
    <div className="lg:ml-96 min-h-screen pt-20 lg:pt-0">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Resume Section */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <div className="p-4 sm:p-6 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Resume
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Download my resume to get a detailed overview of my experience,
              skills, and education.
            </p>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-gray-700">
                Format:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                  PDF
                </span>
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                  Updated 2025
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-2">
              <ResumeButton
                onClick={openPDFModal}
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 lg:mb-8">
            Projects
          </h2>

          <div className="space-y-4 lg:space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <CertificatesSection />

        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
            {[
              "JavaScript",
              "TypeScript",
              "React",
              "Node.js",
              "Laravel",
              "MySQL",
              "MongoDB",
              "Git",
              "Tailwind CSS",
            ].map((skill) => (
              <div
                key={skill}
                className="px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-center font-medium text-gray-700 text-sm sm:text-base"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Add some bottom padding for mobile */}
        <div className="h-8 lg:h-0"></div>
      </div>

      {/* PDF Modal */}
      <PDFModal
        isOpen={isPDFModalOpen}
        onClose={closePDFModal}
        pdfUrl="/other/Jimenez Jerico - Resume.pdf"
        fileName="Jimenez_Jerico_Resume.pdf"
      />
    </div>
  );
};

export default Home;
