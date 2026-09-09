import type { Metadata } from 'next';
import StudyPage from '../../components/StudyPage';
import s from '../learning.module.css';
export const metadata: Metadata = { title: 'Miller & Jones分類 | サクッとまとめ', description: '喀痰を肉眼でM1・M2・P1・P2・P3に分ける方法、膿性部分の模式図、分類の背景とGeckler分類との違い。' };

const grades = [
  ['M1', 0, '粘液性', '膿性部分のない粘液性の痰。唾液が主体の検体が含まれることもあります。'],
  ['M2', 8, '粘液の中に、ごく少量の膿性部分', '主体は粘液です。わずかな膿性部分を認めます。M2とP1を数値だけで機械的に区別することはできません。'],
  ['P1', 28, '膿性部分が1/3以下', '膿性と判断できる部分がありますが、全体の1/3以下です。'],
  ['P2', 50, '膿性部分が1/3を超え、2/3未満', '粘液性と膿性の部分が混ざり、膿性部分が中程度を占めます。'],
  ['P3', 80, '膿性部分が2/3以上', '膿性部分が多い痰です。第2回クイズでは、一般細菌の培養に最も適した選択肢として扱います。'],
] as const;

export default function MillerJones() {
  return <StudyPage title="Miller & Jones分類"><div className={s.page}>
    <p className={s.intro}>ミラー・ジョーンズ分類は、<strong>喀痰を肉眼で見て、膿性部分がどのくらいあるか</strong>を評価する方法です。菌の種類や病気の重症度を決める分類ではありません。</p>
    <nav className={s.jump} aria-label="このページの目次"><a href="#method">分類のやり方</a><a href="#grades">M1〜P3の図</a><a href="#history">由来・歴史</a><a href="#limits">結果の読み方</a></nav>
    <section id="method" className={s.section}><h2>分類のやり方とは</h2><ol className={s.flow}>
      <li><span className={s.step}>1</span><h3>下気道からの痰を採る</h3><p>施設の手順に沿って口を水ですすぎ、深い咳で出した痰を専用容器へ直接入れます。唾液だけを出したり、ティッシュに包んだりしません。無理に咳を続けず、採れない場合は担当者に相談します。</p></li>
      <li><span className={s.step}>2</span><h3>粘液性か、膿性部分があるかを見る</h3><p>透明〜白色で粘りのある部分と、黄〜緑色などで不透明な膿性部分を区別します。色だけで決めず、性状も見ます。安全な検体取扱手順に従い、不要に容器を開けません。</p></li>
      <li><span className={s.step}>3</span><h3>膿性部分の割合を見積もる</h3><p>全体の1/3、2/3を目安にM1〜P3を記録します。これは目視による概算です。境界やM2とP1で迷う場合は、施設の判定見本・検査室の基準と照合します。</p></li>
    </ol></section>
    <section id="grades" className={s.section}><h2>M1〜P3を図で比べる</h2><p><strong>M＝mucoid（粘液性）、P＝purulent（膿性）。</strong>斜線の部分が膿性部分、白い部分が粘液性部分です。</p><div className={s.sputumRows}>{grades.map(([code, amount, title, text]) => <article className={s.sputumRow} key={code}><strong>{code}</strong><div className={s.bar} role="img" aria-label={`${code}：${title}の模式図`}><span style={{ width: `${amount}%` }} /></div><div><strong>{title}</strong><p className={s.note}>{text}</p></div></article>)}</div><p className={s.note}>比率の棒は説明用で、実際の痰の色見本や測定値ではありません。境界の「未満／以下」は資料により表記が異なります。このページは講義のP1「1/3以下」、P3「2/3以上」に合わせています。[1][2]</p></section>
    <section id="history" className={s.section}><h2>名前の由来と歴史とは</h2><div className={s.grid}>
      <article className={s.card}><span className={s.tag}>1960年代 · 喀痰の評価</span><h3>慢性気管支炎の研究が背景</h3><p>名称はD. L. MillerとRoma Jonesに由来します。慢性気管支炎などを調べる際に、喀痰の見た目や細菌学的な結果を共通の方法で評価する研究が行われました。</p><p>1963年にはMillerの「慢性気管支炎の野外調査における喀痰検査手技」の論文、1964年にはMillerとJonesの「労働者の上気道と喀痰の細菌叢」の論文が発表されています。[3][4]</p></article>
      <article className={s.card}><span className={s.tag}>現在 · 検体品質の評価</span><h3>見た目を共通の言葉にする</h3><p>「よい痰」という主観的な言い方を、M1〜P3という共通の区分で伝えられます。現在も日本の呼吸器診療・微生物検査で、肉眼的な検体評価として紹介されています。[1][2]</p><p className={s.note}>上記は確認できた関連論文の書誌です。現在の日本語表記や比率の境界すべてが、1963年の原著にそのまま記載されたと断定するものではありません。</p></article>
    </div></section>
    <section id="limits" className={s.section}><h2>結果の読み方とは</h2><div className={s.grid}><article className={s.card}><h3>Miller & Jones＝肉眼で性状</h3><p>粘液か膿性か、膿性部分の割合を見る評価です。P3でも口腔内常在菌が混ざることがあり、原因菌が必ず得られるわけではありません。</p></article><article className={s.card}><h3>Geckler＝顕微鏡で細胞</h3><p>ゲックラー分類は、扁平上皮細胞と好中球などの数から口腔由来の混入や検体の質を評価します。Miller & Jonesと併せて、別の視点から検体を確認します。[2]</p></article></div><p className={s.callout}>「P3ほど重症」「M1・M2は必ず廃棄」とは判断しません。抗酸菌など検査目的によって扱いが異なり、膿性が低い痰にも診断的価値があります。採り直しや検体の受入れは検査室と相談します。[5]</p></section>
    <section className={s.sources}><h2>出典・確認日</h2><p>2026年9月9日確認。第2回講義・クイズ156〜157問に関連します。</p><ol>
      <li><a href="https://www.jstage.jst.go.jp/article/joma/126/2/126_151/_pdf">岡山医学会雑誌126巻：喀痰検査とMiller & Jones分類</a></li><li><a href="https://www.jscm.org/journal/full/03203/032030155.pdf">日本臨床微生物学会雑誌32巻：喀痰の肉眼・顕微鏡評価</a></li><li><a href="https://pubmed.ncbi.nlm.nih.gov/14068432/">Miller DL. 1963. A study of techniques for the examination of sputum in a field survey of chronic bronchitis. 88:473–483.</a></li><li><a href="https://doi.org/10.1002/path.1700870126">Miller DL, Jones R. 1964. The bacterial flora of the upper respiratory tract and sputum of working men.</a></li><li><a href="https://www.lab.toho-u.ac.jp/med/omori/pv/respiratology/activity/2025/20250820.html">東邦大学：非結核性抗酸菌症における喀痰の品質評価（2025）</a></li>
    </ol></section>
  </div></StudyPage>;
}
