'use client';

import { IconType } from 'react-icons';
import { HiMail, HiDocumentText } from 'react-icons/hi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const iconMap: Record<string, IconType> = {
  HiMail,
  HiDocumentText,
  FaLinkedin,
  FaGithub,
};

export function getContactIcon(name: string): IconType | undefined {
  return iconMap[name];
}
