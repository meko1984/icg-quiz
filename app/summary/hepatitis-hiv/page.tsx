import type { Metadata } from 'next';
import Link from 'next/link';
import StudyPage from '../../components/StudyPage';
import s from '../learning.module.css';
export const metadata: Metadata = { title: '肝炎とHIVの比較 | サクッとまとめ', description: 'HBV・HCV・HAV・HIVの感染経路、ワクチン、予防、治療、曝露後対応、感染率と発症・慢性化の違い。' };

const viruses = [
  { code: 'HBV', name: 'B型肝炎ウイルス', full: 'Hepatitis B virus', route: '血液、性的接触、母子感染。針刺しや血液の粘膜・傷への付着が職業上の主なリスクです。', vaccine: 'あり。医療従事者は接種歴と接種後のHBs抗体を確認します。', prevention: '標準予防策、安全器材、血液飛散時の防護、ワクチン。母子感染は妊婦の検査と母児への適切な予防で減らします。', treatment: '急性肝炎は状態を評価して支持療法を行い、重症例は専門的な治療が必要です。慢性肝炎は適応に応じてエンテカビルやテノホビルなどでウイルス増殖を抑えます。治療中も肝硬変・肝がんの評価を続けます。', response: '感染源のHBs抗原、本人の接種歴・HBs抗体により、HBIG（hepatitis B immune globulin：抗HBs人免疫グロブリン）とワクチンなどを速やかに検討します。', sources: '[1][5]' },
  { code: 'HCV', name: 'C型肝炎ウイルス', full: 'Hepatitis C virus', route: '主に血液を介します。注射器の共用、針刺しなど。性的接触・母子感染もありますが、血液を介する感染より頻度は低く、条件により変わります。', vaccine: 'なし。感染が治癒しても再感染することがあります。', prevention: '標準予防策、安全器材、注射器や血液の付く物品の共用を避けることが基本です。', treatment: 'DAA（direct-acting antivirals：直接作用型抗ウイルス薬）で治療します。多くの患者でウイルス排除が可能です。肝硬変などがある場合は、治癒後も肝がんの監視が必要です。', response: '通常の予防投与は行わず、初回検査と追跡検査で早期に感染を確認し、治療につなげます。', sources: '[2][6]' },
  { code: 'HAV', name: 'A型肝炎ウイルス', full: 'Hepatitis A virus', route: '主に糞口感染。便に含まれるウイルスが手・食品・水などを介して口に入ります。便への接触を伴う性行為も感染経路です。', vaccine: 'あり。国内にも不活化ワクチンがあります。適応と接種日程を確認します。', prevention: 'トイレ後・調理前の流水と石けんによる手洗い、食品の適切な加熱、衛生的な水と排泄物管理。失禁・おむつ使用などでは標準予防策に接触予防策を追加します。', treatment: '特異的な抗ウイルス薬はなく、脱水や栄養状態を管理します。通常は慢性化しませんが、重症化・急性肝不全は起こり得ます。', response: '接触状況を評価して速やかに相談します。米CDCは曝露後2週間以内のワクチンや免疫グロブリンを対象者に応じて推奨しています。国内では製剤の適応・供給と施設手順を確認します。', sources: '[3][4][13]' },
  { code: 'HIV', name: 'ヒト免疫不全ウイルス', full: 'Human immunodeficiency virus', route: '血液、精液、腟・直腸分泌液、母乳などを介します。性的接触、注射器共用、母子感染、職業上の針刺し・粘膜曝露が問題になります。', vaccine: '承認された予防ワクチンはありません。', prevention: '標準予防策、安全器材、コンドーム、適応に応じたPrEP（pre-exposure prophylaxis：曝露前予防）など。通常の日常接触、食器の共用や空気では感染しません。', treatment: 'ART（antiretroviral therapy：抗レトロウイルス療法）で増殖を抑え、免疫機能を保ちます。感染確認後は早期に治療へつなげます。持続的にウイルス量が検出限界未満なら性的伝播は起こりませんが、この知見を針刺しの判断にそのまま当てはめません。', response: 'PEP（post-exposure prophylaxis：曝露後予防）の適応を緊急に評価します。必要なら可能な限り早く、原則72時間以内に開始し通常28日間内服。感染源がウイルス抑制中でも、職業曝露は専門医と個別に判断します。', sources: '[7][8][14][15]' },
] as const;

export default function HepatitisHiv() {
  return <StudyPage title="肝炎とHIVの比較"><div className={s.page}>
    <p className={s.intro}><strong>血液への対策が中心のHBV・HCV・HIV</strong>と、<strong>便から口への経路が中心のHAV</strong>。まず経路を分け、ワクチン・曝露後対応・治療をつなげます。</p>
    <nav className={s.jump} aria-label="このページの目次"><a href="#compare">4つを比較</a><a href="#risk">曝露後の感染率</a><a href="#illness">発症・慢性化</a><Link href="/summary/exposure/">曝露後のステップ</Link></nav>
    <div className={s.grid}><div className={s.card}><span className={s.tag}>血液・体液</span><h3>HBV ／ HCV ／ HIV</h3><div className={s.flowStrip}><b>血液など</b><span aria-hidden="true">→</span><b>針・傷・粘膜</b></div><p>針刺し予防と飛散時の防護。曝露したら直ちに洗浄・報告します。</p></div><div className={s.card}><span className={s.tag}>糞口感染</span><h3>HAV</h3><div className={s.flowStrip}><b>便</b><span aria-hidden="true">→</span><b>手・食品・水</b><span aria-hidden="true">→</span><b>口</b></div><p>手洗い・食品衛生・排泄物管理で伝播を断ちます。</p></div></div>
    <section id="compare" className={s.section}><h2>感染経路・予防・治療を比較する</h2><div className={s.grid}>{viruses.map(v => <article className={s.card} key={v.code} id={v.code.toLowerCase()}><span className={s.tag}>{v.code}</span><h3>{v.name}とは</h3><small lang="en">{v.full}</small><p><strong>主な感染経路：</strong>{v.route}</p><p><strong>ワクチン：</strong>{v.vaccine}</p><p><strong>予防・感染対策：</strong>{v.prevention}</p><p><strong>感染後の治療：</strong>{v.treatment}</p><p><strong>曝露後の対応：</strong>{v.response}</p><small>出典 {v.sources}</small></article>)}</div></section>
    <section id="risk" className={s.section}><h2>「曝露後に感染する率」とは</h2><p>以下は主に<strong>感染源となる血液への経皮曝露（針刺しなど）</strong>の報告です。感染者全体の割合や発症率ではありません。曝露量、針の深さ、感染源のウイルス量、本人の免疫、予防処置で変わります。</p>
      <div className={s.tableScroll} role="region" aria-label="感染率の比較表（横スクロール）" tabIndex={0}><table className={s.table}><caption>代表的な数値と、条件を明記した報告値</caption><thead><tr><th scope="col">ウイルス</th><th scope="col">代表値</th><th scope="col">報告値と条件</th></tr></thead><tbody>
        <tr><th scope="row">HBV</th><td>免疫がない場合<br /><b>30%以上</b></td><td>免疫のない人への、HBs抗原・HBe抗原がともに陽性の血液による針刺し：血清学的な感染 <b>37〜62%</b>、臨床的肝炎 <b>22〜31%</b>。HBe抗原陰性の感染源ではそれぞれ23〜37%、1〜6%という旧来の報告。条件で大きく異なります。[9]</td></tr>
        <tr><th scope="row">HCV</th><td><b>約1.8%</b><small>旧来の集計値</small></td><td>CDC 2020：抗HCV陽性の血液・体液への経皮曝露885件中2件、約<b>0.2%</b>。95%信頼区間0〜0.52%。感染源のRNA陽性率が不明な集団での推定で、どの針刺しにも当てはまる固定値ではありません。[2][10]</td></tr>
        <tr><th scope="row">HIV</th><td><b>約0.3%</b><small>従来の代表値</small></td><td>米国2025ガイドライン：HIV感染血液への経皮曝露は平均<b>0.23%</b>（95%信頼区間0〜0.46%）、粘膜曝露は約<b>0.09%</b>。PEP後の失敗率ではありません。[7]</td></tr>
        <tr><th scope="row">HAV</th><td>3大血液媒介病原体の表の対象外</td><td>主経路が糞口感染のため、この表では共通条件の針刺し感染率を示しません。食品・家庭内接触など、曝露条件ごとに評価します。[3]</td></tr>
      </tbody></table></div><p className={s.note}>HBsAg＝hepatitis B surface antigen（HBs抗原）。HBeAg＝hepatitis B e antigen（HBe抗原）。RNA＝ribonucleic acid（リボ核酸）。HBe抗原は増殖性を考える情報の一つですが、曝露のたびに必ず測定する検査ではありません。[9]</p>
    </section>
    <section id="illness" className={s.section}><h2>感染後の発症・慢性化とは</h2><div className={s.flowStrip}><b>曝露した人</b><span aria-hidden="true">→</span><b>感染した人</b><span aria-hidden="true">→</span><b>発症・慢性化した人</b></div><p><strong>途中で分母が変わります。</strong>感染率、症状が出る割合、慢性化する割合は同じ数値ではありません。</p>
      <div className={s.grid}>
        <article className={s.card}><span className={s.tag}>HBV</span><h3>年齢で経過が大きく変わる</h3><p>急性感染でも無症状のことがあります。5歳未満は多くが無症状です。成人で感染した場合の慢性化は5%未満とされ、乳幼児期の感染では高率になります。慢性化しても全員が肝硬変・肝がんになるわけではありません。[5][11]</p></article>
        <article className={s.card}><span className={s.tag}>HCV</span><h3>無症状でも慢性化し得る</h3><p>急性感染は症状が出ないことが多く、感染者の約30%（15〜45%）は6か月以内に自然排除し、残りの約70%（55〜85%）が慢性感染になります。慢性感染者の15〜30%が20年以内に肝硬変へ進むという推定があります。治療で経過は変わります。[6][12]</p></article>
        <article className={s.card}><span className={s.tag}>HAV</span><h3>通常は慢性化しない</h3><p>6歳未満では感染の約70%が無症状です。年長児・成人では症状が出やすく、70%超に黄疸を認めます。これは年齢別の感染者の経過で、曝露した人の70%が発症するという意味ではありません。通常は回復しますが、高齢者や慢性肝疾患がある人は重症化に注意します。[3][4]</p></article>
        <article className={s.card}><span className={s.tag}>HIV</span><h3>感染とAIDS発症を分ける</h3><p>急性期は発熱などが出る場合も、無症状の場合もあります。AIDS（acquired immunodeficiency syndrome：後天性免疫不全症候群）は、免疫機能が低下し特定の疾患を発症した段階です。発症の割合は観察期間と治療の有無に左右され、一律の「発症率」は示せません。ARTで進行を防ぎます。[8]</p></article>
      </div>
    </section>
    <p className={s.callout}>学習用の代表値と対応の整理です。実際の曝露は数値だけで自己判断せず、<Link href="/summary/exposure/">洗浄・報告・検査と予防の評価</Link>へつなげます。</p>
    <section className={s.sources}><h2>出典・確認日</h2><p>2026年9月9日確認。感染率は曝露条件や感染源の状態によって変わるため、各数値の条件を併記しています。</p><ol>
      <li><a href="https://www.cdc.gov/hepatitis-b/hcp/infection-control/index.html">CDC：HBV曝露後対応</a></li><li><a href="https://www.cdc.gov/hepatitis-c/hcp/infection-control/index.html">CDC：HCV職業曝露</a></li><li><a href="https://www.cdc.gov/hepatitis-a/hcp/clinical-overview/index.html">CDC：A型肝炎の概要・予防</a></li><li><a href="https://www.cdc.gov/hepatitis-a/hcp/clinical-signs/index.html">CDC：A型肝炎の症状</a></li><li><a href="https://www.who.int/news-room/fact-sheets/detail/hepatitis-b">WHO：B型肝炎</a></li><li><a href="https://www.who.int/news-room/fact-sheets/detail/hepatitis-c">WHO：C型肝炎</a></li><li><a href="https://stacks.cdc.gov/view/cdc/183609/cdc_183609_DS1.pdf">米国公衆衛生局2025：HIV職業曝露</a>／<a href="https://hiv-guidelines.jp/2026/part16-2.htm">国内2026ガイドライン：直後の対応</a></li><li><a href="https://www.cdc.gov/hiv/about/index.html">CDC：HIVと治療・進行</a></li><li><a href="https://www.cdc.gov/mmwr/preview/mmwrhtml/rr6210a1.htm">CDC 2013：医療従事者のHBV防御と曝露後対応</a></li><li><a href="https://www.cdc.gov/mmwr/volumes/69/rr/rr6906a1.htm">CDC 2020：HCV職業曝露の推定リスク</a></li><li><a href="https://www.cdc.gov/hepatitis-b/hcp/clinical-signs/index.html">CDC：B型肝炎の症状</a></li><li><a href="https://www.cdc.gov/hepatitis-c/hcp/clinical-signs/index.html">CDC：C型肝炎の症状</a></li>
      <li><a href="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/631340GD1030_4?user=1">PMDA：乾燥組織培養不活化A型肝炎ワクチン（エイムゲン）</a></li>
      <li><a href="https://www.cdc.gov/hiv/prevention/prep.html">CDC：HIV曝露前予防（PrEP）</a></li>
      <li><a href="https://www.cdc.gov/hivpartners/php/hiv-treatment/index.html">CDC：HIV治療と性的伝播の予防</a></li>
    </ol></section>
  </div></StudyPage>;
}
