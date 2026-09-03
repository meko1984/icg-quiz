import type { Metadata } from 'next';
import StudyPage from '../../components/StudyPage';

const title = '5moments | サクッとまとめ';
const description = '手指衛生の5つのタイミングを、前と後に分けて確認。';
export const metadata: Metadata = { title, description, openGraph: { title, description, images: [] }, twitter: { card: 'summary', title, description, images: [] } };

const moments = [
  { number: 1, title: '患者に触れる前', example: '例：脈を測るために患者に触れる前。' },
  { number: 2, title: '清潔操作・無菌操作の前', example: '例：カテーテルを挿入する前。' },
  { number: 3, title: '体液曝露リスクの後', example: '例：血液や体液に触れた可能性がある処置の後。' },
  { number: 4, title: '患者に触れた後', example: '例：患者の体位を変えた後。' },
  { number: 5, title: '患者周辺環境に触れた後', example: '例：患者には触れず、ベッド柵に触れた後。' },
];

export default function FiveMoments() {
  return (
    <StudyPage title="5moments">
      <p className="lead">手指衛生は「いつ行うか」が重要です。<br />まずは、前の2つ・後の3つに分けて覚えましょう。</p>
      <div className="moment-groups">
        <section className="moment-group before-group">
          <h2><span>前</span> 患者を守る</h2>
          {moments.slice(0, 2).map((moment) => <div className="moment-item" key={moment.number}><b>{moment.number}</b><div><h3>{moment.title}</h3><p>{moment.example}</p></div></div>)}
        </section>
        <section className="moment-group after-group">
          <h2><span>後</span> 自分と周囲を守る</h2>
          {moments.slice(2).map((moment) => <div className="moment-item" key={moment.number}><b>{moment.number}</b><div><h3>{moment.title}</h3><p>{moment.example}</p></div></div>)}
        </section>
      </div>
      <aside className="takeaway"><h2>ここを押さえましょう</h2><p>患者に直接触れていなくても、周辺環境に触れた後は手指衛生が必要です。5つは順番どおりに行う手順ではなく、それぞれ手指衛生が必要になる場面です。</p></aside>
      <details className="recall"><summary>確認してみましょう：ベッド柵だけに触れた後は？</summary><p><strong>Moment 5です。</strong>患者周辺環境に触れた後にあたります。</p></details>
    </StudyPage>
  );
}
