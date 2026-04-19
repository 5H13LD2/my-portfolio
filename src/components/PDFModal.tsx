import React, { useState } from "react";
import { X, Download, ExternalLink, FileText } from "lucide-react";

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  fileName: string;
}

const PDFModal: React.FC<PDFModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  fileName,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm">
      <div className="bg-[#111] rounded-xl shadow-2xl max-w-6xl max-h-[95vh] w-full flex flex-col border border-[#1e1e1e]">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium text-[#f5f5f5]">
              Resume Preview
            </h3>
            <span className="text-xs text-[#666] hidden sm:inline">
              {fileName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-[13px] flex items-center gap-1.5"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={handleOpenInNewTab}
              className="px-3 py-1.5 border border-[#2a2a2a] text-[#ccc] rounded-md hover:border-[#444] hover:text-[#e5e5e5] transition-colors font-medium text-[13px] flex items-center gap-1.5"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Open</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 ml-2 text-[#666] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] rounded-md transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 p-4 sm:p-6 bg-[#0a0a0a]">
          <div className="w-full h-full bg-[#111] rounded-lg shadow-inner overflow-hidden relative border border-[#1e1e1e]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#111] z-10">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-[#1e1e1e] border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-[#888] text-sm">Loading PDF...</p>
                </div>
              </div>
            )}

            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#111] z-10">
                <div className="text-center p-6">
                  <FileText size={48} className="text-[#444] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#f5f5f5] mb-2">
                    Unable to load PDF preview
                  </h3>
                  <p className="text-[#888] mb-4 text-sm">
                    The PDF couldn't be displayed in your browser.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 text-sm"
                    >
                      <Download size={16} />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            )}

            <iframe
              src={`${pdfUrl}#view=FitH&toolbar=0`}
              className="w-full h-full border-0"
              title="Resume Preview"
              style={{ minHeight: "75vh" }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </div>
        </div>

        <div className="sm:hidden p-4 border-t border-[#1e1e1e] bg-[#111]">
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download PDF
            </button>
            <button
              onClick={handleOpenInNewTab}
              className="flex-1 px-4 py-3 border border-[#2a2a2a] text-[#ccc] rounded-lg hover:border-[#444] transition-colors font-medium flex items-center justify-center gap-2"
            >
              <ExternalLink size={18} />
              Open in Browser
            </button>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Close modal"
      />
    </div>
  );
};

export default PDFModal;
