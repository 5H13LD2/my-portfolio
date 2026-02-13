import React, { useState } from "react";
import {
  ExternalLink,
  Calendar,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { certificates } from "../data/certificates";
import type { Certificate } from "../types/certificate";

const CertificatesSection: React.FC = () => {
  const [showCertificates, setShowCertificates] = useState(false);

  const getStatusBadge = (certificate: Certificate) => {
    const isExpiringSoon = () => {
      if (!certificate.expiryDate) return false;
      const expiryDate = new Date(certificate.expiryDate);
      const now = new Date();
      const threeMonthsFromNow = new Date(
        now.getTime() + 90 * 24 * 60 * 60 * 1000,
      );
      return expiryDate <= threeMonthsFromNow && expiryDate > now;
    };

    const isExpired = () => {
      if (!certificate.expiryDate) return false;
      const expiryDate = new Date(certificate.expiryDate);
      const now = new Date();
      return expiryDate <= now;
    };

    if (isExpired()) {
      return (
        <span className="px-2 py-1 sm:px-3 sm:py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm font-medium">
          Expired
        </span>
      );
    } else if (isExpiringSoon()) {
      return (
        <span className="px-2 py-1 sm:px-3 sm:py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs sm:text-sm font-medium">
          Expiring Soon
        </span>
      );
    } else if (certificate.expiryDate) {
      return (
        <span className="px-2 py-1 sm:px-3 sm:py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
          Active
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
          Permanent
        </span>
      );
    }
  };

  const activeCertificates = certificates.filter((cert) => {
    if (!cert.expiryDate) return true;
    const expiryDate = new Date(cert.expiryDate);
    const now = new Date();
    return expiryDate > now;
  });

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="p-4 sm:p-6 space-y-4">
        {/* Section Title */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 flex-1">
            🎓 Certifications
          </h3>
          <Award size={24} className="text-blue-600 flex-shrink-0 mt-1" />
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          Professional certifications in cloud computing, data management, and
          cybersecurity from Oracle, IBM, and Cisco.
        </p>

        {/* Summary Stats */}
        <div className="space-y-2">
          <span className="text-sm font-semibold text-gray-700">Summary:</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
              {certificates.length} Total
            </span>
            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
              {activeCertificates.length} Active
            </span>
            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
              Oracle Cloud
            </span>
            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-medium">
              IBM Certified
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-2">
          <button
            onClick={() => setShowCertificates(!showCertificates)}
            className="px-4 py-2 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto flex items-center justify-center gap-2"
          >
            {showCertificates ? (
              <>
                <ChevronUp size={16} />
                Hide Certificates
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                View Certificates ({certificates.length})
              </>
            )}
          </button>
        </div>
      </div>

      {/* Certificates List */}
      {showCertificates && (
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
          <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
            Certificates ({certificates.length})
          </h4>
          <div className="space-y-4">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
              >
                <div className="space-y-3">
                  {/* Certificate Header */}
                  <div className="flex items-start justify-between gap-3">
                    <h5 className="font-bold text-gray-800 text-sm sm:text-base flex-1">
                      {certificate.title}
                    </h5>
                    {getStatusBadge(certificate)}
                  </div>

                  {/* Issuer */}
                  <p className="text-gray-600 text-sm font-medium">
                    {certificate.issuer}
                  </p>

                  {/* Description */}
                  {certificate.description && (
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {certificate.description}
                    </p>
                  )}

                  {/* Dates */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Issued: {certificate.issuedDate}</span>
                    </div>
                    {certificate.expiryDate && (
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Expires: {certificate.expiryDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-xs sm:text-sm"
                    >
                      <ExternalLink size={14} />
                      View Credential
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesSection;
