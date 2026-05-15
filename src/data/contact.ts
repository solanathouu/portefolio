export type ContactType = 'email' | 'linkedin' | 'github' | 'cv';

export interface ContactLink {
  label: string;
  value: string;
  icon: string; // Icon name from react-icons
  url: string;
  type: ContactType;
  iconColor: string;
  iconBackground?: string;
  download?: boolean;
}

export const contactLinks: ContactLink[] = [
  {
    label: 'GitHub',
    value: 'solanathouu',
    icon: 'FaGithub',
    url: 'https://github.com/solanathouu',
    type: 'github',
    iconColor: '#ffffff',
  },
  {
    label: 'LinkedIn',
    value: 'nathan-skwarek',
    icon: 'FaLinkedin',
    url: 'https://www.linkedin.com/in/nathan-skwarek-8a3723252/',
    type: 'linkedin',
    iconColor: '#0A66C2',
    iconBackground: '#ffffff',
  },
  {
    label: 'Email',
    value: 'skwarek.nathan@gmail.com',
    icon: 'HiMail',
    url: 'mailto:skwarek.nathan@gmail.com',
    type: 'email',
    iconColor: '#EA4335',
    iconBackground: '#ffffff',
  },
  {
    label: 'CV',
    value: 'Télécharger le PDF',
    icon: 'HiDocumentText',
    url: '/cv-nathan-skwarek.pdf',
    type: 'cv',
    iconColor: '#ffffff',
    download: true,
  },
];
