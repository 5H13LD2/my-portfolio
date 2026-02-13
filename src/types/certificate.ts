export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  credentialUrl: string;
  description?: string;
  isActive: boolean;
}

export type CertificateStatus = 'active' | 'expired' | 'expiring-soon';
