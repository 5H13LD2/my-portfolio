import type { Certificate, CertificateStatus } from '../types/certificate';

export const getCertificateStatus = (certificate: Certificate): CertificateStatus => {
  if (!certificate.expiryDate) return 'active';

  const expiryDate = new Date(certificate.expiryDate);
  const now = new Date();
  const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  if (expiryDate <= now) {
    return 'expired';
  } else if (expiryDate <= threeMonthsFromNow) {
    return 'expiring-soon';
  } else {
    return 'active';
  }
};

export const isExpired = (certificate: Certificate): boolean => {
  if (!certificate.expiryDate) return false;
  const expiryDate = new Date(certificate.expiryDate);
  const now = new Date();
  return expiryDate <= now;
};

export const isExpiringSoon = (certificate: Certificate): boolean => {
  if (!certificate.expiryDate) return false;
  const expiryDate = new Date(certificate.expiryDate);
  const now = new Date();
  const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  return expiryDate <= threeMonthsFromNow && expiryDate > now;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getDaysUntilExpiry = (certificate: Certificate): number | null => {
  if (!certificate.expiryDate) return null;
  const expiryDate = new Date(certificate.expiryDate);
  const now = new Date();
  const timeDiff = expiryDate.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const getActiveCertificates = (certificates: Certificate[]): Certificate[] => {
  return certificates.filter(cert => !isExpired(cert));
};

export const getExpiredCertificates = (certificates: Certificate[]): Certificate[] => {
  return certificates.filter(cert => isExpired(cert));
};

export const getCertificatesByIssuer = (certificates: Certificate[]): Record<string, Certificate[]> => {
  return certificates.reduce((acc, cert) => {
    const issuer = cert.issuer;
    if (!acc[issuer]) {
      acc[issuer] = [];
    }
    acc[issuer].push(cert);
    return acc;
  }, {} as Record<string, Certificate[]>);
};
