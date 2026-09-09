import type { Metadata } from 'next';
import Link from 'next/link';
import StudyPage from '../../components/StudyPage';
import s from '../learning.module.css';

export const metadata: Metadata = { title: '曝露後の対応ステップ | サクッとまとめ', description: '針刺し・切創、眼や口への血液・体液曝露。洗浄、報告、検査と予防・経過観察を図で確認。' };

export default function Exposure() {
  return <StudyPage title="曝露後の対応ステップ"><div className={s.page}>
    <p className={s.intro}>針刺し・切創、眼や口への血液・体液の飛散。<strong>まず洗浄し、すぐ報告します。</strong>検査と予防の評価は並行して進めます。</p>
    <div className={s.flowStrip} aria-label="対応の流れ"><b>① 洗浄</b><span aria-hidden="true">→</span><b>② 迅速な報告</b><span aria-hidden="true">→</span><b>③ 血液検査</b><span aria-hidden="true">＋</span><b>予防・経過観察</b></div>
    <section className={s.section}><h2>曝露後の3ステップとは</h2>
      <ol className={s.flow}>
        <li><span className={s.step}>1</span><h3>直ちに洗浄する</h3><p><strong>皮膚・針刺し部位：</strong>流水と石けんで洗います。血液を無理に絞り出しません。</p><p><strong>眼：</strong>水または生理食塩液で十分に洗います。<strong>口・鼻などの粘膜：</strong>水で十分に洗い流します。眼や粘膜に石けん・消毒薬を入れません。</p><p className={s.note}>有機物を物理的に除去するための処置です。洗浄だけで感染リスクがなくなるわけではありません。[1][2]</p></li>
        <li><span className={s.step}>2</span><h3>直ちに報告・受診する</h3><p>所属長、感染対策チーム、産業医、救急担当など、施設で決められた窓口へ連絡します。夜間も翌朝まで待ちません。</p><p><strong>伝えること：</strong>時刻、部位、針の種類と深さ、血液・体液の種類と量、感染源の情報、本人のB型肝炎ワクチン・抗体の記録。</p></li>
        <li><span className={s.step}>3</span><h3>双方の検査と、予防の要否を確認する</h3><p>本人と感染源患者の血液検査を、説明・同意と施設手順に沿って行います。感染源のHBV・HCV・HIV、本人の曝露前の状態やHBV免疫を確認します。</p><p><strong>感染源の結果がそろうまで、必要な予防を待たせません。</strong>初回陰性でも、今回の曝露による感染をその場で否定できないため、予定された再検査を受けます。[1–4]</p></li>
      </ol>
    </section>
    <section className={s.section}><h2>検査と並行して考えること</h2><div className={s.grid}>
      <article className={s.card}><span className={s.tag}>HBV · B型肝炎ウイルス</span><h3>免疫の記録で対応が変わる</h3><p>ワクチン接種歴、接種後のHBs抗体、感染源のHBs抗原から判断します。免疫が不十分な場合などは、HBIG（hepatitis B immune globulin：抗HBs人免疫グロブリン）とワクチンを速やかに検討します。</p><p className={s.note}>HBsはhepatitis B surface（B型肝炎ウイルス表面）を意味します。全員に同じ処置をするわけではありません。[3]</p></article>
      <article className={s.card}><span className={s.tag}>HIV · ヒト免疫不全ウイルス</span><h3>必要な予防内服は急いで開始する</h3><p>PEP（post-exposure prophylaxis：曝露後予防）は可能な限り早く、原則72時間以内に開始し、通常28日間続けます。72時間を超えても自己判断で諦めず、専門医に相談します。</p><p className={s.note}>72時間は「待ってよい時間」ではありません。2026年国内ガイドラインでは通常、曝露後12週の最終検査を行い、開始遅延などがあれば4〜6週にも検査します。[1][2]</p></article>
      <article className={s.card}><span className={s.tag}>HCV · C型肝炎ウイルス</span><h3>予防内服より、早期の感染確認</h3><p>ワクチンはなく、曝露後の抗ウイルス薬の予防投与は通常推奨されません。初回検査後、追跡が必要な場合は3〜6週のHCV RNA（ribonucleic acid：リボ核酸）検査、4〜6か月の抗体検査などを行います。感染が確認されたら治療につなげます。[4]</p></article>
      <article className={s.card}><span className={s.tag}>経過観察</span><h3>記録と再検査までをひと続きに</h3><p>事故報告書に残し、受診・内服・再検査の予定を確認します。内服中の副作用や発熱・発疹・黄疸などがあれば、次の予約日を待たず担当医に連絡します。</p><p>再発防止には、安全器材、リキャップを避けた廃棄、飛散リスクに応じた眼・顔の防護が必要です。</p></article>
    </div></section>
    <p className={s.callout}>この図は学習用です。実際の曝露では、施設の緊急連絡先と最新の手順を優先してください。<Link href="/summary/hepatitis-hiv/">感染経路・感染率・ワクチンを比較する →</Link></p>
    <section className={s.sources}><h2>出典・確認日</h2><p>2026年9月9日確認。洗浄・報告・検査と予防を、曝露直後から進める順に整理しています。</p><ol>
      <li><a href="https://hiv-guidelines.jp/2026/part16-2.htm">抗HIV治療ガイドライン2026：血液・体液曝露時の直後の対応</a></li>
      <li><a href="https://stacks.cdc.gov/view/cdc/183609/cdc_183609_DS1.pdf">米国公衆衛生局2025：職業上のHIV曝露と曝露後予防</a></li>
      <li><a href="https://www.cdc.gov/hepatitis-b/hcp/infection-control/index.html">CDC：医療現場でのHBV曝露への対応</a></li>
      <li><a href="https://www.cdc.gov/hepatitis-c/hcp/infection-control/index.html">CDC：医療従事者のHCV曝露後検査</a></li>
    </ol></section>
  </div></StudyPage>;
}
