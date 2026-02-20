'use client';

import { IconType } from 'react-icons';
import {
  SiPython,
  SiJavascript,
  SiGit,
  SiGithub,
  SiDataiku,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaDatabase, FaSpider, FaFileExcel, FaGlobe } from 'react-icons/fa';

const iconMap: Record<string, IconType> = {
  SiPython,
  SiJavascript,
  SiGit,
  SiGithub,
  SiDataiku,
  VscVscode,
  FaDatabase,
  FaSpider,
  FaFileExcel,
  FaGlobe,
};

export function getSkillIcon(name: string): IconType | undefined {
  return iconMap[name];
}
