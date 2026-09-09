import type { Metadata } from 'next';
import Link from 'next/link';
import StudyPage from '../../components/StudyPage';
import styles from './resistance.module.css';

const title = '抗菌薬耐性の4つのメカニズム | サクッとまとめ';
const description = '不活化・作用点の変化・作用点の修飾・保護・菌体内濃度の低下。抗菌薬耐性の仕組み、代表菌、感染対策と治療の考え方を図で整理。';
export const metadata: Metadata = { title, description, openGraph: { title, description, images: [] }, twitter: { card: 'summary', title, description, images: [] } };

const mechanisms = [
  { id: 'destroy', number: '01', verb: '薬を壊す', name: '薬剤の不活化', explanation: '酵素で抗菌薬を分解したり、形を変えたりして働けなくします。', example: 'ESBL産生大腸菌・肺炎桿菌、カルバペネマーゼ産生菌', detail: 'βラクタマーゼはβラクタム系薬を分解する酵素。ESBLやカルバペネマーゼはその仲間です。', approach: '酵素の種類を確認 → 分解されにくい薬や、有効な酵素阻害薬との配合剤を検討。', target: 'enzyme' },
  { id: 'change', number: '02', verb: '標的を変える', name: '作用点の変化', explanation: '薬が結合する場所が変わり、薬がくっつきにくくなります。', example: 'MRSA、VRE', detail: 'MRSAはPBP2aという結合しにくいタンパク質を作ります。VREの代表的なVanA/VanB型は、細胞壁材料の末端を変えます。', approach: '変わった標的に依存しない薬を選択。菌名だけでなく、感染部位も確認。', target: 'target' },
  { id: 'protect', number: '03', verb: '標的を修飾・保護する', name: '作用点の修飾・保護', explanation: '標的をメチル化したり、保護タンパク質で守ったりして、薬の結合や作用を妨げます。', example: '一部のMRSAなど（erm遺伝子を持つ株）', detail: '修飾の例はリボソームのメチル化。ermによる耐性ではマクロライド系やクリンダマイシンなどが効きにくくなります。保護タンパク質によるキノロン系・テトラサイクリン系への耐性もこの分類です。', approach: '影響を受ける薬を確認し、感受性のある薬へ。クリンダマイシンは誘導耐性の検査（Dテスト）が必要な場合があります。', target: 'protect' },
  { id: 'concentration', number: '04', verb: '薬を入れない・外へ出す', name: '菌体内濃度の低下', explanation: '薬の侵入を減らす、または入った薬を排出して、菌体内の薬剤濃度を下げます。', example: '緑膿菌、一部のCREなど', detail: '透過性低下：ポーリン（入口）の減少・欠損。排出：多剤排出ポンプの活性化。緑膿菌のOprDやMex系が代表例で、酵素産生と重なる場合もあります。', approach: '入口の変化・排出だけで全薬剤が無効とは限りません。薬剤ごとの感受性を確認します。', target: 'concentration' },
] as const;

const ordinaryActions = {
  enzyme: 'βラクタム系薬が壊されずに細胞壁の合成酵素へ届き、壁づくりを妨げます。',
  target: '抗菌薬が対応する標的に結合し、その標的の働きを妨げます。',
  protect: '抗菌薬がリボソームなどへ結合し、タンパク質合成などを妨げます。',
  concentration: '標的に作用するために必要な量の薬が、必要な場所まで届きます。',
};

function NormalActionDiagram() {
  return <svg viewBox="0 0 340 190" className={styles.normalDiagram} role="img" aria-label="通常は抗菌薬が届き、標的に結合し、細菌の必須機能を妨げる。耐性ではこの流れの途中が妨げられる。">
    <defs><marker id="normal-action-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" fill="#1268ad" /></marker></defs>
    <rect x="116" y="22" width="214" height="115" rx="28" fill="#eff7f3" stroke="#668b80" strokeWidth="3" />
    <text x="230" y="48" textAnchor="middle" fill="#315b4e" fontSize="16">細菌の標的</text>
    <text x="42" y="48" textAnchor="middle" fill="#1268ad" fontSize="16">抗菌薬</text>
    <circle cx="42" cy="86" r="13" fill="#1268ad" /><path d="M62 86H180" stroke="#1268ad" strokeWidth="3" markerEnd="url(#normal-action-arrow)" />
    <path d="M232 65H285V110H232V100A14 14 0 0 0 232 72Z" fill="#cce5da" stroke="#477561" strokeWidth="2" /><circle cx="220" cy="86" r="13" fill="#1268ad" />
    <text x="42" y="166" textAnchor="middle" fill="#15333a" fontSize="16">① 届く</text><text x="170" y="166" textAnchor="middle" fill="#15333a" fontSize="16">② 結合する</text><text x="285" y="166" textAnchor="middle" fill="#15333a" fontSize="16">③ 妨げる</text>
  </svg>;
}

function MechanismDiagram({ kind, label }: { kind: string; label: string }) {
  return <svg viewBox="0 0 300 150" role="img" aria-label={label} className={styles.diagram}>
    <defs><marker id={`arrow-${kind}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7" fill="currentColor" /></marker></defs>
    <rect x="100" y="24" width="184" height="108" rx="28" fill="#f1f6fb" stroke="#66819b" strokeWidth="3" />
    <text x="185" y="46" textAnchor="middle" fill="#465e74">細菌</text>
    <text x="30" y="47" textAnchor="middle" fill="#465e74">薬</text>
    <circle cx="30" cy="76" r="10" fill="#1268ad" />
    {kind === 'enzyme' && <>
      <path d="M46 76 H137" stroke="#1268ad" strokeWidth="3" markerEnd={`url(#arrow-${kind})`} />
      <rect x="151" y="61" width="42" height="30" rx="8" fill="#ffecd5" stroke="#ad600c" strokeWidth="2" />
      <text x="172" y="82" textAnchor="middle" fill="#754007">酵素</text>
      <path d="M219 69 l12 -8 M227 86 l12 8" stroke="#1268ad" strokeWidth="7" strokeLinecap="round" />
      <text x="191" y="118" textAnchor="middle" fill="#754007">分解・修飾される</text>
    </>}
    {kind === 'target' && <>
      <path d="M46 76 H176" stroke="#1268ad" strokeWidth="3" markerEnd={`url(#arrow-${kind})`} />
      <path d="M220 60 H259 V94 H220 V84 L237 77 L220 70 Z" fill="#f7dfe6" stroke="#ad345a" strokeWidth="2" />
      <path d="M193 68 l15 16 M208 68 l-15 16" stroke="#ad345a" strokeWidth="3" />
      <text x="194" y="118" textAnchor="middle" fill="#8d2949">標的に合わない</text>
    </>}
    {kind === 'concentration' && <>
      <path d="M46 76 H83" stroke="#1268ad" strokeWidth="3" markerEnd={`url(#arrow-${kind})`} />
      <path d="M99 59 V94" stroke="#ae650e" strokeWidth="9" />
      <path d="M117 69 l15 15 M132 69 l-15 15" stroke="#ae650e" strokeWidth="3" />
      <text x="196" y="85" textAnchor="middle" fill="#754007">①入口が減る</text>
      <path d="M215 56 Q214 8 140 10 H75" fill="none" stroke="#137b6a" strokeWidth="3" markerEnd={`url(#arrow-${kind})`} /><circle cx="215" cy="56" r="7" fill="#1268ad" /><text x="192" y="118" textAnchor="middle" fill="#754007">②入った薬を排出</text>
    </>}
    {kind === 'protect' && <>
      <path d="M46 76 H171" stroke="#1268ad" strokeWidth="3" markerEnd={`url(#arrow-${kind})`} />
      <rect x="213" y="64" width="48" height="30" rx="9" fill="#e2ecf7" stroke="#66819b" strokeWidth="2" />
      <path d="M209 59 Q182 78 209 99" fill="none" stroke="#93580c" strokeWidth="7" /><circle cx="229" cy="59" r="6" fill="#93580c" />
      <text x="190" y="118" textAnchor="middle" fill="#754007">修飾・保護で作用を妨げる</text>
    </>}
  </svg>;
}

export default function Resistance() {
  return <StudyPage title="抗菌薬耐性の4つのメカニズム">
    <div className={styles.page}>
      <p className={styles.lead}><strong>不活化・作用点の変化・作用点の修飾・保護・濃度低下</strong>。<br />「効かない理由」から、菌・対策・治療をつなげます。</p>
      <nav className={styles.jump} aria-label="このページの目次"><a href="#action">抗菌作用とは</a><a href="#mechanisms">4つの仕組み</a><a href="#response">検出時の対策</a><a href="#treatment">菌別の治療例</a></nav>
      <section id="action" className={styles.section}>
        <h2>抗菌作用とは</h2>
        <p>抗菌薬が細菌の重要な働きを妨げ、<strong>増殖を抑えたり、菌を死滅させたりする作用</strong>です。抗菌薬ごとに狙う場所が異なります。</p>
        <NormalActionDiagram />
        <div className={styles.actionTargets}><div><b>細胞壁</b><span>壁づくりを妨げる<br />βラクタム系など</span></div><div><b>リボソーム</b><span>タンパク質づくりを妨げる<br />マクロライド系など</span></div><div><b>核酸</b><span>遺伝情報の複製などを妨げる<br />キノロン系など</span></div><div><b>細胞膜</b><span>膜の働きを乱す<br />ダプトマイシンなど</span></div></div>
        <p className={styles.note}>図は「届く・結合する・妨げる」の関係を示します。標的は細胞表層にも内部にもあり、すべての薬が細胞内へ入るわけではありません。<Link href="/summary/antibiotics/">抗菌薬の作用点の詳しい図 →</Link></p>
        <aside className={styles.takeaway}><h3>耐性は、薬が効く流れを妨げる仕組み</h3><p>薬を壊す、標的を変える、標的を守る、必要な量を届かなくする。耐性菌が抗菌作用を持つのではなく、<strong>細菌が抗菌薬の作用を受けにくくなります。</strong>次の4つの図で、通常の働きと比べます。<a href="#source-1">[1]</a></p></aside>
      </section>
      <section id="mechanisms" className={styles.section}>
        <h2>4つの耐性機序を、図でつかむ</h2>
        <p className={styles.note}>「入れない・外へ出す」は、どちらも④菌体内濃度の低下に含まれます。1つの菌が複数の仕組みを持つことがあり、同じ菌種でも菌株ごとに異なります。図は働きの模式図で、正確な構造や縮尺を示すものではありません。<a href="#source-1">[1]</a></p>
        <div className={styles.grid}>{mechanisms.map(m => <article key={m.id} className={styles.mechanism} id={m.id}>
          <header><span className={styles.number}>{m.number}</span><div><h3>{m.name}</h3><span className={styles.name}>{m.verb}</span></div></header>
          <div className={styles.usualAction}><b>薬が効く場合</b><p>{ordinaryActions[m.target]}</p></div>
          <strong className={styles.resistantCaption}>↓ この耐性機序がある場合</strong>
          <MechanismDiagram kind={m.target} label={`${m.verb}：${m.explanation}`} />
          <p>{m.explanation}</p>
          <div className={styles.example}><small>代表菌・耐性菌</small><strong>{m.example}</strong></div>
          <p className={styles.detail}>{m.detail}</p>
          <p className={styles.approach}><b>薬を選ぶ視点</b>{m.approach}</p>
        </article>)}</div>
        <p className={styles.note}>仕組みと代表例：<a href="#source-1">CDC [1]</a>、<a href="#source-2">IDSA [2]</a>、<a href="#source-3">MRSAガイドライン [3]</a>、<a href="#source-7">VREの標的変化 [7]</a>、<a href="#source-9">作用点の修飾 [9]</a>。</p>
      </section>

      <section id="response" className={styles.section}>
        <h2>耐性菌が検出されたら、2つを同時に進める</h2>
        <div className={styles.detected}>培養などで耐性菌を検出</div>
        <div className={styles.branches}>
          <article><span className={styles.pathLabel}>周囲への伝播を防ぐ</span><h3>保菌でも感染対策</h3><p>手指衛生・標準予防策を徹底。菌種・病棟・排泄物や創部の管理状況に応じ、接触予防策、個室・コホート管理を検討します。</p><p>共用器具・高頻度接触面を清掃・消毒し、検出情報を感染対策チーム（ICT）や転院先と共有します。</p></article>
          <article><span className={styles.pathLabel}>本人に治療が必要か判断</span><h3>保菌か、感染症か</h3><p><b>保菌：</b>菌はいるが感染症を起こしていない状態。原則、検出だけを理由に抗菌薬を投与しません。</p><p><b>感染症：</b>症状・感染部位・培養結果を合わせて判断し、感受性に基づく治療と感染源の除去を進めます。</p></article>
        </div>
        <p className={styles.note}>重症感染症では検査結果を待って治療を遅らせません。可能なら投与前に培養を採取し、経験的治療を開始、結果に応じて見直します。保菌への除菌や無症候性細菌尿の治療には限られた適応があり、個別に判断します。<a href="#source-2">[2]</a><a href="#source-3">[3]</a><a href="#source-4">[4]</a><a href="#source-5">[5]</a><a href="#source-8">[8]</a></p>
        <div className={styles.actions}>
          <div><b>広げない</b><span>手指衛生・接触予防策<br />器具と環境の管理</span></div>
          <div><b>選び残さない</b><span>不要な抗菌薬を避ける<br />薬の範囲・期間を見直す</span></div>
          <div><b>増加を見逃さない</b><span>ICT・検査室と連携<br />集積時は接触者等を調査</span></div>
        </div>
        <p className={styles.note}>対策は4つの機序それぞれに別の消毒を割り当てるものではありません。標準予防策を土台に、耐性菌と施設の状況に合わせて追加します。<a href="#source-4">[4]</a></p>
      </section>

      <section id="treatment" className={styles.section}>
        <h2>菌ごとに見る、治療の代表例</h2>
        <p>ここからは<strong>感染症を起こしている場合</strong>の整理です。薬剤感受性・感染部位・重症度・腎機能などで選択は変わります。</p>
        <p className={styles.note}>横にスクロールすると全列を確認できます。薬名は一般名で表記しています。</p>
        <div className={styles.tableScroll} role="region" aria-label="耐性菌と治療薬の比較表（横スクロール）" tabIndex={0}>
          <table className={styles.table}>
            <caption>代表菌 → 主な仕組み → 薬の例 → 選択時のポイント</caption>
            <thead><tr><th scope="col">菌・耐性菌</th><th scope="col">主な仕組み</th><th scope="col">治療薬の例</th><th scope="col">ここを確認</th></tr></thead>
            <tbody>
              <tr><th scope="row">ESBL産生菌<small>大腸菌・肺炎桿菌など</small></th><td><a href="#destroy">01 不活化</a></td><td>重症・尿路外感染：<b>メロペネム</b>などのカルバペネム系</td><td>膀胱炎などでは、感受性のあるST合剤などが候補。感染部位により選択が変わります。<a href="#source-2">[2]</a></td></tr>
              <tr><th scope="row">CRE / CPE<small>カルバペネム耐性／カルバペネマーゼ産生腸内細菌目細菌</small></th><td><a href="#destroy">01 不活化</a><br /><a href="#concentration">04 濃度低下</a></td><td>酵素型・感受性により<b>セフタジジム／アビバクタム</b>、<b>セフィデロコル</b>など</td><td>CREは1種類の機序ではありません。KPC・OXA-48型とIMP・NDMなどのMBL型を区別。MBL型にセフタジジム／アビバクタム単独は使えません。専門家に相談します。<a href="#source-2">[2]</a></td></tr>
              <tr><th scope="row">MRSA<small>メチシリン耐性黄色ブドウ球菌</small></th><td><a href="#change">02 作用点の変化</a><br /><small>一部の株は<br /><a href="#protect">03 修飾・保護</a>も</small></td><td>菌血症：<b>バンコマイシン（VCM）</b>、<b>ダプトマイシン（DAP）</b>など<br />肺炎：<b>VCM</b>、<b>リネゾリド（LZD）</b>など</td><td><b>DAPは肺炎に使いません。</b>VCMは血中濃度と腎機能を確認。ermによる耐性を併せ持つ株では、クリンダマイシンの誘導耐性にも注意します。<a href="#source-9">[9]</a><a href="#source-3">[3]</a></td></tr>
              <tr><th scope="row">VRE<small>バンコマイシン耐性腸球菌</small></th><td><a href="#change">02 作用点の変化</a></td><td><b>リネゾリド（LZD）</b>など</td><td>腸球菌の菌種・感受性・感染部位を確認。国内のLZDのVRE適応菌種は、感性の<i>E. faecium</i>です。<a href="#source-6">[6]</a></td></tr>
              <tr><th scope="row">耐性緑膿菌<small>複数の機序が重なりやすい</small></th><td><a href="#concentration">04 濃度低下</a><br />＋01など</td><td>感受性が残れば<b>セフェピム</b>など。難治耐性では<b>セフトロザン／タゾバクタム</b>、<b>セフィデロコル</b>など</td><td>イミペネム耐性だけで全βラクタム系が無効とは限りません。難治例は薬剤別の感受性・酵素型を確認して選択します。<a href="#source-2">[2]</a></td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.note}>ST合剤＝スルファメトキサゾール／トリメトプリム。MBL＝メタロβラクタマーゼ。薬剤の候補は網羅的な推奨順位ではありません。IDSAは米国の指針であり、国内の承認適応・最新の添付文書・施設の採用薬を別途確認します。</p>
        <aside className={styles.takeaway}><h3>「耐性の名前」だけで薬を決めない</h3><p><b>感染部位 × 感受性 × 患者の状態</b>で選びます。膿瘍のドレナージや感染したカテーテルの抜去など、感染源への対応も治療の一部です。</p></aside>
      </section>
      <nav className={styles.related} aria-label="関連するまとめ"><Link href="/summary/antibiotics/">抗菌薬の作用点を確認 →</Link><Link href="/summary/drug-abbreviations/">薬の略称・製品名を見る →</Link><Link href="/summary/5moments/">手指衛生のタイミング →</Link></nav>
      <section className={styles.sources} aria-label="出典">
        <h2>出典・確認日</h2>
        <p>学習用の代表例です。個々の患者への処方や感染対策の指示を代替するものではありません。抗菌作用は2026年9月9日、治療情報は2026年9月7日に確認しています。</p>
        <p>耐性機序の分類・用語、菌の例、治療の考え方は、以下の出典で確認しています。</p><ol>
          <li id="source-1"><a href="https://www.cdc.gov/antimicrobial-resistance/about/index.html">CDC：About Antimicrobial Resistance</a> — 耐性の仕組み</li>
          <li id="source-2"><a href="https://www.idsociety.org/practice-guideline/amr-guidance/">IDSA：2026 AMR Guidance</a> — ESBL・CRE・耐性緑膿菌の機序と治療</li>
          <li id="source-3"><a href="https://www.chemotherapy.or.jp/uploads/files/guideline/mrsa_guideline_2024.pdf">日本化学療法学会・日本感染症学会：MRSA感染症の診療ガイドライン2024</a></li>
          <li id="source-4"><a href="https://www.cdc.gov/infection-control/hcp/mdro-management/summary-recommendations.html">CDC：MDRO Management — Summary of Recommendations</a> — 感染対策・適正使用</li>
          <li id="source-5"><a href="https://www.cdc.gov/vre/about/index.html">CDC：VRE Basics</a> — 保菌と感染症</li>
          <li id="source-6"><a href="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6249002F1024_5?user=1">PMDA：ザイボックス錠600mg</a> — リネゾリドの国内適応</li>
          <li id="source-7"><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2897282/">Specificity of Induction of the vanA and vanB Operons（2010）</a> — Van型の標的変化</li>
          <li id="source-8"><a href="https://www.cdc.gov/uti/hcp/clinical-guidance/index.html">CDC：Indwelling Urinary Catheter Culture Stewardship</a> — 無症候性細菌尿の治療例外</li>
          <li id="source-9"><a href="https://journals.asm.org/doi/10.1128/jcm.43.4.1716-1721.2005">Testing for Induction of Clindamycin Resistance in Erythromycin-Resistant Isolates of Staphylococcus aureus（2005）</a> — erm・リボソームのメチル化・Dテスト</li>
        </ol>
      </section>
    </div>
  </StudyPage>;
}
