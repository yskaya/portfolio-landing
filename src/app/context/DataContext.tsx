'use client';

import { createContext, ReactNode, useContext } from 'react';
import introData from '../../data/intro.json';
import projectsRaw from '../../data/projects.json';
import skillsData from '../../data/skills.json';
import careerStoryData from '../../data/career-story.json';
import recommendationsData from '../../data/recommendations.json';

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
  open_for_relocation?: boolean;
  short_description?: string;
  about?: string;
  about_section?: AboutSection;
  qualification_section?: AboutSection;
  education?: Education;
  career_highlights?: CareerHighlights;
  contact_text?: string;
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
  work_mode?: string;
  status?: string;
  features: string[];
  challenges: string[];
  outcomes: string[];
  achievements: string[];
  responsibilities?: string[];
  work_history?: {
    position: string;
    start: string;
    end: string;
    desc: string;
    location?: string;
    team?: string;
    responsibilities?: string[];
    achievements?: string[];
  }[];
  image?: string;
  category?: string;
}

export interface SkillsData {
  collections: { 
    name: string; 
    groups: { 
      label: string; 
      technologies: string[] 
    }[] 
  }[];
  qualification: string[];
}

export interface WorkItem {
  position: string;
  company: string;
  start: string;
  end: string;
  desc: string;
  location: string;
  team?: string;
  team_size?: string;
  addon?: string;
  responsibilities: string[];
  achievements?: string | string[];
  link?: string;
}

export interface CareerStorySection {
  id: string;
  period: string;
  title: string;
  content: string;
  start_date?: string;
  end_date?: string;
}

export interface Recommendation {
  id: string;
  author: string;
  author_title: string;
  author_image?: string;
  text: string;
  linkedin_url: string;
  company?: string;
  start_date?: string;
  end_date?: string;
  post_date?: string;
}

export interface DataContextType {
  intro: Intro;
  projects: Project[];
  skills: SkillsData;
  work: WorkItem[];
  careerStory: CareerStorySection[];
  recommendations: Recommendation[];
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
  
  // Prefer explicit role, otherwise derive from work history positions
  const role = Array.isArray(p.role)
    ? p.role
    : p.role
      ? [p.role]
      : Array.isArray(p.work_history)
        ? p.work_history
            .map((item: { position?: string }) => item.position)
            .filter((position: string | undefined): position is string => Boolean(position))
        : ['TBD'];
  const team_size = Array.isArray(p.team_size) ? p.team_size : (p.team_size ? [p.team_size] : undefined);
  
  // Handle duration from start_date and end_date if available, otherwise use date field
  let duration = p.date || 'TBD';
  if (p.start_date && p.end_date) {
    duration = `${p.start_date} - ${p.end_date}`;
  }
  
  return {
    id: String(p.id),
    title: p.name || 'TBD',
    description: p.short_descr || 'TBD',
    longDescription,
    technologies: p.tech_stack || [],
    github: p.links?.github || 'TBD',
    demo: p.links?.live || 'TBD',
    duration: duration,
    team: Array.isArray(p.team) ? p.team.join(', ') : (p.team || (Array.isArray(p.team_size) ? p.team_size.join(', ') : (p.team_size || 'TBD'))),
    team_size: team_size,
    role: role.length > 0 ? role : ['TBD'],
    company: p.company || 'TBD',
    company_size: p.company_size || 'TBD',
    features: [],
    challenges: [],
    outcomes: [],
    achievements: p.achievements || [],
    responsibilities: p.responsibilities || [],
    work_history: p.work_history || [],
    image: p.image,
    category: p.location || 'TBD',
    location: p.location || 'TBD',
    work_mode: p.work_mode,
    status: p.status,
  };
});

// Transform career story data to match expected interface
const careerStory: CareerStorySection[] = ((careerStoryData as { sections: any[] }).sections || []).map((section: any) => ({
  id: section.id || '',
  period: section.start_date && section.end_date 
    ? `${section.start_date} - ${section.end_date}`
    : section.period || '',
  title: section.title || '',
  content: section.content || '',
  start_date: section.start_date,
  end_date: section.end_date,
}));

const recommendations: Recommendation[] = (recommendationsData as { recommendations: Recommendation[] }).recommendations || [];
const work: WorkItem[] = (projectsRaw as { work?: WorkItem[] }).work || [];

const DataContext = createContext<DataContextType>({
  intro: introData as Intro,
  projects,
  skills: skillsData as SkillsData,
  work,
  careerStory,
  recommendations,
});

export function DataProvider({ children }: { children: ReactNode }) {
  return <DataContext.Provider value={{ intro: introData as Intro, projects, skills: skillsData as SkillsData, work, careerStory, recommendations }}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);

