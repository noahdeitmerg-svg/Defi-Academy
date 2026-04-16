/**
 * Markdown-Parser für Lektionskörper (ohne Frontmatter): zerlegt anhand von `## Überschrift`
 * in kanonische Abschnitte. Die fünf UI-Blöcke sind:
 * Explanation, Slide Summary, Voice Narration Script, Visual Suggestions, Exercise
 * (zusätzlich: Learning Objectives, Quiz, „Practical Exercise“-Alias).
 */

export type LessonBodySections = {
  learningObjectives: string;
  explanation: string;
  slideSummary: string;
  voiceNarration: string;
  visualSuggestions: string;
  /** Inhalt aus `## Exercise` oder `## Practical Exercise` */
  practicalExercise: string;
  quiz: string;
};

/** Die fünf Abschnitte, die als UI-Blöcke gerendert werden (Markdown-Rohstrings). */
export type LessonUiBlockMarkdown = {
  explanation: string;
  slideSummary: string;
  voiceNarrationScript: string;
  visualSuggestions: string;
  exercise: string;
};

const HEADER_ALIASES: Record<string, keyof LessonBodySections> = {
  "Learning Objectives": "learningObjectives",
  Explanation: "explanation",
  "Slide Summary": "slideSummary",
  "Voice Narration Script": "voiceNarration",
  "Visual Suggestions": "visualSuggestions",
  Exercise: "practicalExercise",
  "Practical Exercise": "practicalExercise",
  Quiz: "quiz",
};

const EMPTY: LessonBodySections = {
  learningObjectives: "",
  explanation: "",
  slideSummary: "",
  voiceNarration: "",
  visualSuggestions: "",
  practicalExercise: "",
  quiz: "",
};

/**
 * Zerlegt den Markdown-Text einer Lektion (nach Entfernen des YAML-Frontmatters)
 * in alle bekannten `##`-Abschnitte.
 */
export function splitLessonBody(body: string): LessonBodySections {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const map: LessonBodySections = { ...EMPTY };
  let current: keyof LessonBodySections | null = null;
  const buf: string[] = [];

  const flush = () => {
    if (current) {
      map[current] = buf.join("\n").trim();
    }
    buf.length = 0;
  };

  for (const line of lines) {
    const m = /^##\s+(.+)$/.exec(line);
    if (m) {
      const name = m[1].trim();
      const key = HEADER_ALIASES[name];
      if (key) {
        flush();
        current = key;
        continue;
      }
    }
    if (current) buf.push(line);
  }
  flush();
  return map;
}

/**
 * Extrahiert ausschließlich die fünf für die Lektions-UI vorgesehenen Abschnitte
 * (englische Überschriften im Kurrikulum).
 */
export function extractLessonUiSections(body: string): LessonUiBlockMarkdown {
  const s = splitLessonBody(body);
  return {
    explanation: s.explanation,
    slideSummary: s.slideSummary,
    voiceNarrationScript: s.voiceNarration,
    visualSuggestions: s.visualSuggestions,
    exercise: s.practicalExercise,
  };
}
