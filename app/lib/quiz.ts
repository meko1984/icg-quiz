export type SourceQuestion = {
  id: string;
  number: number;
  lecture: number;
  category: string;
  question: string;
  correct: string;
  distractors: string[];
  explanation: string;
  sourceType: 'lecture' | 'exam-extra';
};

export type SessionQuestion = SourceQuestion & { choices: string[] };
export type LectureFilter = 'all' | 1 | 2;
export type QuestionCount = 10 | 20 | 30 | 'all';

export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

export function createSession(
  source: readonly SourceQuestion[],
  lecture: LectureFilter,
  count: QuestionCount,
  onlyIds?: readonly string[],
): SessionQuestion[] {
  const idSet = onlyIds ? new Set(onlyIds) : null;
  const pool = source.filter((question) => {
    const lectureMatches = lecture === 'all' || question.lecture === lecture;
    const idMatches = !idSet || idSet.has(question.id);
    return lectureMatches && idMatches;
  });
  const limit = count === 'all' ? pool.length : Math.min(count, pool.length);
  return shuffle(pool).slice(0, limit).map((question) => ({
    ...question,
    choices: shuffle([question.correct, ...question.distractors]),
  }));
}
