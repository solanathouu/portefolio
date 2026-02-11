export type ContactType = 'email' | 'linkedin' | 'github';

export interface ContactLink {
  label: string;
  icon: string; // Icon name from react-icons
  url: string;
  type: ContactType;
}

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    icon: 'HiMail',
    url: 'mailto:skwarek.nathan@gmail.com',
    type: 'email',
  },
  {
    label: 'LinkedIn',
    icon: 'FaLinkedin',
    url: 'https://www.linkedin.com/in/nathan-skwarek-8a3723252/',
    type: 'linkedin',
  },
  {
    label: 'GitHub',
    icon: 'FaGithub',
    url: 'https://github.com/solanathouu',
    type: 'github',
  },
];
