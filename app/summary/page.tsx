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
        <p className="lead">気になる章を選び、要点を確認できます。<br />まずは、この6つからお選びください。</p>
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
          <Link className="menu-link menu-drugs" href="/summary/drug-abbreviations/">
            <span className="menu-symbol" aria-hidden="true">04</span>
            <span className="menu-copy"><small>微生物・薬剤</small><strong>抗菌薬の略称と製品名</strong><small>30剤の正式名・製品・効く菌の目安を確認</small></span>
            <span className="menu-arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="menu-link menu-disinfection" href="/summary/disinfection/">
            <span className="menu-symbol" aria-hidden="true">05</span>
            <span className="menu-copy"><small>器材・薬剤</small><strong>消毒薬の水準と使い分け</strong><small>Spaulding分類と、グルタラールなどの位置づけ</small></span>
            <span className="menu-arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="menu-link menu-quiz" href="/summary/resistance/">
            <span className="menu-symbol" aria-hidden="true">06</span>
            <span className="menu-copy"><small>微生物・薬剤</small><strong>抗菌薬耐性の4つのメカニズム</strong><small>不活化・作用点の変化・修飾・濃度低下と、対策・治療</small></span>
            <span className="menu-arrow" aria-hidden="true">→</span>
          </Link>
        </nav>
      </section>
    </main>
  );
}
