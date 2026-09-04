import type { Metadata } from 'next';
import StudyPage from '../../components/StudyPage';

const title = 'グラム染色 × 菌の形 | サクッとまとめ';
const description = 'グラム染色の色と菌の形から、GPC・GNC・GPR・GNRと代表菌を見分ける図解。';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [] },
  twitter: { card: 'summary', title, description, images: [] },
};

type Shape = 'cluster' | 'diplo' | 'chain' | 'spore' | 'rod' | 'thick-rod' | 'tiny-rod' | 'long-rod' | 'curve';

function BacteriaMark({ shape, negative = false }: { shape: Shape; negative?: boolean }) {
  const color = negative ? '#d72c79' : '#6330a3';
  const common = { fill: color };

  return (
    <svg className="bacteria-mark" viewBox="0 0 88 46" aria-hidden="true">
      {shape === 'cluster' && <g {...common}><circle cx="36" cy="13" r="6" /><circle cx="48" cy="14" r="6" /><circle cx="29" cy="24" r="6" /><circle cx="42" cy="25" r="6" /><circle cx="55" cy="25" r="6" /><circle cx="36" cy="36" r="6" /><circle cx="49" cy="36" r="6" /></g>}
      {shape === 'diplo' && <g {...common}><circle cx="38" cy="23" r="10" /><circle cx="53" cy="23" r="10" /></g>}
      {shape === 'chain' && <g {...common}><circle cx="18" cy="17" r="5" /><circle cx="28" cy="21" r="5" /><circle cx="38" cy="25" r="5" /><circle cx="48" cy="28" r="5" /><circle cx="58" cy="25" r="5" /><circle cx="68" cy="20" r="5" /></g>}
      {shape === 'spore' && <g fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"><path d="M14 14l22 18M48 12l25 20" /></g>}
      {shape === 'spore' && <g fill="#fff4c2" stroke={color} strokeWidth="2"><circle cx="25" cy="23" r="4" /><circle cx="60" cy="22" r="4" /></g>}
      {shape === 'rod' && <g fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"><path d="M14 15l20 7M39 12l22 8M23 33l21-5M53 31l20-9" /></g>}
      {shape === 'thick-rod' && <g fill="none" stroke={color} strokeWidth="11" strokeLinecap="round"><path d="M15 15l23 5M48 13l24 6M27 34l26-5" /></g>}
      {shape === 'tiny-rod' && <g fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"><path d="M17 15l9 2M34 12l8 2M49 17l8 2M61 12l9 2M24 30l8 2M42 28l9 2M59 32l8 2" /></g>}
      {shape === 'long-rod' && <g fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"><path d="M10 15l30 6M43 12l34 7M20 34l32-7M55 33l21-8" /></g>}
      {shape === 'curve' && <g fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"><path d="M11 16q12 15 24 0M39 30q12-15 24 0M58 13q9 11 18 0" /></g>}
    </svg>
  );
}

const groups = [
  {
    code: 'GPC',
    gram: 'グラム陽性',
    form: '球菌',
    color: 'purple',
    examples: [
      { name: '黄色ブドウ球菌', scientific: 'Staphylococcus aureus', shape: 'cluster' as Shape, hint: 'ブドウの房状' },
      { name: '肺炎球菌', scientific: 'Streptococcus pneumoniae', shape: 'diplo' as Shape, hint: '双球菌' },
      { name: '腸球菌', scientific: 'Enterococcus spp.', shape: 'chain' as Shape, hint: '連鎖状' },
    ],
  },
  {
    code: 'GNC',
    gram: 'グラム陰性',
    form: '球菌',
    color: 'pink',
    examples: [
      { name: 'モラクセラ菌', scientific: 'Moraxella catarrhalis', shape: 'diplo' as Shape, hint: '双球菌・細胞内外' },
    ],
  },
  {
    code: 'GPR',
    gram: 'グラム陽性',
    form: '桿菌',
    color: 'purple',
    examples: [
      { name: 'C. difficile', scientific: 'Clostridioides difficile', shape: 'spore' as Shape, hint: '太い桿菌・芽胞あり' },
    ],
  },
  {
    code: 'GNR',
    gram: 'グラム陰性',
    form: '桿菌',
    color: 'pink',
    examples: [
      { name: '大腸菌', scientific: 'Escherichia coli', shape: 'rod' as Shape, hint: '中くらいの桿菌' },
      { name: '肺炎桿菌', scientific: 'Klebsiella pneumoniae', shape: 'thick-rod' as Shape, hint: '太く丸みがある' },
      { name: 'インフルエンザ菌', scientific: 'Haemophilus influenzae', shape: 'tiny-rod' as Shape, hint: '非常に小さい' },
      { name: '緑膿菌', scientific: 'Pseudomonas aeruginosa', shape: 'long-rod' as Shape, hint: '細長い桿菌' },
      { name: 'カンピロバクター', scientific: 'Campylobacter jejuni', shape: 'curve' as Shape, hint: 'カモメの翼状' },
    ],
  },
] as const;

type ResistanceLabel = {
  code: string;
  meaning: string;
  tone: 'susceptible' | 'resistant';
};

const resistanceLabels: Record<string, readonly ResistanceLabel[]> = {
  'Staphylococcus aureus': [
      { code: 'MSSA', meaning: 'メチシリン感受性黄色ブドウ球菌', tone: 'susceptible' },
      { code: 'MRSA', meaning: 'メチシリン耐性黄色ブドウ球菌', tone: 'resistant' },
  ],
  'Streptococcus pneumoniae': [
    { code: 'PSSP', meaning: 'ペニシリン感受性肺炎球菌', tone: 'susceptible' },
    { code: 'PISP', meaning: 'ペニシリン低感受性肺炎球菌', tone: 'resistant' },
    { code: 'PRSP', meaning: 'ペニシリン耐性肺炎球菌', tone: 'resistant' },
  ],
  'Enterococcus spp.': [
    { code: 'VRE', meaning: 'バンコマイシン耐性腸球菌', tone: 'resistant' },
  ],
  'Escherichia coli': [
    { code: 'ESBL産生菌', meaning: 'ESBLという酵素をつくる菌', tone: 'resistant' },
    { code: 'CRE', meaning: 'カルバペネム耐性腸内細菌目細菌', tone: 'resistant' },
  ],
  'Klebsiella pneumoniae': [
    { code: 'ESBL産生菌', meaning: 'ESBLという酵素をつくる菌', tone: 'resistant' },
    { code: 'CRE', meaning: 'カルバペネム耐性腸内細菌目細菌', tone: 'resistant' },
  ],
  'Haemophilus influenzae': [
    { code: 'BLNAS', meaning: 'βラクタマーゼ非産生・アンピシリン感受性', tone: 'susceptible' },
    { code: 'BLNAR', meaning: 'βラクタマーゼ非産生・アンピシリン耐性', tone: 'resistant' },
    { code: 'BLPAR', meaning: 'βラクタマーゼ産生・アンピシリン耐性', tone: 'resistant' },
    { code: 'BLPACR', meaning: 'βラクタマーゼ産生・AMPC/CVA耐性', tone: 'resistant' },
  ],
  'Pseudomonas aeruginosa': [
    { code: 'MDRP', meaning: '多剤耐性緑膿菌', tone: 'resistant' },
  ],
};

function ResistanceLabels({ scientific }: { scientific: string }) {
  const labels = resistanceLabels[scientific];
  if (!labels) return null;

  return (
    <div className="resistance-labels bacteria-resistance" aria-label="感受性・耐性による呼び名の具体例">
      {labels.map((label) => (
        <div className={`resistance-label resistance-${label.tone}`} key={label.code}>
          <b>{label.code}</b><span>{label.meaning}</span>
        </div>
      ))}
    </div>
  );
}

export default function GramStain() {
  return (
    <StudyPage title="グラム染色 × 菌の形">
      <p className="lead">まず<strong>色</strong>、次に<strong>形</strong>を確認します。<br />2つを組み合わせると、代表菌が見分けやすくなります。</p>

      <section className="gram-route" aria-labelledby="gram-route-title">
        <h2 id="gram-route-title">見る順番は、たった2つ</h2>
        <div className="gram-route-steps">
          <div><b>1</b><p><small>染まった色</small><strong><span className="purple-text">紫＝陽性</span>／<span className="pink-text">ピンク＝陰性</span></strong></p></div>
          <span aria-hidden="true">→</span>
          <div><b>2</b><p><small>菌の形</small><strong>丸＝球菌／棒＝桿菌</strong></p></div>
        </div>
      </section>

      <section className="gram-matrix-section" aria-labelledby="gram-matrix-title">
        <div className="section-heading-row">
          <div><p className="section-kicker">GRAM × SHAPE</p><h2 id="gram-matrix-title">4つの組み合わせ</h2></div>
          <p>色と形から、略号と代表菌へ</p>
        </div>
        <div className="gram-column-labels" aria-hidden="true"><span>紫 · グラム陽性</span><span>ピンク · グラム陰性</span></div>
        <div className="gram-matrix">
          {groups.map((group) => (
            <article className={`gram-group gram-${group.color}`} key={group.code}>
              <header>
                <div className="gram-code"><strong>{group.code}</strong><span>{group.gram}<br />{group.form}</span></div>
                <div className="gram-form" aria-label={group.form}><span>{group.form === '球菌' ? '●' : '▬'}</span>{group.form}</div>
              </header>
              <div className="bacteria-list">
                {group.examples.map((example) => (
                  <div className="bacteria-item" key={example.scientific}>
                    <BacteriaMark shape={example.shape} negative={group.color === 'pink'} />
                    <div>
                      <strong>{example.name}</strong>
                      <i>{example.scientific}</i>
                      <small>{example.hint}</small>
                      <ResistanceLabels scientific={example.scientific} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resistance-section" aria-labelledby="resistance-title">
        <div className="section-heading-row">
          <div><p className="section-kicker">SAME BACTERIA, DIFFERENT NAME</p><h2 id="resistance-title">同じ菌でも、薬の効き方で呼び名が変わる</h2></div>
        </div>
        <div className="resistance-key">
          <span aria-hidden="true">🔬</span>
          <p><strong>グラム染色では同じ見え方</strong><small>感受性検査などで、MSSA・MRSAといった違いが分かります。</small></p>
        </div>
        <p className="resistance-note">※ ここにあるのは代表的な呼び名です。大腸菌や緑膿菌などのすべてが耐性菌という意味ではありません。</p>
      </section>

      <aside className="takeaway gram-takeaway"><h2>略号は3文字で読みます</h2><p><strong>G</strong>ram（グラム）＋ <strong>P/N</strong>（陽性／陰性）＋ <strong>C/R</strong>（球菌／桿菌）を表します。たとえばGPCは「グラム陽性の球菌」です。</p></aside>
      <details className="recall"><summary>確認してみましょう：ピンク色で棒状なら？</summary><p><strong>GNR（グラム陰性桿菌）です。</strong>大腸菌、肺炎桿菌、インフルエンザ菌、緑膿菌、カンピロバクターなどが該当します。</p></details>

      <footer className="study-sources public-sources">
        <h2>公的機関の出典</h2>
        <a href="https://amr.ncgm.go.jp/pdf/20231116_02.pdf" target="_blank" rel="noreferrer">厚生労働省／AMR臨床リファレンスセンター「抗微生物薬適正使用の手引き 第三版 別冊」</a>
        <a href="https://www.niid.go.jp/niid/images/lab-manual/ResistantBacteria20200604.pdf" target="_blank" rel="noreferrer">国立感染症研究所「病原体検出マニュアル 薬剤耐性菌」</a>
        <a href="https://www.cdc.gov/staphylococcus-aureus/about/index.html" target="_blank" rel="noreferrer">CDC「Staphylococcus aureus Basics」</a>
        <a href="https://www.niid.go.jp/niid/images/idsc/iasr/44/515.pdf" target="_blank" rel="noreferrer">国立感染症研究所「病原微生物検出情報 Vol. 44 No. 1」</a>
        <a href="https://www.mhlw.go.jp/content/10800000/001080954.pdf" target="_blank" rel="noreferrer">厚生労働省「臨床検査技師国家試験出題基準（令和7年版）」</a>
      </footer>
    </StudyPage>
  );
}
