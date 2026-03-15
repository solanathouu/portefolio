'use client';

import { IconType } from 'react-icons';
import {
  SiPython,
  SiJavascript,
  SiGit,
  SiGithub,
  SiDataiku,
  SiN8N,
  SiMake,
  SiTableau,
  SiNotion,
  SiClaude,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaDatabase, FaSpider, FaFileExcel, FaGlobe, FaChartBar, FaRobot } from 'react-icons/fa';

const iconMap: Record<string, IconType> = {
  SiPython,
  SiJavascript,
  SiGit,
  SiGithub,
  SiDataiku,
  SiN8N,
  SiMake,
  SiTableau,
  SiNotion,
  SiClaude,
  VscVscode,
  FaDatabase,
  FaSpider,
  FaFileExcel,
  FaGlobe,
  FaChartBar,
  FaRobot,
};

export function getSkillIcon(name: string): IconType | undefined {
  return iconMap[name];
}
