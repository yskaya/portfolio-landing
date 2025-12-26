'use client';

import { createContext, ReactNode, useContext } from 'react';
import introData from '../../data/intro.json';
import projectsRaw from '../../data/projects.json';
import skillsData from '../../data/skills.json';
import workData from '../../data/work.json';

export interface AboutHighlight {
  icon: string;
  title: string;
  desc: string;
}

export interface AboutContent {
  content: string;
}

export interface AboutSection {
  title: string;
  highlights: AboutHighlight[];
  content: AboutContent[];
}

export interface Education {
  degree?: string;
  university?: string;
  location?: string;
  start?: string;
  end?: string;
}

export interface CareerHighlights {
  years_experience?: string;
  countries_worked?: string;
  projects_delivered?: string;
  users_impacted?: string;
}

export interface Intro {
  name?: string;
  links: {
    linkedin?: string;
    email?: string;
    github?: string;
    website?: string;
    personal_websites?: string[];
  };
  positions?: string[];
  location?: string;
  short_description?: string;
  about?: string;
  about_section?: AboutSection;
  education?: Education;
  career_highlights?: CareerHighlights;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: Array<string | { title?: string; content: string }>;
  technologies: string[];
  github: string;
  demo: string;
  duration: string;
  team: string;
  team_size?: string | string[];
  role: string | string[];
  company?: string;
  company_size?: string;
  location?: string;
  features: string[];
  challenges: string[];
  outcomes: string[];
  achievements: string[];
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

const projects: Project[] = projectsRaw.projects.map((p: any) => {
  // Handle long_descr - can be string, array of strings, or array of objects with title/content
  let longDescription: Array<string | { title?: string; content: string }> = ['TBD'];
  if (p.long_descr) {
    if (typeof p.long_descr === 'string') {
      longDescription = [p.long_descr];
    } else if (Array.isArray(p.long_descr)) {
      longDescription = p.long_descr.map((item: any) => {
        if (typeof item === 'string') {
          return item;
        } else if (item.content) {
          return { title: item.title, content: item.content };
        }
        return item;
      });
    }
  }
  
  // Handle role and team_size as arrays or strings
  const role = Array.isArray(p.role) ? p.role : (p.role ? [p.role] : ['TBD']);
  const team_size = Array.isArray(p.team_size) ? p.team_size : (p.team_size ? [p.team_size] : undefined);
  
  return {
    id: String(p.id),
    title: p.name || 'TBD',
    description: p.short_descr || 'TBD',
    longDescription,
    technologies: p.tech_stack || [],
    github: p.links?.github || 'TBD',
    demo: p.links?.live || 'TBD',
    duration: p.date || 'TBD',
    team: Array.isArray(p.team_size) ? p.team_size.join(', ') : (p.team_size || 'TBD'),
    team_size: team_size,
    role: role,
    company: p.company || 'TBD',
    company_size: p.company_size || 'TBD',
    features: [],
    challenges: [],
    outcomes: [],
    achievements: p.achievements || [],
    image: p.image,
    category: p.location || 'TBD',
    location: p.location || 'TBD',
  };
});

const DataContext = createContext<DataContextType>({
  intro: introData as Intro,
  projects,
  skills: skillsData as SkillsData,
  work: (workData as { work: WorkItem[] }).work || [],
});

export function DataProvider({ children }: { children: ReactNode }) {
  return <DataContext.Provider value={{ intro: introData as Intro, projects, skills: skillsData as SkillsData, work: (workData as { work: WorkItem[] }).work || [] }}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);

