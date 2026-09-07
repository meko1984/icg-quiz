import Link from 'next/link';
import { Suspense, type ReactNode } from 'react';
import ReturnToQuizNotice from './ReturnToQuizNotice';

export default function StudyPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="app-shell study-shell">
      <article className="home-card study-card">
        <nav className="study-nav" aria-label="ページ移動">
          <Link className="back-button" href="/summary/">← 章を選ぶ</Link>
          <Link className="back-button" href="/">タイトルへ</Link>
        </nav>
        <Suspense fallback={null}><ReturnToQuizNotice /></Suspense>
        <h1>{title}</h1>
        {children}
        <nav className="study-actions" aria-label="学習を続ける">
          <Link className="primary-button action-link" href="/quiz/">クイズで確認する →</Link>
          <Link className="back-button" href="/summary/">← ほかの章を読む</Link>
        </nav>
      </article>
    </main>
  );
}
