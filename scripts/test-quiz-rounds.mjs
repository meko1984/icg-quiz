import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

// Run the actual TypeScript helpers without adding a test-runner dependency.
const asModule = (source) => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText).toString('base64')}`;
const quizUrl = asModule(await readFile(new URL('../app/lib/quiz.ts', import.meta.url), 'utf8'));
const roundsUrl = asModule((await readFile(new URL('../app/lib/quiz-rounds.ts', import.meta.url), 'utf8')).replace("'./quiz'", JSON.stringify(quizUrl)));
const { createRoundSession, getRound, readRounds } = await import(roundsUrl);
const { createSession } = await import(quizUrl);
const questions = JSON.parse(await readFile(new URL('../app/data/questions.json', import.meta.url), 'utf8'));

test('each scope visits every question once per round, including a shorter final session', () => {
  for (const scope of ['all', 1, 2]) {
    let rounds = {};
    const pool = questions.filter((q) => scope === 'all' || q.lecture === scope);
    const counts = new Map(pool.map((q) => [q.id, 0]));
    for (let round = 1; round <= 3; round++) {
      const seen = new Set();
      while (seen.size < pool.length) {
        const next = createRoundSession(questions, scope, 10, rounds);
        assert.equal(next.progress.round, round);
        assert.equal(next.questions.length, Math.min(10, pool.length - seen.size));
        rounds[scope] = { round, answeredIds: next.progress.answeredIds };
        for (const q of next.questions) {
          assert.ok(!seen.has(q.id), `repeated ${q.id} in round ${round}`);
          seen.add(q.id);
          rounds[scope].answeredIds.push(q.id);
          counts.set(q.id, counts.get(q.id) + 1);
          assert.ok(Math.max(...counts.values()) - Math.min(...counts.values()) <= 1);
          assert.deepEqual(new Set(q.choices), new Set([q.correct, ...q.distractors]));
        }
      }
      assert.equal(getRound(questions, scope, rounds).remainingIds.length, 0);
    }
  }
});

test('abandoning after two answers leaves the other eight eligible, even after reload', () => {
  const initial = createRoundSession(questions, 1, 10, {});
  const answeredIds = initial.questions.slice(0, 2).map((q) => q.id);
  const rounds = readRounds(JSON.parse(JSON.stringify({ 1: { round: 1, answeredIds } })));
  const next = createRoundSession(questions, 1, 'all', rounds);
  assert.equal(next.questions.length, 107);
  assert.ok(answeredIds.every((id) => !next.questions.some((q) => q.id === id)));
  assert.ok(initial.questions.slice(2).every((q) => next.questions.some((item) => item.id === q.id)));
});

test('scope progress is independent and review does not consume rounds', () => {
  const id = questions.find((q) => q.lecture === 1).id;
  const rounds = { 1: { round: 2, answeredIds: [id] } };
  const before = JSON.stringify(rounds);
  assert.equal(getRound(questions, 'all', rounds).answeredIds.length, 0);
  assert.equal(getRound(questions, 2, rounds).round, 1);
  assert.equal(createSession(questions, 'all', 'all', [id])[0].id, id);
  assert.equal(JSON.stringify(rounds), before);
});

test('legacy and malformed progress safely start fresh; obsolete IDs do not block a lap', () => {
  assert.deepEqual(readRounds(undefined), {});
  assert.deepEqual(readRounds({ 1: { round: -1, answeredIds: [] }, all: null }), {});
  const id = questions[0].id;
  const rounds = readRounds({ all: { round: 1, answeredIds: [id, id, 'removed-question', 123] } });
  assert.deepEqual(getRound(questions, 'all', rounds).answeredIds, [id]);
  assert.equal(getRound(questions, 'all', rounds).remainingIds.length, questions.length - 1);
});

test('empty question sets stay empty', () => {
  assert.deepEqual(createRoundSession([], 1, 10, {}).questions, []);
});
