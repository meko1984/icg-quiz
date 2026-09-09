import type { Metadata } from 'next';
import Link from 'next/link';
import StudyPage from '../../components/StudyPage';
import s from '../learning.module.css';
export const metadata: Metadata = { title: '洗浄剤と使用時の注意点 | サクッとまとめ', description: '洗浄と消毒の違い、汚れや微生物を広げない清掃、希釈・温度・時間・すすぎ・防護の要点。' };

const cautions = [
  ['濃度・温度・時間', '指定どおりに調製する', '「濃いほどよい」「熱いほどよい」とは限りません。酵素の働き、タンパク質の固着、材質への影響を考え、洗浄剤と器材の説明書にある希釈率・温度・浸漬時間を守ります。'],
  ['材質・対象', '対象に合う洗浄剤を選ぶ', 'アルカリ性洗浄剤は一部の金属などを傷めることがあります。酵素洗浄剤にも対応できる器材・洗浄機の条件があります。単回使用の器材を、洗浄して再使用することはできません。'],
  ['混合・継ぎ足し', '自己判断で混ぜない', '洗浄剤・消毒薬を混ぜると、作用低下や有害ガス発生につながることがあります。混合可否は製品表示で確認します。汚れた液への継ぎ足しを避け、交換時期を守ります。'],
  ['作業者の防護', '飛沫・皮膚接触・吸入を防ぐ', '汚染物と薬剤の両方に対応した手袋、エプロンなどを使い、飛散が予想されるときは眼・顔を守ります。酵素によるアレルギーにも注意し、噴霧や勢いよいブラッシングによる飛散を避けます。'],
  ['すすぎ・乾燥', '残留させず、乾燥して保管する', '器材の内腔や接合部まで指定どおりすすぎます。洗浄剤の残留は組織刺激や次工程への影響につながります。洗浄後の清潔な器材が再び汚れないよう、乾燥・保管まで管理します。'],
  ['洗浄後の工程', '必要な消毒・滅菌につなげる', '洗浄は汚れと微生物を取り除く工程です。必要な消毒・滅菌の代わりにはなりません。器材が触れる場所と製品の指定に応じて、次の処理を選びます。'],
] as const;

export default function Cleaning() {
  return <StudyPage title="洗浄剤と使用時の注意点"><div className={s.page}>
    <p className={s.intro}><strong>洗浄剤は、汚れをはがして取り除きやすくするものです。</strong>洗浄した場所から、別の場所へ微生物を運ばないことが大切です。</p>
    <section className={s.section}><h2>洗浄と消毒の違いとは</h2><div className={s.grid}>
      <article className={s.card}><span className={s.tag}>洗浄</span><h3>汚れごと取り除く</h3><p>水・洗浄剤・摩擦で、有機物や付着した微生物を物理的に除去します。酵素洗浄剤は血液などの汚れを分解して除去を助けますが、通常は消毒薬ではありません。[1]</p></article>
      <article className={s.card}><span className={s.tag}>消毒・滅菌</span><h3>必要な水準まで処理する</h3><p>洗浄で汚れを除いてから、対象に合った消毒・滅菌を行います。汚れが残ると、その後の処理が十分に働かないことがあります。[1]</p><Link href="/summary/disinfection/">消毒薬の水準と使い分け →</Link></article>
    </div></section>
    <section className={s.section} id="spread"><h2>「環境へ播種する」とは</h2><p>播種（はしゅ）は、ここでは<strong>菌を別の場所へまき広げること</strong>です。洗浄剤そのものが菌を増やす、という意味ではありません。</p>
      <div className={s.flowStrip}><b>汚れた場所を拭く</b><span aria-hidden="true">→</span><b>クロス・洗浄液へ菌が移る</b><span aria-hidden="true">→</span><b>同じ面で別の場所を拭く</b></div>
      <p className={s.callout}><strong>対策：</strong>清潔な場所から汚れた場所へ進め、クロスの面・クロス自体・液を適切に交換します。使用済みクロスを清潔な洗浄液に再び浸さず、施設の手順に沿って交換します。血液・体液で汚染された場所は、清拭除去に加え適切な消毒が必要です。[2][3]</p>
    </section>
    <section className={s.section}><h2>使うときの6つの注意点</h2><div className={s.grid}>{cautions.map(([tag, title, text]) => <article className={s.card} key={tag}><span className={s.tag}>{tag}</span><h3>{title}</h3><p>{text}</p></article>)}</div><p className={s.note}>「何倍・何℃・何分」は製品と器材で異なります。説明書・安全データシートと施設手順を確認してください。[1–3]</p></section>
    <section className={s.sources}><h2>出典・確認日</h2><p>2026年9月9日確認。</p><ol><li><a href="https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/cleaning.html">CDC：医療器材の洗浄</a></li><li><a href="https://www.cdc.gov/healthcare-associated-infections/hcp/cleaning-global/procedures.html">CDC：医療環境の清掃手順</a></li><li><a href="https://www.cdc.gov/infection-control/hcp/environmental-control/environmental-services.html">CDC：環境表面の清掃・消毒</a></li></ol></section>
  </div></StudyPage>;
}
