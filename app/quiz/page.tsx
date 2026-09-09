'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import questionData from '../data/questions.json';
import { createSession, type LectureFilter, type QuestionCount, type SessionQuestion, type SourceQuestion } from '../lib/quiz';
import { getRelatedStudy } from '../lib/related-study';
import { createRoundSession, getRound, readRounds, type RoundHistory } from '../lib/quiz-rounds';

type Screen = 'home' | 'quiz' | 'result' | 'history';
type SessionResult = {
  id: string;
  date: string;
  scope: string;
  total: number;
  correct: number;
  percent: number;
};
type LearningHistory = {
  rounds: RoundHistory;
  wrongIds: string[];
  answered: number;
  correct: number;
  sessions: number;
  bestPercent: number;
  results: SessionResult[];
};

const HISTORY_KEY = 'icg-quiz-history-v1';
const EMPTY_HISTORY: LearningHistory = { rounds: {}, wrongIds: [], answered: 0, correct: 0, sessions: 0, bestPercent: 0, results: [] };
const allQuestions = questionData as SourceQuestion[];

type ActiveSession = {
  session: SessionQuestion[];
  index: number;
  selected: string | null;
  score: number;
  wrongIds: string[];
  scope: string;
  lecture: LectureFilter;
  count: QuestionCount;
  roundScope: LectureFilter | null;
  round: number | null;
};

function readActive(): ActiveSession | null {
  try {
    const saved = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '{}').active as ActiveSession | undefined;
    if (!saved || !Array.isArray(saved.session) || !saved.session.length ||
      !Number.isInteger(saved.index) || saved.index < 0 || saved.index >= saved.session.length ||
      !Number.isInteger(saved.score) || saved.score < 0 || saved.score > saved.session.length ||
      !Array.isArray(saved.wrongIds) || !saved.wrongIds.every((id) => typeof id === 'string') ||
      typeof saved.scope !== 'string' || !['all', 1, 2].includes(saved.lecture) ||
      ![10, 20, 30, 'all'].includes(saved.count) ||
      ![null, 'all', 1, 2].includes(saved.roundScope) ||
      (saved.roundScope !== null && (!Number.isSafeInteger(saved.round) || Number(saved.round) < 1))) return null;
    const source = new Map(allQuestions.map((q) => [q.id, q]));
    const restored: SessionQuestion[] = [];
    for (const item of saved.session) {
      const question = source.get(item?.id);
      if (!question || !Array.isArray(item.choices) || item.choices.length !== 4 ||
        new Set(item.choices).size !== 4 || !item.choices.every((choice) => [question.correct, ...question.distractors].includes(choice))) return null;
      restored.push({ ...question, choices: item.choices });
    }
    if (new Set(restored.map((q) => q.id)).size !== restored.length ||
      (saved.selected !== null && !restored[saved.index].choices.includes(saved.selected))) return null;
    return { ...saved, session: restored };
  } catch { return null; }
}

function readHistory(): LearningHistory {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return EMPTY_HISTORY;
    const parsed = JSON.parse(stored) as Partial<LearningHistory>;
    const results = Array.isArray(parsed.results)
      ? parsed.results.filter((item): item is SessionResult => Boolean(
        item && typeof item.id === 'string' && typeof item.date === 'string' &&
        typeof item.scope === 'string' && Number.isFinite(item.total) &&
        Number.isFinite(item.correct) && Number.isFinite(item.percent),
      )).slice(0, 50)
      : [];
    return {
      rounds: readRounds(parsed.rounds),
      wrongIds: Array.isArray(parsed.wrongIds) ? parsed.wrongIds.filter((id): id is string => typeof id === 'string') : [],
      answered: Number.isFinite(parsed.answered) ? Number(parsed.answered) : 0,
      correct: Number.isFinite(parsed.correct) ? Number(parsed.correct) : 0,
      sessions: Number.isFinite(parsed.sessions) ? Number(parsed.sessions) : results.length,
      bestPercent: Number.isFinite(parsed.bestPercent) ? Number(parsed.bestPercent) : 0,
      results,
    };
  } catch {
    return EMPTY_HISTORY;
  }
}

function rankFor(percent: number) {
  if (percent >= 90) return 'S';
  if (percent >= 80) return 'A';
  if (percent >= 60) return 'B';
  if (percent >= 40) return 'C';
  return 'D';
}

function formatResultDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '日時不明';
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(date);
}

function withQuizReturn(href: string) {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) return `${href}?from=quiz`;
  return `${href.slice(0, hashIndex)}?from=quiz${href.slice(hashIndex)}`;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home');
  const [lecture, setLecture] = useState<LectureFilter>('all');
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);
  const [session, setSession] = useState<SessionQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [wrongThisSession, setWrongThisSession] = useState<string[]>([]);
  const [sessionScope, setSessionScope] = useState('第1回・第2回');
  const [history, setHistory] = useState<LearningHistory>(EMPTY_HISTORY);
  const [historyReady, setHistoryReady] = useState(false);
  const [roundScope, setRoundScope] = useState<LectureFilter | null>(null);
  const [sessionRound, setSessionRound] = useState<number | null>(null);
  const [paused, setPaused] = useState<ActiveSession | null>(null);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHistory(readHistory());
      const active = readActive();
      setPaused(active);
      if (active) {
        setLecture(active.lecture);
        setQuestionCount(active.count);
      }
      setHistoryReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!historyReady) return;
    const active: ActiveSession | null = screen === 'quiz' && session.length
      ? { session, index, selected, score, wrongIds: wrongThisSession, scope: sessionScope, lecture, count: questionCount, roundScope, round: sessionRound }
      : paused;
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify({ ...history, active }));
    } catch {
      const timer = window.setTimeout(() => setStorageError(true), 0);
      return () => window.clearTimeout(timer);
    }
  }, [history, historyReady, screen, session, index, selected, score, wrongThisSession, sessionScope, lecture, questionCount, roundScope, sessionRound, paused]);

  useEffect(() => {
    if (!historyReady) return;
    const requestedIds = new URLSearchParams(window.location.search).get('ids')?.split(',').filter(Boolean) ?? [];
    if (!requestedIds.length) return;
    const availableIds = new Set(allQuestions.map((question) => question.id));
    const validIds = requestedIds.filter((id) => availableIds.has(id));
    const nextSession = createSession(allQuestions, 'all', 'all', validIds);
    if (!nextSession.length) return;
    const timer = window.setTimeout(() => {
      setSession(nextSession);
      setIndex(0);
      setSelected(null);
      setScore(0);
      setWrongThisSession([]);
      setSessionScope(`検索結果・${nextSession.length}問`);
      setPaused(null);
      setRoundScope(null);
      setSessionRound(null);
      setScreen('quiz');
      const url = new URL(window.location.href);
      url.searchParams.delete('ids');
      window.history.replaceState(window.history.state, '', url);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [historyReady]);

  const availableCount = useMemo(
    () => allQuestions.filter((question) => lecture === 'all' || question.lecture === lecture).length,
    [lecture],
  );

  const current = session[index];
  const roundProgress = getRound(allQuestions, lecture, history.rounds);
  const activeProgress = roundScope === null ? null : getRound(allQuestions, roundScope, history.rounds);
  const answered = selected !== null;
  const isCorrect = answered && selected === current?.correct;
  const percent = session.length ? Math.round((score / session.length) * 100) : 0;

  function begin(ids?: string[]) {
    if (!historyReady) return;
    const nextRound = ids ? null : createRoundSession(allQuestions, lecture, questionCount, history.rounds);
    const nextSession = nextRound?.questions ?? createSession(allQuestions, 'all', 'all', ids);
    if (!nextSession.length) return;
    if (nextRound) {
      setHistory((previous) => ({ ...previous, rounds: { ...previous.rounds, [lecture]: { round: nextRound.progress.round, answeredIds: nextRound.progress.answeredIds } } }));
    }
    setPaused(null);
    setRoundScope(ids ? null : lecture);
    setSessionRound(nextRound?.progress.round ?? null);
    setSession(nextSession);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setWrongThisSession([]);
    setSessionScope(ids ? '間違い復習' : lecture === 'all' ? '第1回・第2回' : `第${lecture}回`);
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function chooseAnswer(answer: string) {
    if (answered || !current) return;
    const correct = answer === current.correct;
    setSelected(answer);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (correct) setScore((value) => value + 1);
    if (!correct) setWrongThisSession((ids) => [...ids, current.id]);
    setHistory((previous) => {
      const wrongIds = new Set(previous.wrongIds);
      if (correct) wrongIds.delete(current.id);
      else wrongIds.add(current.id);
      return {
        ...previous,
        rounds: roundScope === null ? previous.rounds : {
          ...previous.rounds,
          [roundScope]: {
            round: sessionRound ?? 1,
            answeredIds: [...new Set([...(previous.rounds[roundScope]?.answeredIds ?? []), current.id])],
          },
        },
        wrongIds: [...wrongIds],
        answered: previous.answered + 1,
        correct: previous.correct + (correct ? 1 : 0),
      };
    });
  }

  function finishSession() {
    const finalScore = score;
    const finalPercent = session.length ? Math.round((finalScore / session.length) * 100) : 0;
    setHistory((previous) => ({
      ...previous,
      sessions: previous.sessions + 1,
      bestPercent: Math.max(previous.bestPercent, finalPercent),
      results: [{
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        date: new Date().toISOString(),
        scope: `${sessionScope}${sessionRound ? `・${sessionRound}周目` : ''}`,
        total: session.length,
        correct: finalScore,
        percent: finalPercent,
      }, ...previous.results].slice(0, 50),
    }));
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function nextQuestion() {
    if (index >= session.length - 1) finishSession();
    else {
      setIndex((value) => value + 1);
      setSelected(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function goHome() {
    if (screen === 'quiz' && session.length) {
      setPaused({ session, index, selected, score, wrongIds: wrongThisSession, scope: sessionScope, lecture, count: questionCount, roundScope, round: sessionRound });
    }
    setScreen('home');
    setSession([]);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetHistory() {
    if (!window.confirm('学習記録・間違いリスト・周回の進捗・中断中のクイズをすべてリセットしますか？')) return;
    setHistory(EMPTY_HISTORY);
    setPaused(null);
  }

  function resume() {
    if (!paused) return;
    setSession(paused.session);
    setIndex(paused.index);
    setSelected(paused.selected);
    setScore(paused.score);
    setWrongThisSession(paused.wrongIds);
    setSessionScope(paused.scope);
    setLecture(paused.lecture);
    setQuestionCount(paused.count);
    setRoundScope(paused.roundScope);
    setSessionRound(paused.round);
    setPaused(null);
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  if (screen === 'history') {
    const averagePercent = history.answered ? Math.round((history.correct / history.answered) * 100) : 0;
    return (
      <main className="app-shell history-view">
        <section className="history-card">
          <button className="back-button" type="button" onClick={goHome}>← 出題設定</button>
          <p className="eyebrow">SCORE HISTORY</p>
          <h1>成績履歴</h1>
          <p className="lead">この端末で解いた結果を、新しい順に50件まで保存します。</p>

          <div className="history-summary" aria-label="成績のまとめ">
            <div><span>挑戦</span><strong>{history.sessions}<small>回</small></strong></div>
            <div><span>累計正答率</span><strong>{averagePercent}<small>%</small></strong></div>
            <div><span>最高</span><strong>{history.bestPercent}<small>%</small></strong></div>
          </div>

          {history.results.length ? (
            <div className="result-history-list">
              {history.results.map((result) => (
                <article className="result-history-item" key={result.id}>
                  <div className="rank-badge" aria-label={`ランク ${rankFor(result.percent)}`}>{rankFor(result.percent)}</div>
                  <div className="result-history-copy">
                    <strong>{result.scope}・{result.total}問</strong>
                    <span>{formatResultDate(result.date)}　{result.correct}/{result.total}問正解</span>
                  </div>
                  <b>{result.percent}%</b>
                </article>
              ))}
            </div>
          ) : (
            <div className="history-empty">
              <strong>{history.sessions ? 'これまでの累計記録を引き継いでいます' : '成績はまだありません'}</strong>
              <span>{history.sessions ? '1回ごとの詳しい成績は、次のクイズからここに保存されます。' : 'クイズを完了すると、ここに結果が保存されます。'}</span>
            </div>
          )}

          {(history.answered > 0 || paused) && <button className="danger-text-button" type="button" onClick={resetHistory}>成績・復習・周回記録をすべて消す</button>}
        </section>
      </main>
    );
  }

  if (screen === 'quiz' && current) {
    const progress = ((index + (answered ? 1 : 0)) / session.length) * 100;
    const relatedStudy = getRelatedStudy(current);
    const relatedStudyHref = relatedStudy ? withQuizReturn(relatedStudy.href) : null;
    return (
      <main className={`app-shell quiz-view ${answered ? 'quiz-answered' : ''}`}>
        <section className="quiz-card" aria-live="polite">
          <div className="quiz-meta">
            <span>第{current.lecture}回</span>
            <span>{index + 1} / {session.length}問</span>
          </div>
          <div className="progress-track" aria-label={`進捗 ${Math.round(progress)}%`}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <h1 className="question-text">{current.question}</h1>

          {!answered && <div className="answer-list">
            {current.choices.map((answer, answerIndex) => (
                <button
                  className="answer-button"
                  key={answer}
                  type="button"
                  onClick={() => chooseAnswer(answer)}
                >
                  <span>{String.fromCharCode(65 + answerIndex)}</span>
                  <b>{answer}</b>
                </button>
              ))}
          </div>}

          {answered && (
            <>
              <section className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`} role="status">
                <p className="feedback-title">{isCorrect ? '正解です！' : 'あと少しです'}</p>
                {!isCorrect && <p><strong>選んだ答え：</strong>{selected}</p>}
                <p><strong>正答：</strong>{current.correct}</p>
              </section>
              <div className="quiz-next-dock" aria-label="次の問題へ進む">
                <span className="dock-count">{index + 1} / {session.length}問</span>
                <button className="primary-button next-button" type="button" onClick={nextQuestion}>
                  {index === session.length - 1 ? '結果を見る' : '次の問題へ'} →
                </button>
              </div>
              <section className="quiz-explanation" aria-label="解説">
                <h2>解説</h2><p>{current.explanation}</p>
              </section>
              <details className="answer-review">
                <summary>4つの選択肢を見直す</summary>
                <ol>{current.choices.map(answer => <li key={answer}><strong>{answer === current.correct ? '○ 正答：' : answer === selected ? '× 選択：' : ''}</strong>{answer}</li>)}</ol>
              </details>
              {relatedStudy && (
                <aside className="related-study" aria-label="関連するサクッとまとめ">
                  <span>サクッと補足</span>
                  <p>{relatedStudy.note}</p>
                  <Link href={relatedStudyHref!} target="_blank" rel="noreferrer">
                    <span><small>関連ページ・別タブで開きます</small><strong>{relatedStudy.title}</strong></span>
                    <b aria-hidden="true">→</b>
                  </Link>
                </aside>
              )}
            </>
          )}

          <div className="quiz-secondary">
            <p>第{current.lecture}回 · {current.category.replace('（講義資料外・出題指定）', '')}</p>
            {activeProgress && <p className="round-status">{sessionScope}・{sessionRound}周目：{activeProgress.answeredIds.length} / {activeProgress.total}問 回答済み</p>}
            {current.sourceType === 'exam-extra' && <div className="extra-badge">講義資料外・試験範囲指定</div>}
            {storageError && <p role="alert">学習記録を保存できません。ブラウザの保存設定や空き容量を確認してください。</p>}
          </div>
          <button className="text-button" type="button" onClick={goHome}>保存して中断する</button>
        </section>
      </main>
    );
  }

  if (screen === 'result') {
    const wrongCount = session.length - score;
    return (
      <main className="app-shell">
        <section className="result-card">
          <p className="eyebrow">SESSION COMPLETE</p>
          <h1>お疲れさまでした！</h1>
          {activeProgress && <p className="round-status">{!activeProgress.remainingIds.length
            ? `${sessionScope}の${sessionRound}周目を完了しました！ 次の通常クイズから${Number(sessionRound) + 1}周目が始まります。`
            : `${sessionScope}・${sessionRound}周目の残りは${activeProgress.remainingIds.length}問です。`}</p>}
          <div className="score-ring" style={{ '--score': `${percent * 3.6}deg` } as CSSProperties}>
            <div><strong>{percent}</strong><span>%</span></div>
          </div>
          <p className="result-summary"><strong>{session.length}問中 {score}問正解</strong><br />間違えた{wrongCount}問は復習リストに保存しました。</p>
          <div className="result-grid">
            <div><span>正解</span><strong>{score}</strong></div>
            <div><span>復習へ</span><strong>{wrongCount}</strong></div>
            <div><span>ランク</span><strong>{rankFor(percent)}</strong></div>
          </div>
          {wrongThisSession.length > 0 && (
            <button className="primary-button" type="button" onClick={() => begin(wrongThisSession)}>今回の間違いを復習</button>
          )}
          <button className="secondary-button" type="button" onClick={() => begin()}>同じ設定でもう一度</button>
          <button className="secondary-button" type="button" onClick={() => setScreen('history')}>成績履歴を見る</button>
          <button className="text-button" type="button" onClick={goHome}>出題設定へ戻る</button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="home-card">
        <Link className="back-button" href="/">← タイトルへ</Link>
        <header className="brand-row">
          <div className="brand-mark" aria-hidden="true">Q</div>
          {history.sessions > 0 && <span className="session-pill">学習 {history.sessions}回</span>}
        </header>
        <p className="eyebrow">INFECTION CONTROL STUDY</p>
        <h1>解いて確認</h1>
        <p className="lead">講義資料の重要ポイントを、4択問題で短く反復できます。間違えた問題は端末内に保存され、あとからまとめて復習できます。</p>

        <div className="stats-row" aria-label="収録状況">
          <div><strong>188</strong><span>全問題</span></div>
          <div><strong>109</strong><span>第1回</span></div>
          <div><strong>79</strong><span>第2回</span></div>
        </div>

        <div className="setting-block">
          <span className="setting-label">出題範囲 <small>{availableCount}問から出題</small></span>
          <div className="segmented" role="group" aria-label="出題範囲">
            {([['all', 'すべて'], [1, '第1回'], [2, '第2回']] as const).map(([value, label]) => (
              <button className={lecture === value ? 'active' : ''} type="button" key={label} onClick={() => setLecture(value)}>{label}</button>
            ))}
          </div>
        </div>

        <div className="setting-block">
          <span className="setting-label">問題数</span>
          <div className="count-options" role="group" aria-label="問題数">
            {([[10, '10問'], [20, '20問'], [30, '30問'], ['all', '全部']] as const).map(([value, label]) => (
              <button className={questionCount === value ? 'active' : ''} type="button" key={label} onClick={() => setQuestionCount(value)}>{label}</button>
            ))}
          </div>
        </div>

        <section className="round-status" aria-label="周回の進捗">
          <strong>{lecture === 'all' ? 'すべて' : `第${lecture}回`}・{roundProgress.round}周目{roundProgress.remainingIds.length === 0 ? ' 完了' : ''}</strong>
          <p>{roundProgress.answeredIds.length} / {roundProgress.total}問 回答済み{roundProgress.remainingIds.length > 0 ? `・残り${roundProgress.remainingIds.length}問` : `・次は${roundProgress.round + 1}周目`}</p>
          <div className="progress-track"><span style={{ width: `${roundProgress.total ? roundProgress.answeredIds.length / roundProgress.total * 100 : 0}%` }} /></div>
          <small>全問に回答するまで、未回答の問題からランダムに出題します。最後は残りの問数で終了します。「すべて・第1回・第2回」の進捗は別々です。復習・検索クイズは周回に含みません。</small>
        </section>
        {paused && <section className="round-status">
          <strong>中断中：{paused.scope}{paused.round ? `・${paused.round}周目` : ''}</strong>
          <p>{paused.index + 1} / {paused.session.length}問目{paused.selected !== null ? '・解説表示中' : ''}から再開できます。</p>
          <button className="secondary-button" type="button" onClick={resume}>途中から再開する</button>
          <small>新しいクイズを始めると、中断中のクイズを置き換えます。回答済みの周回進捗は残ります。</small>
        </section>}
        {storageError && <p role="alert">学習記録を保存できません。ブラウザの保存設定や空き容量を確認してください。</p>}
        <button className="primary-button" disabled={!historyReady} type="button" onClick={() => begin()}>クイズを始める</button>

        <section className="review-panel">
          <div><span>間違い復習</span><strong>{history.wrongIds.length}問</strong></div>
          <button disabled={!historyReady || !history.wrongIds.length} type="button" onClick={() => begin(history.wrongIds)}>復習する</button>
        </section>

        <button className="history-panel" type="button" onClick={() => setScreen('history')}>
          <span><small>成績履歴</small><strong>{history.sessions ? `${history.sessions}回の記録` : 'まだ記録なし'}</strong></span>
          <b>{history.sessions ? `最高 ${history.bestPercent}%` : '見る'} →</b>
        </button>

        {history.answered > 0 && (
          <div className="history-line">
            累計 {history.answered}問・正答率 {Math.round((history.correct / history.answered) * 100)}%
          </div>
        )}
        <p className="source-note">正答は講義資料に準拠しています。5 Momentsのみ試験範囲として追加しています。</p>
      </section>
    </main>
  );
}
