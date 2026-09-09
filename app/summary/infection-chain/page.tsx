import type { Metadata } from 'next';
import StudyPage from '../../components/StudyPage';
import s from '../learning.module.css';

export const metadata: Metadata = { title: '感染成立の6要素 | サクッとまとめ', description: '病原体・病原性・病原体の量・伝播経路・侵入門戸・感受性のある宿主を、感染対策とつなげる図解。' };

const elements = [
  ['agent', '病原体', '何が感染を起こすか', '細菌、ウイルス、真菌など、感染を起こす微生物です。', '例：インフルエンザ菌、B型肝炎ウイルス。', '想定する病原体を知り、その性質に合う洗浄・消毒・滅菌を選びます。'],
  ['virulence', '病原性', 'どのような力を持つか', '宿主に侵入したり、組織を傷つけたりする性質です。毒素や、免疫から逃れる性質などが関係します。', '例：C. difficile（Clostridioides difficile）の毒素。', '菌がいるだけで発症するとは限りません。病原体の性質と宿主の状態を合わせて考えます。'],
  ['dose', '病原体の量', 'どれだけ入るか', '体へ届く病原体の量です。感染に必要な量は、病原体や侵入経路、宿主によって異なります。', '例：血液が付いた針でも、深さや付着した血液量で曝露条件が変わります。', '洗浄や清掃で汚れと微生物を減らします。「少量だから安全」とは判断しません。'],
  ['route', '伝播経路', 'どうやって届くか', '接触・飛沫・空気など、病原体が感染源から人へ届く道筋です。', '例：汚染した手が次の患者に触れ、微生物を運びます。', '手指衛生や器具の管理、経路に応じた予防策で伝播を断ちます。'],
  ['portal', '侵入門戸', 'どこから入るか', '病原体が体内に入る入口です。傷ついた皮膚、眼・口の粘膜、気道などがあります。', '例：針刺しで皮膚を越える／血液が眼に飛び込む。', '安全器材、眼の防護、創部の保護、無菌操作で入口を守ります。'],
  ['host', '感受性のある宿主', '感染を受けやすい人か', 'その病原体に対する免疫や防御が十分でなく、感染を受けやすい状態の人です。', '例：HBVへの免疫がない人、免疫抑制治療中の人。', '適応のあるワクチン接種、基礎疾患・栄養状態の管理などで防御を支えます。'],
] as const;

export default function InfectionChain() {
  return <StudyPage title="感染成立の6要素"><div className={s.page}>
    <p className={s.intro}>感染は、微生物がいるだけでは決まりません。<strong>病原体の性質・届く道筋・受け手の状態</strong>を組み合わせて考えます。</p>
    <section className={s.section}><h2>6要素のつながりとは</h2>
      <svg className={`${s.diagram} ${s.desktopChain}`} viewBox="0 0 660 390" role="img" aria-label="病原体、病原性、病原体の量、伝播経路、侵入門戸、感受性のある宿主の6要素が輪につながる。伝播経路を断つことが感染対策の重要な役割。">
        <path d="M330 53 L553 124 L553 278 L330 344 L107 278 L107 124 Z" fill="#edf6f2" stroke="#649f91" strokeWidth="8" strokeLinejoin="round" />
        {[[330, 54, '① 病原体'], [541, 128, '② 病原性'], [541, 277, '③ 病原体の量'], [330, 344, '④ 伝播経路'], [119, 277, '⑤ 侵入門戸'], [119, 128, '⑥ 感受性のある宿主']].map(([x, y, label]) => <g key={label}><rect x={Number(x) - 110} y={Number(y) - 25} width="220" height="50" rx="12" fill="white" stroke="#0b5967" strokeWidth="2" /><text x={x} y={Number(y) + 7} textAnchor="middle" fill="#15333a" fontSize="20" fontWeight="700">{label}</text></g>)}
        <text x="330" y="193" textAnchor="middle" fill="#0b5967" fontSize="24" fontWeight="800">つながりを断つ</text><text x="330" y="223" textAnchor="middle" fill="#526c71" fontSize="17">手指衛生・防護・清掃・免疫</text>
      </svg>
      <div className={s.mobileChain}>
        <nav className={s.chain} aria-label="輪につながる感染成立の6要素。各要素の説明へ移動">{elements.map(([id, name, question], i) => <a key={id} href={`#${id}`}><b>{i + 1}. {name}</b><span>{question}</span></a>)}</nav>
        <p className={s.chainAction}><strong>つながりを断つ</strong><br />手指衛生・防護・清掃・免疫</p>
      </div>
      <p className={s.note}>第1回講義資料4ページの6要素を再構成した模式図です。時間順のステップではなく、成立に関わる条件のつながりを表しています。</p>
    </section>
    <section className={s.section}><h2>言葉を、具体的な対策につなげる</h2><div className={s.grid}>{elements.map(([id, name, question, text, example, action], i) => <article className={s.card} id={id} key={id}><span className={s.tag}>0{i + 1} · {question}</span><h3>{name}とは</h3><p>{text}</p><p className={s.note}>{example}</p><p><strong>対策との関係：</strong>{action}</p></article>)}</div></section>
    <section className={s.section}><h2>ベッド柵から手を介して伝わる例</h2><div className={s.flowStrip}><b>菌の付いたベッド柵</b><span aria-hidden="true">→</span><b>触れた手</b><span aria-hidden="true">→</span><b>患者の創部</b></div><p><strong>伝播経路：</strong>手指衛生と環境清掃で途中を断ちます。<strong>侵入門戸：</strong>創部の保護と無菌操作で入口を守ります。複数の要素に働きかけると、防御を重ねられます。</p></section>
    <aside className={s.callout}><strong>ほかの資料の「感染の連鎖」との違い</strong><p>病原体・感染源・排出門戸・伝播経路・侵入門戸・感受性宿主という6項目で示す資料もあります。このページと第1回クイズは、講義で扱う「病原性」「病原体の量」を含む分類に合わせています。項目を混ぜて覚えないようにします。</p></aside>
    <section className={s.sources}><h2>出典・確認日</h2><p>2026年9月9日確認。第1回講義資料「感染成立に必要な6つの要素」4ページ、クイズ1〜8問。感染対策の補足：<a href="https://www.cdc.gov/infection-control/hcp/basics/standard-precautions.html">CDC：標準予防策</a>。</p></section>
  </div></StudyPage>;
}
