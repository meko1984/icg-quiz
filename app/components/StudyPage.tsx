import Link from 'next/link';
import type { ReactNode } from 'react';

export default function StudyPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="app-shell study-shell">
      <article className="home-card study-card">
        <nav className="study-nav" aria-label="ページ移動">
          <Link className="back-button" href="/summary/">← 章を選ぶ</Link>
          <Link className="back-button" href="/">タイトルへ</Link>
        </nav>
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
