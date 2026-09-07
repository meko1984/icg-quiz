import type { Metadata } from 'next';
import StudyPage from '../../components/StudyPage';
import styles from './page.module.css';

const title = '消毒薬の水準と使い分け | サクッとまとめ';
const description = 'Spaulding分類と、高・中・低水準の消毒薬9種類・系統の特徴、主な使用対象、代表的な商品名を整理。';

const disinfectants = [
  {
    id: 'glutaral', name: 'グルタラール', level: '高水準', tone: 'high',
    alias: '別名：グルタルアルデヒド｜アルデヒド系',
    explanation: '微生物のたんぱく質に作用する、医療器材用の消毒薬です。熱に弱い器材の高水準消毒に用います。',
    targets: ['消化管内視鏡（胃カメラ・大腸カメラ）・気管支鏡', '麻酔装置の再使用可能な呼吸回路部品（蛇管・接続管など）', '人工呼吸装置の再使用可能な呼吸回路部品', '粘膜に触れる、熱に弱いゴム・プラスチック製器材'],
    products: ['ステリハイドL 2W/V％液・20W/V％液'],
    note: '人体には使用しません。蒸気や皮膚・眼への曝露を防ぐため、換気・ふた付き容器・適切な手袋や眼の保護具が必要です。消毒後は十分にすすぎます。',
    source: 'https://www.maruishi-pharm.co.jp/medical/products/14272/', sourceLabel: '丸石製薬：ステリハイドL',
  },
  {
    id: 'phtharal', name: 'フタラール', level: '高水準', tone: 'high',
    alias: '別名：オルトフタルアルデヒド（OPA）｜アルデヒド系',
    explanation: '熱に弱い医療器材に用いる消毒薬です。グルタラールと同じアルデヒド系で、製品によっては緩衝化剤を加えずに使えます。',
    targets: ['消化管内視鏡（胃カメラ・大腸カメラ）・気管支鏡', '経食道心エコー（TEE）のプローブ：食道から心臓を観察する探触子', '麻酔装置の再使用可能な呼吸回路部品（蛇管・接続管など）', '人工呼吸装置の再使用可能な呼吸回路部品'],
    products: ['ディスオーパ消毒液0.55％', 'フタラール消毒液0.55％「ケンエー」'],
    note: '人体には使用しません。薬液の残留は粘膜損傷などの原因になるため、十分なすすぎが必要です。膀胱鏡などの経尿道的検査・処置用器具と、超音波白内障手術器具には使用しません。',
    source: 'https://www.asp.co.jp/hubfs/aspj-corp/dl/pkgi/pkgi_disopa.pdf', sourceLabel: 'ASP Japan：ディスオーパ電子添文',
  },
  {
    id: 'peracetic-acid', name: '過酢酸', level: '高水準', tone: 'high',
    alias: '読み：かさくさん｜過酸化物系',
    explanation: '強い酸化作用で微生物を不活化する消毒薬です。高水準消毒に用い、製品が定める条件では化学的滅菌にも用いられます。',
    targets: ['消化管内視鏡（胃カメラ・大腸カメラ）', '適合性が確認された耳鼻咽喉科用の軟性内視鏡', 'ネブライザーの再使用可能なマウスピース（口にくわえる部品）', 'ネブライザーの再使用可能な薬液容器などのキット部品', 'ネブライザーの再使用可能な蛇管・接続部品'],
    products: ['アセサイド6％消毒液'],
    note: '人体には使用しません。刺激臭や材質への影響があるため、換気・保護具・器材と装置の適合性確認が必要です。製品の調製方法と、消毒・滅菌それぞれの条件を区別します。',
    source: 'https://med.saraya.com/products/cssd/peracetic-acid/aceside/', sourceLabel: 'サラヤ：アセサイド6％消毒液',
  },
  {
    id: 'hypochlorite', name: '次亜塩素酸ナトリウム', level: '中水準', tone: 'middle',
    alias: '塩素系｜「次亜塩素酸水」とは別の製剤',
    explanation: '塩素の酸化作用を利用する消毒薬です。環境や物品の消毒に用い、嘔吐物・便による汚染への対応でも使われます。',
    targets: ['嘔吐物を除去した後の床', '便器・トイレの汚染部位', '食器・調理器具', '白衣・シーツなどのリネン'],
    products: ['ピューラックス（次亜塩素酸ナトリウム6％）', 'ジアエン液2％'],
    note: '手指・皮膚には使用しません。酸性の洗剤などと混ぜると有毒な塩素ガスが発生します。汚れで効果が低下し、金属腐食や脱色も起こるため、対象に合う濃度・方法を確認します。',
    source: 'https://www.oyalox.co.jp/purelox/', sourceLabel: 'オーヤラックス：ピューラックス',
  },
  {
    id: 'alcohol', name: 'アルコール類', level: '中水準', tone: 'middle',
    alias: '代表成分：エタノール・イソプロパノール',
    explanation: '微生物のたんぱく質などに作用し、速やかに消毒する薬剤です。手指用、皮膚用、器材用があり、同じアルコールでも製品の用途は異なります。',
    targets: ['医療従事者の手指（手指用製剤）', '注射・採血前の健常な皮膚', '聴診器の接触面', '小さな器材の外表面'],
    products: ['消毒用エタノール「ヨシダ」', 'イソプロパノール消毒液70％「ヨシダ」', '手ピカジェル（手指用）'],
    note: '芽胞には効果がなく、ノロウイルスなどへの効果も製剤・条件で異なります。粘膜や傷には使用せず、火気を避けます。必要な接触時間と乾燥を守り、器材の材質も確認します。',
    source: 'https://www.yoshida-pharm.co.jp/product/detail_201.html', sourceLabel: '吉田製薬：消毒用エタノール',
  },
  {
    id: 'povidone-iodine', name: 'ポビドンヨード', level: '中水準', tone: 'middle',
    alias: 'ヨウ素系｜ヨードホール',
    explanation: 'ヨウ素を徐々に放出し、微生物に作用する消毒薬です。茶褐色の薬液で、皮膚や、適応のある粘膜の消毒に用います。',
    targets: ['手術部位の皮膚', '手術部位の粘膜（適応のある製剤）', '皮膚・粘膜の創傷部位（適応のある製剤）'],
    products: ['イソジン液10％', 'ポピヨドン液10％', 'スワブスティックポビドンヨード（10％ポビドンヨード液・綿棒付き）'],
    swabNote: 'スワブスティックポビドンヨードは、薬液と綿棒を組み合わせた使い切り製品です。ポビドンヨードを含むため、この中水準の欄に掲載しています。同じ成分でも、うがい用などの別製品とは用途を区別します。',
    note: '同じブランドでも、うがい用・皮膚用・スクラブ用は別製品です。用途を置き換えず、過敏症の既往や甲状腺疾患などの注意事項を電子添文で確認します。',
    source: 'https://med.shionogi.co.jp/products/medicine/isodine.html?guid=ON', sourceLabel: '塩野義製薬：イソジン液10％',
  },
  {
    id: 'quaternary-ammonium', name: '第四級アンモニウム塩', level: '低水準', tone: 'low',
    alias: '代表成分：ベンザルコニウム塩化物・ベンゼトニウム塩化物｜逆性石けん',
    explanation: '微生物の膜に作用する陽イオン性の界面活性剤です。単一の薬の名前ではなく、ベンザルコニウム塩化物などを含む消毒薬のグループです。',
    targets: ['ベッド柵・床頭台などの家具', '病室の床・物品', '健常な皮膚に触れる器材の表面', '手指・皮膚（適応のある製剤）'],
    products: ['ベンザルコニウム塩化物：ザルコニン液10・オスバンS', 'ベンゼトニウム塩化物：ハイアミン液10％'],
    note: '芽胞や結核菌には効果が期待できず、すべてのウイルスに有効ではありません。石けんや有機物で効果が低下します。アルコール配合製剤は、水溶液とは性質が異なります。',
    source: 'https://www.kenei-pharm.com/medical/products/1887/', sourceLabel: '健栄製薬：ザルコニン液10',
  },
  {
    id: 'chlorhexidine', name: 'クロルヘキシジン', level: '低水準', tone: 'low',
    alias: '主な成分名：クロルヘキシジングルコン酸塩｜ビグアナイド系',
    explanation: '微生物の膜に作用し、皮膚上で抗菌作用が持続する消毒薬です。水溶液、洗浄用のスクラブ、アルコール配合製剤を使い分けます。',
    targets: ['手術前の手指（スクラブ製剤など）', '手術部位の皮膚', '注射・カテーテル挿入前の健常な皮膚（適応のある製剤）', 'すり傷・きり傷などの創傷面（スワブスティックヘキシジン0.05％など、適応のある非アルコール製剤）'],
    products: ['ステリクロン液5（水溶液）', 'ステリクロンスクラブ液4％', 'ステリクロンWエタノール液1％', 'スワブスティックヘキシジン（0.05％クロルヘキシジングルコン酸塩・アルコールなし・綿棒付き）', 'スワブスティックヘキシジン0.2％（アルコールなし・綿棒付き）', 'クロルヘキシジングルコン酸塩エタノール液1％ 綿棒8「LT」・綿棒12「LT」（スワブスティックシリーズ）'],
    swabNote: '「ヘキシジン」は商品名の一部で、有効成分はクロルヘキシジンです。0.05％製品はすり傷・きり傷などの創傷面、0.2％製品は手指・皮膚や医療機器の消毒に適応があります。1％エタノール製剤は別製品で、水溶液と用途を置き換えません。ここでは成分でまとめていますが、アルコール配合製剤を低水準の水溶液と同じ扱いにはしません。',
    note: 'アルコール配合製剤の作用を「低水準」だけで判断しません。ショック・アナフィラキシーに注意が必要です。掲載した製品は眼や腟・膀胱・口腔などの粘膜に使用しません。',
    source: 'https://www.kenei-pharm.com/medical/products/2148/', sourceLabel: '健栄製薬：ステリクロン液5',
  },
  {
    id: 'amphoteric', name: '両性界面活性剤', level: '低水準', tone: 'low',
    alias: '代表成分：アルキルジアミノエチルグリシン塩酸塩',
    explanation: '陽イオンと陰イオンの両方の性質をもつ界面活性剤で、洗浄作用と殺菌作用があります。環境・器材や、適応のある皮膚・粘膜の消毒に用います。',
    targets: ['ベッド柵・床頭台などの家具', '病室の床・物品', '健常な皮膚に触れる器材', '手指・皮膚（適応のある製剤）'],
    products: ['サテニジン液10・液0.2・液0.05'],
    note: '芽胞には効果が期待できません。結核領域では製品に定められた条件があり、低水準という分類だけで効果を判断しません。石けんを洗い流し、汚れを除去してから使用します。',
    source: 'https://www.kenei-pharm.com/medical/products/1851/', sourceLabel: '健栄製薬：サテニジン液10',
  },
];

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
        <h2 id="spaulding-title">器材のリスクと必要な処理</h2>
        <div className="disinfection-route">
          <div><small>無菌組織・血管系へ</small><strong>クリティカル</strong><b>原則、滅菌</b><small>手術器具・血管内カテーテルなど</small></div>
          <div><small>粘膜・傷のある皮膚へ</small><strong>セミクリティカル</strong><b>最低、高水準消毒</b><small>消化管内視鏡・気管支鏡など</small></div>
          <div><small>健常な皮膚へ</small><strong>ノンクリティカル</strong><b>清拭・低水準消毒</b><small>聴診器・血圧計のカフなど</small></div>
        </div>
        <p className="small-note">これがSpaulding（スポルディング）分類です。器材の材質、汚染、製造販売業者の再処理手順もあわせて確認します。</p>
      </section>

      <section className="study-section" id="levels" aria-labelledby="levels-title">
        <h2 id="levels-title">消毒薬の水準と代表例</h2>
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

      <section className="study-section" aria-labelledby="drug-index-title">
        <h2 id="drug-index-title">消毒薬ごとの特徴・対象・商品名</h2>
        <p>このページで挙げた9種類・系統を順に紹介します。名前を選ぶと説明へ移動できます。</p>
        <nav className={styles.index} aria-label="消毒薬の説明へ移動">
          {disinfectants.map((drug) => (
            <a key={drug.id} href={`#${drug.id}`} className={styles[drug.tone]}>
              <small>{drug.level}</small><strong>{drug.name}</strong>
            </a>
          ))}
        </nav>
        <p className="study-disclaimer">商品名は国内製品の代表例で、推奨順位や採用頻度を示すものではありません。商品名中の濃度は製品の表示です。そのまま使う製品と希釈・調製する製品があるため、使用時の濃度とは区別してください。</p>
      </section>

      <aside className="takeaway">
        <h2>対象例の読み方</h2>
        <p>以下は用途をイメージするための例です。器材は<strong>再使用可能で、薬剤との適合性が確認されたもの</strong>に限ります。消毒前に十分に洗浄し、製品と器材の指定する濃度・接触時間・すすぎ・乾燥を守ります。生検鉗子など無菌組織に入る器具には、適切な滅菌が必要です。</p>
        <p>高水準消毒の対象には、内視鏡以外に、経食道心エコーのプローブや呼吸療法・麻酔関連の器材もあります。呼吸回路などの例は、<strong>取り外して再処理できる部品</strong>を指し、装置本体を浸漬する意味ではありません。単回使用品は再使用せず、加熱処理が可能な器材はメーカー指定の熱消毒・滅菌方法も確認します。</p>
      </aside>

      <div className={styles.cards}>
        {disinfectants.map((drug) => (
          <section key={drug.id} id={drug.id} aria-labelledby={`${drug.id}-title`} className={`${styles.card} ${styles[drug.tone]}`}>
            <header>
              <span className={styles.badge}>{drug.level}</span>
              <h2 id={`${drug.id}-title`}>{drug.name}とは</h2>
              <p className={styles.alias}>{drug.alias}</p>
            </header>
            <p>{drug.explanation}</p>
            <div className={styles.facts}>
              <div>
                <h3>主な対象の具体例</h3>
                <ul>{drug.targets.map((target) => <li key={target}>{target}</li>)}</ul>
              </div>
              <div>
                <h3>代表的な商品名</h3>
                <ul>{drug.products.map((product) => <li key={product}>{product}</li>)}</ul>
              </div>
            </div>
            {drug.swabNote && (
              <div className={styles.caution}>
                <h3>スワブスティックの成分と使い分け</h3>
                <p>{drug.swabNote}</p>
                <a className={styles.source} href="https://libatape.jp/product/medicalshodoku/" target="_blank" rel="noreferrer">リバテープ製薬：スワブスティックシリーズの製品情報 ↗</a>
              </div>
            )}
            <div className={styles.caution}>
              <h3>使い分けの注意</h3>
              <p>{drug.note}</p>
            </div>
            <a className={styles.source} href={drug.source} target="_blank" rel="noreferrer">製品資料：{drug.sourceLabel} ↗</a>
          </section>
        ))}
      </div>

      <details className="recall">
        <summary>確認：高水準消毒薬を3つ挙げると？</summary>
        <p><strong>グルタラール・フタラール・過酢酸です。</strong>主に熱に弱い医療器材に用います。手指や皮膚には使わず、取り扱う人の曝露対策も必要です。</p>
      </details>

      <footer className="study-sources public-sources">
        <h2>出典・製品情報</h2>
        <a href="https://www.mhlw.go.jp/content/10800000/001243413.pdf" target="_blank" rel="noreferrer">厚生労働省「令和6年度院内感染対策講習会 2. 洗浄・消毒・滅菌」</a>
        <a href="https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/rational-approach.html" target="_blank" rel="noreferrer">CDC「A Rational Approach to Disinfection and Sterilization」</a>
        <a href="https://www.cdc.gov/niosh/docs/2001-115/" target="_blank" rel="noreferrer">CDC／NIOSH「Glutaraldehyde: Occupational Hazards in Hospitals」</a>
        <a href="https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/chemical-disinfectants.html" target="_blank" rel="noreferrer">CDC「Chemical Disinfectants」：作用・適用上の注意</a>
        <a href="https://www.kenei-pharm.com/medical/products/" target="_blank" rel="noreferrer">健栄製薬：消毒薬の製品名・成分・電子添文</a>
        <a href="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2616701Q1055_3?user=1" target="_blank" rel="noreferrer">PMDA：ハイアミン液10％</a>
        <a href="https://alinamin-kenko.jp/products/gairai/qa_osvan_s_qa.html" target="_blank" rel="noreferrer">アリナミン製薬：オスバンS</a>
        <a href="https://www.yoshida-pharm.co.jp/pdf/products-List.pdf" target="_blank" rel="noreferrer">吉田製薬：主要製品一覧（ポピヨドンなど）</a>
        <a href="https://kenei-pharm.com/tepika/" target="_blank" rel="noreferrer">健栄製薬：手ピカジェル</a>
        <a href="https://med.saraya.com/products/acecide/db/naishikyo/" target="_blank" rel="noreferrer">サラヤ：アセサイドの内視鏡適合性情報</a>
        <a href="https://med.saraya.com/products/acecide/db/kyotsu/" target="_blank" rel="noreferrer">サラヤ：アセサイドの器材適合性情報（ネブライザー部品など）</a>
        <p className="small-note">製品情報の確認日：2026年9月7日。実際の使用では最新の電子添文と施設手順を確認してください。</p>
      </footer>
    </StudyPage>
  );
}
