'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import questionData from '../data/questions.json';
import type { SourceQuestion } from '../lib/quiz';

const summaries = [
  {
    href: '/summary/5moments/',
    category: '手指衛生',
    title: '5moments',
    description: '「前」と「後」でつかむ、5つのタイミング',
    keywords: '手指衛生 5 moments 5moments ファイブモーメンツ 手洗い 患者に触れる前 無菌操作 体液暴露 患者に触れた後 患者周辺環境',
  },
  {
    href: '/summary/antibiotics/',
    category: '微生物・薬剤',
    title: '抗菌薬の違い',
    description: '作用する場所と、効く菌の範囲を整理',
    keywords: '抗菌薬 抗生物質 抗菌スペクトル 広域 狭域 作用機序 細胞壁 リボソーム 核酸 βラクタム マクロライド キノロン 薬剤感受性 薬剤耐性',
  },
  {
    href: '/summary/gram-stain/',
    category: '微生物・形態',
    title: 'グラム染色 × 菌の形',
    description: '紫／ピンクと、球菌／桿菌から代表菌を見る',
    keywords: 'グラム染色 グラム陽性 グラム陰性 球菌 桿菌 GPC GNC GPR GNR 黄色ブドウ球菌 肺炎球菌 腸球菌 モラクセラ C difficile 大腸菌 肺炎桿菌 インフルエンザ菌 緑膿菌 カンピロバクター',
  },
] as const;

const allQuestions = questionData as SourceQuestion[];

function normalize(value: string) {
  return value.normalize('NFKC').toLocaleLowerCase('ja-JP').replace(/[\s　・・ー_/\-()（）[]【】「」『』、。,.!?！？:：]/g, '');
}

function questionText(question: SourceQuestion) {
  return [question.category, question.question, question.correct, question.explanation].join(' ');
}

export default function TitleSearch() {
  const [query, setQuery] = useState('');
  const normalizedQuery = normalize(query);

  const matchingSummaries = useMemo(() => {
    if (!normalizedQuery) return [];
    return summaries.filter((summary) => normalize([
      summary.category,
      summary.title,
      summary.description,
      summary.keywords,
    ].join(' ')).includes(normalizedQuery));
  }, [normalizedQuery]);

  const matchingQuestions = useMemo(() => {
    if (!normalizedQuery) return [];
    return allQuestions.filter((question) => normalize(questionText(question)).includes(normalizedQuery));
  }, [normalizedQuery]);

  const quizHref = matchingQuestions.length
    ? `/quiz/?ids=${encodeURIComponent(matchingQuestions.map((question) => question.id).join(','))}`
    : '/quiz/';
  const hasResults = matchingSummaries.length > 0 || matchingQuestions.length > 0;

  return (
    <section className="title-search" aria-label="学習内容を検索">
      <label htmlFor="title-search-input">知りたいことを検索</label>
      <div className="search-field">
        <span aria-hidden="true">⌕</span>
        <input
          id="title-search-input"
          type="search"
          value={query}
          placeholder="例：抗菌薬、手指衛生"
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {normalizedQuery && (
        <div className="search-results" aria-live="polite">
          <div className="search-result-heading">
            <strong>「{query.trim()}」の検索結果</strong>
            <span>{matchingSummaries.length + matchingQuestions.length}件</span>
          </div>

          {hasResults ? (
            <>
              {matchingSummaries.length > 0 && (
                <section className="search-result-group">
                  <h2>サクッとまとめ</h2>
                  {matchingSummaries.map((summary) => (
                    <Link className="search-summary-result" href={summary.href} key={summary.href}>
                      <span><small>{summary.category}</small><strong>{summary.title}</strong><small>{summary.description}</small></span>
                      <b aria-hidden="true">→</b>
                    </Link>
                  ))}
                </section>
              )}

              {matchingQuestions.length > 0 && (
                <section className="search-result-group">
                  <div className="search-group-heading">
                    <h2>関連するクイズ</h2>
                    <span>{matchingQuestions.length}問</span>
                  </div>
                  <div className="search-question-list">
                    {matchingQuestions.slice(0, 3).map((question) => (
                      <article key={question.id}>
                        <small>第{question.lecture}回 · {question.category.replace('（講義資料外・出題指定）', '')}</small>
                        <p>{question.question}</p>
                      </article>
                    ))}
                  </div>
                  {matchingQuestions.length > 3 && <p className="search-more">ほか {matchingQuestions.length - 3}問もクイズで出題されます。</p>}
                  <Link className="primary-button action-link search-quiz-link" href={quizHref}>関連する{matchingQuestions.length}問に挑戦 →</Link>
                </section>
              )}
            </>
          ) : (
            <div className="search-empty">
              <strong>見つかりませんでした</strong>
              <p>短い言葉にするか、「手指衛生」「抗菌薬」などでお試しください。</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
