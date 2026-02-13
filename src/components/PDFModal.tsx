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
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-xl max-w-6xl max-h-[95vh] w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              Resume Preview
            </h3>
            <span className="text-sm text-gray-500 hidden sm:inline">
              {fileName}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base flex items-center gap-2"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* Open in New Tab Button */}
            <button
              onClick={handleOpenInNewTab}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm sm:text-base flex items-center gap-2"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Open</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 min-h-0 p-4 sm:p-6 bg-gray-50">
          <div className="w-full h-full bg-white rounded-lg shadow-inner overflow-hidden relative">
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 text-sm">Loading PDF...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="text-center p-6">
                  <FileText size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Unable to load PDF preview
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    The PDF couldn't be displayed in your browser.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 text-sm sm:text-base"
                    >
                      <Download size={16} />
                      Download PDF
                    </button>
                    <button
                      onClick={handleOpenInNewTab}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2 text-sm sm:text-base"
                    >
                      <ExternalLink size={16} />
                      Open in New Tab
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PDF Iframe */}
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full border-0"
              title="Resume Preview"
              style={{ minHeight: "500px" }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </div>
        </div>

        {/* Mobile Footer with Actions */}
        <div className="sm:hidden p-4 border-t border-gray-200 bg-gray-50">
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
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <ExternalLink size={18} />
              Open in Browser
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Tap and hold to save or share
          </p>
        </div>
      </div>

      {/* Background Click to Close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Close modal"
      />
    </div>
  );
};

export default PDFModal;
