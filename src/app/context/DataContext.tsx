'use client';

import { createContext, ReactNode, useContext } from 'react';
import introData from '../../data/intro.json';
import projectsRaw from '../../data/projects.json';
import skillsData from '../../data/skills.json';
import workData from '../../data/work.json';

export interface Intro {
  name?: string;
  links: {
    linkedin?: string;
    email?: string;
    github?: string;
    personal_websites?: string[];
  };
  positions?: string[];
  location?: string;
  short_description?: string;
  about?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string[];
  technologies: string[];
  github: string;
  demo: string;
  duration: string;
  team: string;
  role: string;
  features: string[];
  challenges: string[];
  outcomes: string[];
  image?: string;
  category?: string;
}

export interface SkillsData {
  skills: { category_name: string; technologies: string[] }[];
  qualification: string[];
}

export interface WorkItem {
  position: string;
  company: string;
  start: string;
  end: string;
  desc: string;
  location: string;
  team_size?: string;
  addon?: string;
  responsibilities: string[];
  achievements?: string;
  link?: string;
}

export interface DataContextType {
  intro: Intro;
  projects: Project[];
  skills: SkillsData;
  work: WorkItem[];
}

const projects: Project[] = projectsRaw.projects.map((p: any) => ({
  id: String(p.id),
  title: p.name || 'TBD',
  description: p.description || 'TBD',
  longDescription: p.details ? [p.details] : ['TBD'],
  technologies: p.tech_stack || [],
  github: p.links?.github || 'TBD',
  demo: p.links?.live || 'TBD',
  duration: p.date || 'TBD',
  team: 'TBD',
  role: p.role || 'TBD',
  features: p.achievements || [],
  challenges: [],
  outcomes: [],
  image: p.image,
  category: p.location || 'TBD',
}));

const DataContext = createContext<DataContextType>({
  intro: introData as Intro,
  projects,
  skills: skillsData as SkillsData,
  work: workData as WorkItem[],
});

export function DataProvider({ children }: { children: ReactNode }) {
  return <DataContext.Provider value={{ intro: introData as Intro, projects, skills: skillsData as SkillsData, work: workData as WorkItem[] }}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);

