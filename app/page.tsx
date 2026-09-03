import Image from 'next/image';
import Link from 'next/link';
import { version } from '../package.json';
import TitleSearch from './components/TitleSearch';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Home() {
  return (
    <main className="app-shell">
      <section className="home-card title-card">
        <header className="title-heading">
          <Image className="title-icon" src={`${basePath}/icon-192.png`} alt="" width={76} height={76} unoptimized priority />
          <p className="eyebrow">INFECTION CONTROL STUDY</p>
          <h1>感染制御クイズ</h1>
          <p className="lead">読んで理解し、解いて身につける。<br />今日の学習を、ここから始めましょう。</p>
        </header>
        <TitleSearch />
        <nav className="menu-list" aria-label="メインメニュー">
          <Link className="menu-link menu-summary" href="/summary/">
            <span className="menu-symbol" aria-hidden="true">01</span>
            <span className="menu-copy"><strong>サクッとまとめ</strong><small>章ごとに、重要なポイントを確認できます</small></span>
            <span className="menu-arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="menu-link menu-quiz" href="/quiz/">
            <span className="menu-symbol" aria-hidden="true">02</span>
            <span className="menu-copy"><strong>解いて確認</strong><small>4択クイズに挑戦し、間違えた問題を復習できます</small></span>
            <span className="menu-arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="menu-link menu-message" href="/developer/">
            <span className="menu-symbol" aria-hidden="true">03</span>
            <span className="menu-copy"><strong>開発者メッセージ</strong><small>このアプリについて・バージョン情報</small></span>
            <span className="menu-arrow" aria-hidden="true">→</span>
          </Link>
        </nav>
        <footer className="title-footer">ご自身のペースで、少しずつ進められます。<span>Version {version}</span></footer>
      </section>
    </main>
  );
}
