import { createSession, type LectureFilter, type QuestionCount, type SourceQuestion } from './quiz';

export type RoundProgress = { round: number; answeredIds: string[] };
export type RoundHistory = Partial<Record<LectureFilter, RoundProgress>>;

export function getRound(source: readonly SourceQuestion[], lecture: LectureFilter, rounds: RoundHistory) {
  const ids = source.filter((q) => lecture === 'all' || q.lecture === lecture).map((q) => q.id);
  const saved = rounds[lecture];
  const answeredIds = [...new Set(saved?.answeredIds ?? [])].filter((id) => ids.includes(id));
  return { round: saved?.round ?? 1, answeredIds, remainingIds: ids.filter((id) => !answeredIds.includes(id)), total: ids.length };
}

export function createRoundSession(source: readonly SourceQuestion[], lecture: LectureFilter, count: QuestionCount, rounds: RoundHistory) {
  let progress = getRound(source, lecture, rounds);
  if (!progress.remainingIds.length && progress.total) {
    progress = getRound(source, lecture, { ...rounds, [lecture]: { round: progress.round + 1, answeredIds: [] } });
  }
  return { progress, questions: createSession(source, lecture, count, progress.remainingIds) };
}

export function readRounds(value: unknown): RoundHistory {
  const rounds: RoundHistory = {};
  if (!value || typeof value !== 'object') return rounds;
  for (const scope of ['all', 1, 2] as const) {
    const item = (value as RoundHistory)[scope];
    if (item && Number.isSafeInteger(item.round) && item.round > 0 && Array.isArray(item.answeredIds)) {
      rounds[scope] = { round: item.round, answeredIds: item.answeredIds.filter((id): id is string => typeof id === 'string') };
    }
  }
  return rounds;
}
