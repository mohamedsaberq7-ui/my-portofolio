export interface NavItemProps {
  name: string;
  href: string;
}

export interface HeroData {
  _id?: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  bio: string;
  cvUrl: string;
  linkedinUrl: string;
  profileImage: string;
}

export interface AboutData {
  _id?: string;
  paragraphs: string[];
}

export interface ExperienceItem {
  jobTitle: string;
  company: string;
  period: string;
  description: string;
}

export interface ExperienceData {
  _id?: string;
  items: ExperienceItem[];
}

export interface CertificateItem {
  title: string;
  org: string;
  year: string;
}

export interface CertificateData {
  _id?: string;
  items: CertificateItem[];
}

