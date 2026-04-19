import React from "react";
import { certificates } from "../data/certificates";
import type { Certificate } from "../types/certificate";

const CertificatesSection: React.FC = () => {
  return (
    <>
      <div className="text-[11px] font-medium text-[#444] uppercase tracking-widest mt-7 mb-3">Certifications</div>
      <div className="grid grid-cols-2 gap-2.5">
        {certificates.map((cert: Certificate) => {
          const isPerm = !cert.expiryDate;
          return (
            <div key={cert.id} className="bg-[#111] border border-[#1e1e1e] rounded-[10px] p-3.5 hover:border-[#2a2a2a] transition-all">
              <div className="text-[10px] text-[#444] uppercase tracking-wider mb-1.5">{cert.issuer}</div>
              <div className="text-xs font-medium text-[#ccc] leading-[1.4] mb-2.5">{cert.title}</div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] text-[#444]">{cert.issuedDate}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${isPerm ? 'bg-[#0d1828] text-[#4d7cc7] border-[#1a2a40]' : 'bg-[#0d2010] text-[#4ade80] border-[#1a3a20]'}`}>
                  {isPerm ? 'Permanent' : 'Active'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CertificatesSection;
