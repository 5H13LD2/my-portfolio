import { useState } from "react";
import { Linkedin, Github, Mail, Menu, X } from "lucide-react";
import ResumeButton from "./ResumeButton";
import PDFModal from "./PDFModal";
import { certificates } from "../data/certificates";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openPDFModal = () => {
    setIsPDFModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closePDFModal = () => {
    setIsPDFModalOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 z-50 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white p-0.5">
              <img
                src="/profile.jpg"
                alt="Jerico Jimenez"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold">Jerico Jimenez</h1>
              <p className="text-xs text-blue-100">
                Software Full-Stack Engineer
              </p>
            </div>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        >
          <div className="fixed top-0 left-0 right-0 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 pt-20 shadow-xl">
            <div className="space-y-6 max-h-screen overflow-y-auto">
              {/* Profile Image - Mobile */}
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                  <img
                    src="/profile.jpg"
                    alt="Jerico Jimenez"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Contact Section - Mobile */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-center">Contact</h2>
                <div className="space-y-2">
                  <a
                    href="https://www.linkedin.com/in/jerico-jimenez-a504852a4/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors p-2 rounded-lg hover:bg-blue-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Linkedin size={18} />
                    <span className="text-sm">LinkedIn Profile</span>
                  </a>
                  <a
                    href="https://github.com/5H13LD2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors p-2 rounded-lg hover:bg-blue-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Github size={18} />
                    <span className="text-sm">GitHub Profile</span>
                  </a>
                  <a
                    href="mailto:jimenezjerico227@gmail.com"
                    className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors p-2 rounded-lg hover:bg-blue-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Mail size={18} />
                    <span className="text-sm">Email Me</span>
                  </a>
                </div>
              </div>

              {/* Resume Button - Mobile */}
              <div className="flex justify-center">
                <ResumeButton
                  onClick={openPDFModal}
                  variant="primary"
                  size="md"
                  className="w-full"
                />
              </div>

              {/* Certificates Info - Mobile */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-center">
                  Certifications
                </h2>
                <div className="text-center">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {certificates.length} Certificates
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Oracle Cloud
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      IBM Certified
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary Section - Mobile */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-center">Summary</h2>
                <p className="text-blue-100 leading-relaxed text-sm text-center">
                  Motivated Full Stack Developer with almost 1 year of
                  experience in designing, developing, and building web systems.
                  Proficient in both front and backend technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-96 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 overflow-y-auto z-40">
        <div className="space-y-8">
          {/* Greeting */}
          <div>
            <h1 className="text-5xl font-bold mb-2">Hello! 👋</h1>
            <p className="text-xl text-blue-100">
              I'm Jerico Jimenez, a Software Full Stack Engineer.
            </p>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full bg-white p-2 shadow-xl">
              <img
                src="/profile.jpg"
                alt="Jerico Jimenez"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contact</h2>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/in/jerico-jimenez-a504852a4/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
                <span>linkedin.com/in/jerico-jimenez-a504852a4</span>
              </a>
              <a
                href="https://github.com/5H13LD2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
              >
                <Github size={20} />
                <span>https://github.com/5H13LD2</span>
              </a>
              <a
                href="mailto:jimenezjerico227@gmail.com"
                className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
              >
                <Mail size={20} />
                <span>jimenezjerico227@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Resume Button - Desktop */}
          <div className="flex justify-center">
            <ResumeButton
              onClick={openPDFModal}
              variant="primary"
              size="lg"
              className="w-full"
            />
          </div>

          {/* Summary
                Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Summary</h2>
            <p className="text-blue-100 leading-relaxed">
              Motivated Full Stack Developer with almost 1 year of experience in
              designing, developing, and building web systems. Proficient in
              both front and backend technologies.
            </p>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      <PDFModal
        isOpen={isPDFModalOpen}
        onClose={closePDFModal}
        pdfUrl="/other/Jimenez Jerico - Resume.pdf"
        fileName="Jimenez_Jerico_Resume.pdf"
      />
    </>
  );
};

export default Header;
