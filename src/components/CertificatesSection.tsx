import React from "react";
import { ExternalLink } from "lucide-react";
import { certificates } from "../data/certificates";
import type { Certificate } from "../types/certificate";

const CertificatesSection: React.FC = () => {
  return (
    <>
      <div className="text-[11px] font-medium text-[#4d7cc7] uppercase tracking-[0.18em] mt-7 mb-3">Certifications</div>
      <h2 className="text-3xl font-semibold text-[#f0f0f0] mb-6">Certificates</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {certificates.map((cert: Certificate) => {
          const isPerm = !cert.expiryDate;
          return (
            <div key={cert.id} className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-all">
              <div className="text-[10px] text-[#4d7cc7] uppercase tracking-wider mb-2">{cert.issuer}</div>
              <div className="text-base font-medium text-[#ddd] leading-[1.45] mb-3">{cert.title}</div>
              {cert.description && <p className="text-sm text-[#777] leading-[1.65] mb-4">{cert.description}</p>}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-[#555]">{cert.issuedDate}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${isPerm ? 'bg-[#0d1828] text-[#4d7cc7] border-[#1a2a40]' : 'bg-[#0d2010] text-[#4ade80] border-[#1a3a20]'}`}>
                  {isPerm ? 'Permanent' : 'Active'}
                </span>
              </div>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-[#1a2a40] bg-[#0d1828] px-3 py-2 text-xs font-medium text-[#4d7cc7] transition-colors hover:border-[#2a4a70] hover:bg-[#1a2a40] hover:text-[#7aadff]"
              >
                View certificate
                <ExternalLink size={12} />
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CertificatesSection;
