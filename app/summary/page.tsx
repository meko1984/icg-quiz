import Link from 'next/link';
import type { Metadata } from 'next';
import { studyTopics } from '../lib/study-topics';

export const metadata: Metadata = { title: 'サクッとまとめ | 感染制御クイズ' };
const chapters = [
  { title: '第1回 · 感染対策の基本', paths: ['infection-chain', '5moments', 'cleaning', 'disinfection', 'exposure', 'hepatitis-hiv'] },
  { title: '第2回 · 微生物と抗菌薬', paths: ['gram-stain', 'bacteria-names', 'miller-jones', 'antibiotics', 'resistance', 'drug-abbreviations'] },
];

export default function Summary() {
  return <main className="app-shell"><section className="home-card chapter-card">
    <Link className="back-button" href="/">← タイトルへ</Link>
    <p className="eyebrow">QUICK STUDY</p><h1>サクッとまとめ</h1>
    <p className="lead">図で流れをつかみ、比較して整理する。<br />12のテーマからお選びください。</p>
    {chapters.map((chapter, groupIndex) => <section className="chapter-group" key={chapter.title}>
      <h2>{chapter.title}</h2><nav className="menu-list" aria-label={chapter.title}>
        {chapter.paths.map((path, i) => {
          const topic = studyTopics.find(topic => topic.href === `/summary/${path}/`)!;
          return <Link className={`menu-link ${groupIndex === 0 ? 'menu-summary' : 'menu-quiz'}`} href={topic.href} key={path}>
            <span className="menu-symbol" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className="menu-copy"><small>{topic.category}</small><strong>{topic.title}</strong><small>{topic.description}</small></span>
            <span className="menu-arrow" aria-hidden="true">→</span>
          </Link>;
        })}
      </nav>
    </section>)}
  </section></main>;
}
