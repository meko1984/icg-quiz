import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'サクッとまとめ | 感染制御クイズ' };

export default function Summary() {
  return (
    <main className="app-shell">
      <section className="home-card chapter-card">
        <Link className="back-button" href="/">← タイトルへ</Link>
        <p className="eyebrow">QUICK STUDY</p>
        <h1>サクッとまとめ</h1>
        <p className="lead">気になる章を選び、要点を確認できます。<br />まずは、この3つからお選びください。</p>
        <nav className="menu-list" aria-label="まとめの章一覧">
          <Link className="menu-link menu-summary" href="/summary/5moments/">
            <span className="menu-symbol" aria-hidden="true">01</span>
            <span className="menu-copy"><small>手指衛生</small><strong>5moments</strong><small>「前」と「後」でつかむ、5つのタイミング</small></span>
            <span className="menu-arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="menu-link menu-quiz" href="/summary/antibiotics/">
            <span className="menu-symbol" aria-hidden="true">02</span>
            <span className="menu-copy"><small>微生物・薬剤</small><strong>抗菌薬の違い</strong><small>作用する場所と、効く菌の範囲を整理</small></span>
            <span className="menu-arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="menu-link menu-gram" href="/summary/gram-stain/">
            <span className="menu-symbol" aria-hidden="true">03</span>
            <span className="menu-copy"><small>微生物・形態</small><strong>グラム染色 × 菌の形</strong><small>紫／ピンクと、球菌／桿菌から代表菌を見る</small></span>
            <span className="menu-arrow" aria-hidden="true">→</span>
          </Link>
        </nav>
      </section>
    </main>
  );
}
