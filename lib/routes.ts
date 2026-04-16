export function lessonHref(moduleSlug: string, lessonSlug: string) {
  return `/module/${moduleSlug}/lesson/${lessonSlug}`;
}

export function quizHref(moduleSlug: string) {
  return `/module/${moduleSlug}/quiz`;
}
