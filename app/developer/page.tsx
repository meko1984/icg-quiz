import Link from 'next/link';
import type { Metadata } from 'next';
import { version } from '../../package.json';
import questions from '../data/questions.json';

export const metadata: Metadata = { title: '開発者メッセージ | 感染制御クイズ' };

export default function Developer() {
  return (
    <main className="app-shell">
      <article className="home-card chapter-card developer-card">
        <Link className="back-button" href="/">← タイトルへ</Link>
        <p className="eyebrow">FROM THE DEVELOPER</p>
        <h1>開発者メッセージ</h1>
        <p className="version-badge">Version {version}</p>
        <section className="developer-message"><h2>学びを、少しずつ。<small>メッセージ案</small></h2><p>短い時間でも、感染制御の学習を続けやすくすることを目指しています。</p><p>「サクッとまとめ」で要点をつかみ、「解いて確認」で理解を確かめられます。間違えたところは何度でも復習しながら、ご自身のペースでご活用ください。</p></section>
        <section className="study-section"><h2>このバージョンでできること</h2><ul className="feature-list"><li>3つのテーマから選べる「サクッとまとめ」</li><li>第1回・第2回の4択クイズ、全{questions.length}問</li><li>間違えた問題の復習と成績履歴</li></ul></section>
        <section className="study-section"><h2>学習記録について</h2><p>クイズの成績と復習リストは、ご利用中のブラウザ内に保存されます。別の端末やブラウザには自動で引き継がれません。ブラウザのデータを消去すると記録も消えるため、ご注意ください。</p></section>
        <p className="study-disclaimer">このアプリは学習用です。実際の医療判断や施設の手順を代替するものではありません。</p>
      </article>
    </main>
  );
}
