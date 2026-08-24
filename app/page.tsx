'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import questionData from './data/questions.json';
import { createSession, type LectureFilter, type QuestionCount, type SessionQuestion, type SourceQuestion } from './lib/quiz';

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
  wrongIds: string[];
  answered: number;
  correct: number;
  sessions: number;
  bestPercent: number;
  results: SessionResult[];
};

const HISTORY_KEY = 'icg-quiz-history-v1';
const EMPTY_HISTORY: LearningHistory = { wrongIds: [], answered: 0, correct: 0, sessions: 0, bestPercent: 0, results: [] };
const allQuestions = questionData as SourceQuestion[];

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

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHistory(readHistory());
      setHistoryReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (historyReady) localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history, historyReady]);

  const availableCount = useMemo(
    () => allQuestions.filter((question) => lecture === 'all' || question.lecture === lecture).length,
    [lecture],
  );

  const current = session[index];
  const answered = selected !== null;
  const isCorrect = answered && selected === current?.correct;
  const percent = session.length ? Math.round((score / session.length) * 100) : 0;

  function begin(ids?: string[]) {
    const nextSession = createSession(
      allQuestions,
      ids ? 'all' : lecture,
      ids ? 'all' : questionCount,
      ids,
    );
    if (!nextSession.length) return;
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
    if (correct) setScore((value) => value + 1);
    if (!correct) setWrongThisSession((ids) => [...ids, current.id]);
    setHistory((previous) => {
      const wrongIds = new Set(previous.wrongIds);
      if (correct) wrongIds.delete(current.id);
      else wrongIds.add(current.id);
      return {
        ...previous,
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
        scope: sessionScope,
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
    setScreen('home');
    setSession([]);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetHistory() {
    if (!window.confirm('学習記録と間違いリストをリセットする？')) return;
    setHistory(EMPTY_HISTORY);
  }

  if (screen === 'history') {
    const averagePercent = history.answered ? Math.round((history.correct / history.answered) * 100) : 0;
    return (
      <main className="app-shell history-view">
        <section className="history-card">
          <button className="back-button" type="button" onClick={goHome}>← 出題設定</button>
          <p className="eyebrow">SCORE HISTORY</p>
          <h1>成績履歴</h1>
          <p className="lead">この端末で解いた結果を、新しい順に50件まで保存する。</p>

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
              <strong>{history.sessions ? 'これまでの累計記録は引き継いだよ' : 'まだ成績はないよ'}</strong>
              <span>{history.sessions ? '1回ごとの詳しい成績は、次のクイズからここに残る。' : 'クイズを完了すると、ここに結果が残る。'}</span>
            </div>
          )}

          {history.answered > 0 && <button className="danger-text-button" type="button" onClick={resetHistory}>成績と復習記録をすべて消す</button>}
        </section>
      </main>
    );
  }

  if (screen === 'quiz' && current) {
    const progress = ((index + (answered ? 1 : 0)) / session.length) * 100;
    return (
      <main className="app-shell quiz-view">
        <section className="quiz-card" aria-live="polite">
          <div className="quiz-meta">
            <span>第{current.lecture}回</span>
            <span>{current.category.replace('（講義資料外・出題指定）', '')}</span>
            <span>{index + 1} / {session.length}</span>
          </div>
          <div className="progress-track" aria-label={`進捗 ${Math.round(progress)}%`}>
            <span style={{ width: `${progress}%` }} />
          </div>
          {current.sourceType === 'exam-extra' && <div className="extra-badge">講義資料外・試験範囲指定</div>}
          <p className="eyebrow">QUESTION {String(index + 1).padStart(2, '0')}</p>
          <h1 className="question-text">{current.question}</h1>

          <div className="answer-list">
            {current.choices.map((answer, answerIndex) => {
              const showCorrect = answered && answer === current.correct;
              const showWrong = answered && answer === selected && answer !== current.correct;
              const faded = answered && !showCorrect && !showWrong;
              return (
                <button
                  className={`answer-button ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''} ${faded ? 'faded' : ''}`}
                  disabled={answered}
                  key={answer}
                  type="button"
                  onClick={() => chooseAnswer(answer)}
                >
                  <span>{String.fromCharCode(65 + answerIndex)}</span>
                  <b>{answer}</b>
                </button>
              );
            })}
          </div>

          {answered && (
            <section className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
              <p className="feedback-title">{isCorrect ? '正解！' : 'もう一歩'}</p>
              {!isCorrect && <p><strong>正答：</strong>{current.correct}</p>}
              <p>{current.explanation}</p>
            </section>
          )}

          {answered ? (
            <button className="primary-button next-button" type="button" onClick={nextQuestion}>
              {index === session.length - 1 ? '結果を見る' : '次の問題へ'}
            </button>
          ) : (
            <button className="text-button" type="button" onClick={goHome}>クイズを中断する</button>
          )}
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
          <h1>おつかれさま！</h1>
          <div className="score-ring" style={{ '--score': `${percent * 3.6}deg` } as CSSProperties}>
            <div><strong>{percent}</strong><span>%</span></div>
          </div>
          <p className="result-summary"><strong>{session.length}問中 {score}問正解</strong><br />間違えた{wrongCount}問は復習リストに保存した。</p>
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
        <header className="brand-row">
          <div className="brand-mark" aria-hidden="true">Q</div>
          {history.sessions > 0 && <span className="session-pill">学習 {history.sessions}回</span>}
        </header>
        <p className="eyebrow">INFECTION CONTROL STUDY</p>
        <h1>感染制御クイズ</h1>
        <p className="lead">講義資料の重要ポイントを、4択問題で短く反復。間違えた問題は端末内に残して、あとからまとめて復習できる。</p>

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

        <button className="primary-button" type="button" onClick={() => begin()}>クイズを始める</button>

        <section className="review-panel">
          <div><span>間違い復習</span><strong>{history.wrongIds.length}問</strong></div>
          <button disabled={!history.wrongIds.length} type="button" onClick={() => begin(history.wrongIds)}>復習する</button>
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
        <p className="source-note">正答は講義資料に準拠。5 Momentsのみ試験範囲として追加。</p>
      </section>
    </main>
  );
}
