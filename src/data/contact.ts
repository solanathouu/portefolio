export type ContactType = 'email' | 'linkedin' | 'github' | 'twitter' | 'instagram';

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
    url: 'mailto:your.email@example.com', // PLACEHOLDER - Update with your email
    type: 'email',
  },
  {
    label: 'LinkedIn',
    icon: 'FaLinkedin',
    url: 'https://linkedin.com/in/yourprofile', // PLACEHOLDER - Update with your LinkedIn
    type: 'linkedin',
  },
  {
    label: 'GitHub',
    icon: 'FaGithub',
    url: 'https://github.com/yourusername', // PLACEHOLDER - Update with your GitHub
    type: 'github',
  },
  {
    label: 'Twitter',
    icon: 'FaTwitter',
    url: 'https://twitter.com/yourhandle', // PLACEHOLDER - Update with your Twitter
    type: 'twitter',
  },
  {
    label: 'Instagram',
    icon: 'FaInstagram',
    url: 'https://instagram.com/yourhandle', // PLACEHOLDER - Update with your Instagram
    type: 'instagram',
  },
];
