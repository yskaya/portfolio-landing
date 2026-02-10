import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "src", "data");

const readJson = (fileName) =>
  JSON.parse(fs.readFileSync(path.join(dataDir, fileName), "utf8"));

const writeMarkdown = (fileName, content) => {
  const normalized = `${content.trim()}\n`;
  fs.writeFileSync(path.join(rootDir, fileName), normalized);
};

const normalizeParagraphs = (text) => {
  if (!text) return "";
  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const formatList = (items) =>
  items && items.length ? items.map((item) => `- ${item}`).join("\n") : "";

const formatKeyValue = (label, value) =>
  value ? `- ${label}: ${value}` : "";

const joinSections = (sections) => sections.filter(Boolean).join("\n\n");

const formatSectionList = (label, values) => {
  const content = Array.isArray(values) ? values.filter(Boolean) : [];
  return content.length ? `## ${label}\n${formatList(content)}` : "";
};

const renderOverview = () => {
  const intro = readJson("intro.json");
  const roles = Array.isArray(intro.positions) ? intro.positions : [];
  const location = intro.open_for_relocation
    ? `${intro.location} (open to relocation)`
    : intro.location;
  const links = intro.links ?? {};

  const overviewHighlights = intro.about_section?.highlights ?? [];
  const overviewNarrative = intro.about_section?.content ?? [];
  const qualifications = intro.qualification_section?.content ?? [];
  const education = intro.education ?? {};
  const careerHighlights = intro.career_highlights ?? {};

  const linksList = [
    formatKeyValue("LinkedIn", links.linkedin),
    formatKeyValue("Email", links.email),
    formatKeyValue("GitHub", links.github),
    formatKeyValue("Website", links.website),
    links.personal_websites?.length
      ? `- Personal websites: ${links.personal_websites.join(", ")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const overviewHighlightsList = overviewHighlights
    .map((item) => `- ${item.title}: ${item.desc}`)
    .join("\n");

  const overviewNarrativeText = overviewNarrative
    .map((item) => item.content)
    .filter(Boolean)
    .join("\n\n");

  const qualificationList = qualifications
    .map((item) => item.content)
    .filter(Boolean);

  const educationLines = [
    formatKeyValue("Degree", education.degree),
    formatKeyValue("University", education.university),
    formatKeyValue("Location", education.location),
    education.start_date || education.end_date
      ? `- Dates: ${education.start_date ?? ""} - ${education.end_date ?? ""}`.trim()
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const careerHighlightsList = [
    formatKeyValue("Years of experience", careerHighlights.years_experience),
    formatKeyValue("Countries worked", careerHighlights.countries_worked),
    formatKeyValue("Projects delivered", careerHighlights.projects_delivered),
    formatKeyValue("Users impacted", careerHighlights.users_impacted),
  ]
    .filter(Boolean)
    .join("\n");

  const content = joinSections([
    "# Portfolio Overview",
    ["## Name", intro.name].filter(Boolean).join("\n"),
    roles.length ? `## Roles\n${formatList(roles)}` : "",
    ["## Location", location].filter(Boolean).join("\n"),
    ["## Short Summary", intro.short_description].filter(Boolean).join("\n"),
    ["## About", intro.about].filter(Boolean).join("\n"),
    overviewHighlightsList
      ? `## Overview Highlights\n${overviewHighlightsList}`
      : "",
    overviewNarrativeText
      ? `## Overview Narrative\n${overviewNarrativeText}`
      : "",
    qualificationList.length
      ? `## Qualifications\n${formatList(qualificationList)}`
      : "",
    educationLines ? `## Education\n${educationLines}` : "",
    careerHighlightsList
      ? `## Career Highlights\n${careerHighlightsList}`
      : "",
    linksList ? `## Links\n${linksList}` : "",
    intro.contact_text
      ? `## Contact / Current Focus\n${intro.contact_text}`
      : "",
  ]);

  writeMarkdown("PORTFOLIO_EXPORT_OVERIEW.md", content);
};

const renderCareerStory = () => {
  const story = readJson("career-story.json");
  const sections = story.sections ?? [];

  const content = joinSections([
    "# Career Story",
    sections
      .map((section) => {
        const header = `## ${section.start_date}-${section.end_date}: ${section.title}`;
        const body = normalizeParagraphs(section.content);
        return joinSections([header, body]);
      })
      .join("\n\n"),
  ]);

  writeMarkdown("PORTFOLIO_EXPORT_STORY.md", content);
};

const renderProjects = () => {
  const data = readJson("projects.json");
  const projects = data.projects ?? [];
  const workHistory = data.work ?? [];

  const projectSections = projects
    .map((project) => {
      const overview = [
        formatKeyValue("Id", project.id),
        formatKeyValue("Company", project.company),
        formatKeyValue(
          "Timeline",
          [project.start_date, project.end_date].filter(Boolean).join(" - ")
        ),
        formatKeyValue(
          "Role",
          Array.isArray(project.role) ? project.role.join("; ") : project.role
        ),
        formatKeyValue("Team", project.team),
        formatKeyValue(
          "Location / Mode",
          [project.location, project.work_mode].filter(Boolean).join("; ")
        ),
        formatKeyValue("Status", project.status),
        formatKeyValue("Company Size", project.company_size),
        formatKeyValue("Project Type", project.project_type),
        formatKeyValue("Links", project.links?.live),
        project.tech_stack?.length
          ? `- Tech Stack: ${project.tech_stack.join(", ")}`
          : "",
        project.image ? `- Image: ${project.image}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const workEntries = (project.work_history ?? [])
        .map((entry) => {
          const header = `#### ${entry.position} (${entry.start} - ${entry.end})${entry.team ? `, ${entry.team}` : ""}`;
          const responsibilities = formatList(entry.responsibilities ?? []);
          const achievements = formatList(entry.achievements ?? []);

          return joinSections([
            header,
            entry.desc ?? "",
            responsibilities ? `Responsibilities:\n${responsibilities}` : "",
            achievements ? `Achievements:\n${achievements}` : "",
          ]);
        })
        .join("\n\n");

      return joinSections([
        `## ${project.name}`,
        `### Overview\n${overview}`,
        project.short_descr
          ? `### Short Description\n${project.short_descr}`
          : "",
        project.long_descr ? `### Long Description\n${project.long_descr}` : "",
        workEntries ? `### Work History\n${workEntries}` : "",
      ]);
    })
    .join("\n\n");

  const workSummarySections = workHistory
    .map((entry) => {
      const overview = [
        formatKeyValue(
          "Timeline",
          [entry.start, entry.end].filter(Boolean).join(" - ")
        ),
        formatKeyValue("Location", entry.location),
        formatKeyValue("Team", entry.team),
        entry.desc ? `- Description: ${entry.desc}` : "",
        entry.link ? `- Link: ${entry.link}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const responsibilities = formatList(entry.responsibilities ?? []);
      const achievements = formatList(entry.achievements ?? []);

      return joinSections([
        `### ${entry.position} — ${entry.company}`,
        overview,
        responsibilities ? `Responsibilities:\n${responsibilities}` : "",
        achievements ? `Achievements:\n${achievements}` : "",
      ]);
    })
    .join("\n\n");

  const content = joinSections([
    "# Projects",
    projectSections,
    workSummarySections ? `## Work History Summary\n${workSummarySections}` : "",
  ]);

  writeMarkdown("PORTFOLIO_PROJECTS.md", content);
};

const renderSkills = () => {
  const data = readJson("skills.json");
  const collections = data.collections ?? [];

  const collectionSections = collections
    .map((collection) => {
      const groups = (collection.groups ?? [])
        .map((group) => {
          const technologies = formatList(group.technologies ?? []);
          return [
            `### ${group.label}`,
            technologies,
          ]
            .filter((line) => line !== "")
            .join("\n");
        })
        .join("\n\n");

      return joinSections([`## ${collection.name}`, groups]);
    })
    .join("\n\n");

  const qualificationSection = formatSectionList(
    "Qualifications",
    data.qualification ?? []
  );

  const content = joinSections([
    "# Skills",
    collectionSections,
    qualificationSection,
  ]);

  writeMarkdown("PORTFOLIO_SKILLS.md", content);
};

const renderRecommendations = () => {
  const data = readJson("recommendations.json");
  const recommendations = data.recommendations ?? [];

  const sections = recommendations
    .map((rec) => {
      const meta = [
        formatKeyValue("Company", rec.company),
        formatKeyValue(
          "Timeline",
          [rec.start_date, rec.end_date].filter(Boolean).join(" - ")
        ),
        formatKeyValue("Posted", rec.post_date),
        formatKeyValue("LinkedIn", rec.linkedin_url),
        rec.author_image ? `- Author image: ${rec.author_image}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      return joinSections([
        `## ${rec.author} — ${rec.author_title}`,
        meta,
        `### Recommendation\n${rec.text ?? ""}`,
      ]);
    })
    .join("\n\n");

  const content = joinSections(["# Recommendations", sections]);

  writeMarkdown("PORTFOLIO_RECOMMENDATIONS.md", content);
};

const run = () => {
  renderOverview();
  renderCareerStory();
  renderProjects();
  renderSkills();
  renderRecommendations();
};

run();
