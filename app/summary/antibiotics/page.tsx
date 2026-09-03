import type { Metadata } from 'next';
import StudyPage from '../../components/StudyPage';

const title = '抗菌薬の違い | サクッとまとめ';
const description = '抗菌薬の作用機序と抗菌スペクトルの違いを整理する基礎のまとめ。';
export const metadata: Metadata = { title, description, openGraph: { title, description, images: [] }, twitter: { card: 'summary', title, description, images: [] } };
export default function Antibiotics() {
  return (
    <StudyPage title="抗菌薬の違い">
      <p className="lead">「どこに作用するか」と「どの菌に効くか」。<br />この2つを分けると、違いを整理しやすくなります。</p>
      <section className="study-section"><h2>① どこに作用しますか？</h2><p>作用機序とは、細菌のどの働きを妨げるかを示すものです。</p>
        <div className="mechanism-list">
          <div><span>細胞壁</span><p><strong>壁づくりを妨げる</strong><small>βラクタム系など</small></p></div>
          <div><span>リボソーム</span><p><strong>タンパク質づくりを妨げる</strong><small>マクロライド系など</small></p></div>
          <div><span>核酸</span><p><strong>DNAの複製などを妨げる</strong><small>フルオロキノロン系など</small></p></div>
        </div>
        <p className="small-note">代表的な3つを抜粋しています。ほかに細胞膜や葉酸代謝に作用する薬もあります。</p>
      </section>
      <section className="study-section"><h2>② どの菌に効きますか？</h2><p>抗菌スペクトルとは、効果が期待できる菌の範囲を示すものです。</p>
        <div className="spectrum-grid"><div><h3>狭域</h3><p>対象となる菌の範囲が<br />比較的狭い</p></div><div><h3>広域</h3><p>対象となる菌の範囲が<br />比較的広い</p></div></div>
      </section>
      <aside className="takeaway"><h2>「広い」＝「いつでも最適」ではありません</h2><p>原因菌と感受性がわかれば、必要な範囲をカバーする薬を検討します。同じ系統でも、効果が期待できる菌や体内での動きは異なります。</p></aside>
      <details className="recall"><summary>確認してみましょう：作用機序とスペクトルの違いは？</summary><p><strong>作用機序は「どのように働くか」、スペクトルは「どの菌に効くか」を示します。</strong>この2つをセットで確認しましょう。</p></details>
    </StudyPage>
  );
}
