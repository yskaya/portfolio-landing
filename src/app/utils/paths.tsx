export const SECTION = {
  HERO: "hero",
  ABOUT: "about",
  EXPERIENCE: "experience",
  SKILLS: "skills",
  PROJECTS: "projects",
  CONTACT: "contact",
} as const;

export type SectionId = typeof SECTION[keyof typeof SECTION];

export const NAV_ITEMS: { label: string; id: SectionId }[] = [
  { label: "About", id: SECTION.ABOUT },
  { label: "Experience", id: SECTION.EXPERIENCE },
  { label: "Skills", id: SECTION.SKILLS },
  { label: "Projects", id: SECTION.PROJECTS },
  { label: "Contact", id: SECTION.CONTACT },
];