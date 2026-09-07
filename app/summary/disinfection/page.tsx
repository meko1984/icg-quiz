import type { Metadata } from 'next';
import StudyPage from '../../components/StudyPage';

const title = '消毒薬の水準と使い分け | サクッとまとめ';
const description = 'Spaulding分類と、高・中・低水準消毒薬の代表例、グルタラールの位置づけを整理。';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [] },
  twitter: { card: 'summary', title, description, images: [] },
};

export default function Disinfection() {
  return (
    <StudyPage title="消毒薬の水準と使い分け">
      <p className="lead">先に<strong>器材がどこに触れるか</strong>を確認し、必要な処理を決めます。<br />薬剤名だけで覚えず、対象と水準をつなげましょう。</p>

      <section className="study-section" id="spaulding" aria-labelledby="spaulding-title">
        <h2 id="spaulding-title">器材のリスクから処理を決めます</h2>
        <div className="disinfection-route">
          <div><small>無菌組織・血管系へ</small><strong>クリティカル</strong><b>原則、滅菌</b></div>
          <div><small>粘膜・傷のある皮膚へ</small><strong>セミクリティカル</strong><b>最低、高水準消毒</b></div>
          <div><small>健常な皮膚へ</small><strong>ノンクリティカル</strong><b>清拭・低水準消毒</b></div>
        </div>
        <p className="small-note">これがSpaulding（スポルディング）分類です。器材の材質、汚染、製造販売業者の再処理手順もあわせて確認します。</p>
      </section>

      <section className="study-section" id="levels" aria-labelledby="levels-title">
        <h2 id="levels-title">消毒薬を水準で整理します</h2>
        <div className="disinfectant-levels">
          <div className="disinfectant-level">
            <b>高水準</b>
            <p><strong>グルタラール・フタラール・過酢酸</strong><small>内視鏡など、主に熱に弱いセミクリティカル器材の処理に使います。</small></p>
          </div>
          <div className="disinfectant-level disinfectant-level-middle">
            <b>中水準</b>
            <p><strong>次亜塩素酸ナトリウム・アルコール類・ポビドンヨードなど</strong><small>対象、濃度、接触時間によって用途が異なります。</small></p>
          </div>
          <div className="disinfectant-level disinfectant-level-low">
            <b>低水準</b>
            <p><strong>第四級アンモニウム塩・クロルヘキシジン・両性界面活性剤など</strong><small>健常な皮膚に触れる器材や環境表面などで使われます。</small></p>
          </div>
        </div>
        <p className="study-disclaimer">※ この分類は学習用の代表例です。同じ成分でも濃度・剤形・製品によって使用対象や方法が異なります。実際は製品表示と施設手順に従います。</p>
      </section>

      <section className="study-section" id="glutaral" aria-labelledby="glutaral-title">
        <h2 id="glutaral-title">グルタラールって何ですか？</h2>
        <div className="glutaral-card">
          <h3>高水準消毒薬のひとつ</h3>
          <p>グルタラール（グルタルアルデヒド）は、熱に弱い医療器材の高水準消毒に使われる薬剤です。日常的な手指消毒や床の清拭に使う薬ではありません。</p>
          <div className="glutaral-points">
            <div><small>水準</small><strong>高水準</strong></div>
            <div><small>主な対象</small><strong>内視鏡などの器材</strong></div>
            <div><small>重要な注意</small><strong>換気・密閉・PPE</strong></div>
          </div>
        </div>
        <aside className="takeaway">
          <h2>蒸気、眼、皮膚への曝露を防ぎます</h2>
          <p>取り扱うときは十分な換気を行い、容器を覆い、適切な手袋や眼の保護具を使用します。薬剤の濃度、接触時間、すすぎ、対象器材は製品表示と施設手順で確認します。</p>
        </aside>
      </section>

      <details className="recall">
        <summary>確認してみましょう：グルタラールはどの水準ですか？</summary>
        <p><strong>高水準消毒薬です。</strong>セミクリティカル器材などに用い、取り扱う人の曝露対策も必要です。</p>
      </details>

      <footer className="study-sources public-sources">
        <h2>公的機関の出典</h2>
        <a href="https://www.mhlw.go.jp/content/10800000/001243413.pdf" target="_blank" rel="noreferrer">厚生労働省「令和6年度院内感染対策講習会 2. 洗浄・消毒・滅菌」</a>
        <a href="https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/rational-approach.html" target="_blank" rel="noreferrer">CDC「A Rational Approach to Disinfection and Sterilization」</a>
        <a href="https://www.cdc.gov/niosh/docs/2001-115/" target="_blank" rel="noreferrer">CDC／NIOSH「Glutaraldehyde: Occupational Hazards in Hospitals」</a>
      </footer>
    </StudyPage>
  );
}
