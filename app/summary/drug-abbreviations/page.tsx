import type { Metadata } from 'next';
import StudyPage from '../../components/StudyPage';
import SpectrumOverview from './SpectrumOverview';

const title = '抗菌薬の略称・製品名・抗菌スペクトル | サクッとまとめ';
const description = '検査結果で見かける抗菌薬30剤を、略称の意味、一般名、代表的な製品名、剤形・外観、大まかな抗菌スペクトルにつなげるまとめ。';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [] },
  twitter: { card: 'summary', title, description, images: [] },
};

type Coverage = '○' | '△' | '—';
type Drug = {
  no: number; id: string; code: string; expansion: string; generic: string;
  product: string; form: string; appearance: string;
  coverage: [Coverage, Coverage, Coverage, Coverage]; note: string; source: string;
};

const drugFamilies: { name: string; drugs: Drug[] }[] = [
  {
    name: 'ペニシリン系・βラクタマーゼ阻害薬配合剤',
    drugs: [
      { no: 1, id: 'sbt-abpc', code: 'SBT/ABPC', expansion: 'sulbactam / ampicillin', generic: 'スルバクタム／アンピシリン', product: 'ユナシン-S静注用', form: '注射薬', appearance: '白色〜帯黄白色の粉末が入ったバイアル', coverage: ['○', '△', '○', '○'], note: '嫌気性菌も対象に含む。MRSA・緑膿菌は通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139504G1028_3?user=1' },
      { no: 2, id: 'ampc', code: 'AMPC', expansion: 'amoxicillin', generic: 'アモキシシリン', product: 'サワシリンカプセル／錠／細粒', form: '内服薬', appearance: 'カプセル、白色錠、淡橙色の細粒', coverage: ['○', '△', '○', '△'], note: '腸球菌なども対象になりうるが、βラクタマーゼ産生菌には弱い。', source: 'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/171911_6131001C1210_2_09' },
      { no: 3, id: 'cva-ampc', code: 'CVA/AMPC', expansion: 'clavulanate / amoxicillin', generic: 'クラブラン酸／アモキシシリン', product: 'オーグメンチン配合錠', form: '内服薬', appearance: '白色〜帯黄白色のフィルムコーティング錠', coverage: ['○', '△', '○', '○'], note: '嫌気性菌も対象に含む。MRSA・緑膿菌は通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/340278_6139100F1048_1_17' },
      { no: 4, id: 'pipc', code: 'PIPC', expansion: 'piperacillin', generic: 'ピペラシリン', product: 'ペントシリン注射用', form: '注射薬', appearance: '白色の粉末が入ったバイアル', coverage: ['△', '△', '△', '○'], note: '緑膿菌を対象に含むが、βラクタマーゼの影響を受ける。', source: 'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/400022_6131403D1047_3_04' },
      { no: 5, id: 'taz-pipc', code: 'TAZ/PIPC', expansion: 'tazobactam / piperacillin', generic: 'タゾバクタム／ピペラシリン', product: 'ゾシン静注用／配合点滴静注用バッグ', form: '注射薬', appearance: '白色粉末のバイアル、または溶解液付きバッグ', coverage: ['○', '△', '○', '○'], note: '緑膿菌・嫌気性菌も対象に含む。MRSAは通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139505F3020_1?user=1' },
    ],
  },
  {
    name: 'セフェム系・オキサセフェム系',
    drugs: [
      { no: 6, id: 'cez', code: 'CEZ', expansion: 'cefazolin', generic: 'セファゾリン', product: 'セファメジンα注射用', form: '注射薬', appearance: '白色〜淡黄白色の粉末が入ったバイアル', coverage: ['○', '△', '△', '△'], note: 'MSSA・連鎖球菌が得意。腸球菌・MRSA・緑膿菌は通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132401D1045_4?user=1' },
      { no: 7, id: 'ctm', code: 'CTM', expansion: 'cefotiam', generic: 'セフォチアム', product: 'パンスポリン静注用／静注用バッグ', form: '注射薬', appearance: '白色〜淡黄色の粉末、または溶解液付きバッグ', coverage: ['○', '△', '△', '○'], note: '一部の腸内細菌目まで対象。MRSA・緑膿菌は通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132400F1033_2?user=1' },
      { no: 8, id: 'sbt-cpz', code: 'SBT/CPZ', expansion: 'sulbactam / cefoperazone', generic: 'スルバクタム／セフォペラゾン', product: 'スルペラゾン静注用', form: '注射薬', appearance: '白色〜帯黄白色の粉末が入ったバイアル', coverage: ['△', '△', '△', '○'], note: '緑膿菌・嫌気性菌も対象になりうる。MRSAは通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139500F1024_3?user=1' },
      { no: 9, id: 'ctrx', code: 'CTRX', expansion: 'ceftriaxone', generic: 'セフトリアキソン', product: 'ロセフィン静注用', form: '注射薬', appearance: '白色〜淡黄色の結晶性粉末が入ったバイアル', coverage: ['○', '○', '△', '○'], note: '肺炎球菌や多くの腸内細菌目が対象。腸球菌・MRSA・緑膿菌は通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6132419F2026?user=1' },
      { no: 10, id: 'czop', code: 'CZOP', expansion: 'cefozopran', generic: 'セフォゾプラン', product: 'ファーストシン静注用', form: '注射薬', appearance: '白色〜淡黄色の粉末が入ったバイアル', coverage: ['○', '△', '△', '○'], note: '緑膿菌も対象に含む。MRSAは通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132426F1020_2?user=1' },
      { no: 11, id: 'cdtr-pi', code: 'CDTR-PI', expansion: 'cefditoren pivoxil', generic: 'セフジトレン ピボキシル', product: 'メイアクトMS錠／小児用細粒', form: '内服薬', appearance: '白色のフィルムコーティング錠、または淡橙色の細粒', coverage: ['○', '○', '△', '○'], note: '主に呼吸器・耳鼻科領域などで使う経口薬。緑膿菌は通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132015F1037_1?user=1' },
      { no: 12, id: 'fmox', code: 'FMOX', expansion: 'flomoxef', generic: 'フロモキセフ', product: 'フルマリン静注用', form: '注射薬', appearance: '白色〜淡黄色の粉末が入ったバイアル', coverage: ['○', '△', '△', '○'], note: '嫌気性菌も対象に含む。MRSA・緑膿菌は通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/340018_6133401F1027_1_19' },
    ],
  },
  {
    name: 'カルバペネム系',
    drugs: [
      { no: 13, id: 'ipm-cs', code: 'IPM/CS', expansion: 'imipenem / cilastatin', generic: 'イミペネム／シラスタチン', product: 'チエナム点滴静注用', form: '注射薬', appearance: '白色〜淡黄色の粉末が入ったバイアル', coverage: ['○', '△', '○', '○'], note: '緑膿菌・嫌気性菌を含む広域薬。MRSAは通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139501D2105_1?user=1' },
      { no: 14, id: 'mepm', code: 'MEPM', expansion: 'meropenem', generic: 'メロペネム', product: 'メロペン点滴用／点滴用キット', form: '注射薬', appearance: '白色〜淡黄色の粉末バイアル、または溶解液付きキット', coverage: ['○', '△', '△', '○'], note: '緑膿菌・嫌気性菌を含む広域薬。MRSAは通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139400D1033_2?user=1' },
      { no: 15, id: 'bipm', code: 'BIPM', expansion: 'biapenem', generic: 'ビアペネム', product: 'オメガシン点滴用', form: '注射薬', appearance: '白色〜淡黄色の粉末が入ったバイアル', coverage: ['○', '△', '△', '○'], note: '緑膿菌・嫌気性菌を含む広域薬。MRSAは通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139401D1020_2?user=1' },
      { no: 16, id: 'drpm', code: 'DRPM', expansion: 'doripenem', generic: 'ドリペネム', product: 'フィニバックス点滴静注用', form: '注射薬', appearance: '白色〜微黄白色の粉末が入ったバイアル', coverage: ['○', '△', '△', '○'], note: '緑膿菌・嫌気性菌を含む広域薬。MRSAは通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139402D1032_1?user=1' },
      { no: 17, id: 'tbpm-pi', code: 'TBPM-PI', expansion: 'tebipenem pivoxil', generic: 'テビペネム ピボキシル', product: 'オラペネム小児用細粒', form: '内服薬', appearance: '淡黄色〜淡赤色の細粒', coverage: ['○', '△', '△', '○'], note: '小児用の経口薬。緑膿菌は通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139002C1026_1?user=1' },
    ],
  },
  {
    name: 'アミノグリコシド系',
    drugs: [
      { no: 18, id: 'amk', code: 'AMK', expansion: 'amikacin', generic: 'アミカシン', product: 'ビクリン注射液', form: '注射薬', appearance: '無色〜微黄色澄明の液が入ったアンプル', coverage: ['△', '—', '—', '○'], note: '好気性グラム陰性桿菌・緑膿菌が中心。嫌気性菌には効かない。', source: 'https://www.pmda.go.jp/PmdaSearch/iyakuSearch/' },
      { no: 19, id: 'abk', code: 'ABK', expansion: 'arbekacin', generic: 'アルベカシン', product: 'ハベカシン注射液', form: '注射薬', appearance: '無色澄明の液が入ったアンプル', coverage: ['○', '—', '—', '△'], note: '主な位置づけはMRSA治療薬。嫌気性菌には効かない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6119400A1069_1?user=1' },
      { no: 20, id: 'gm', code: 'GM', expansion: 'gentamicin', generic: 'ゲンタマイシン', product: 'ゲンタシン注', form: '注射薬', appearance: '無色澄明の液が入ったアンプル', coverage: ['△', '—', '—', '○'], note: '好気性グラム陰性桿菌が中心。状況により他剤と併用する。嫌気性菌には効かない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6134407A1024_2?user=1' },
    ],
  },
  {
    name: 'マクロライド・リンコマイシン・テトラサイクリン・グリコペプチド系',
    drugs: [
      { no: 21, id: 'azm', code: 'AZM', expansion: 'azithromycin', generic: 'アジスロマイシン', product: 'ジスロマック錠／細粒／点滴静注用', form: '内服・注射', appearance: '白色錠、白色〜微黄白色の細粒、または粉末バイアル', coverage: ['○', '○', '○', '△'], note: 'マイコプラズマなど非定型病原体も対象。耐性状況による差が大きい。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6149004F1028_3?user=1' },
      { no: 22, id: 'cldm', code: 'CLDM', expansion: 'clindamycin', generic: 'クリンダマイシン', product: 'ダラシンS注射液／カプセル', form: '内服・注射', appearance: '無色〜微黄色澄明の注射液、または白色カプセル', coverage: ['○', '—', '○', '—'], note: 'グラム陽性菌と一部の嫌気性菌が中心。好気性グラム陰性桿菌は対象外。', source: 'https://www.info.pmda.go.jp/downfiles/guide/ph/672212_6112401A1100_3_00G.pdf' },
      { no: 23, id: 'mino', code: 'MINO', expansion: 'minocycline', generic: 'ミノサイクリン', product: 'ミノマイシンカプセル／ミノサイクリン塩酸塩点滴静注用', form: '内服・注射', appearance: 'カプセル、または黄色〜黄褐色の粉末バイアル', coverage: ['○', '△', '○', '△'], note: 'MRSA、Stenotrophomonas、Acinetobacterなどで候補になることがある。緑膿菌は対象外。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6152401F1090_2?user=1' },
      { no: 24, id: 'vcm', code: 'VCM', expansion: 'vancomycin', generic: 'バンコマイシン', product: 'バンコマイシン塩酸塩点滴静注用「明治」', form: '注射薬', appearance: '白色の粉末が入ったバイアル', coverage: ['○', '—', '○', '—'], note: 'グラム陽性菌専用でMRSAも対象。内服用と注射用では主な使用目的が異なる。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6113400A1219_1?user=1' },
    ],
  },
  {
    name: 'その他の抗菌薬',
    drugs: [
      { no: 25, id: 'fom', code: 'FOM', expansion: 'fosfomycin', generic: 'ホスホマイシン', product: 'ホスミシンS静注用／ホスミシン錠・ドライシロップ', form: '内服・注射', appearance: '白色粉末のバイアル、白色錠、または白色のドライシロップ', coverage: ['△', '—', '△', '○'], note: '腸内細菌目などが対象。一部の菌種・耐性菌で使うため、感受性確認が重要。', source: 'https://www.pmda.go.jp/PmdaSearch/bookSearch/01/04987222732239' },
      { no: 26, id: 'lzd', code: 'LZD', expansion: 'linezolid', generic: 'リネゾリド', product: 'ザイボックス錠／注射液', form: '内服・注射', appearance: '白色錠、または無色〜淡黄色澄明の点滴バッグ', coverage: ['○', '—', '○', '—'], note: 'グラム陽性菌専用で、MRSA・VREも対象になりうる。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6249002F1024_5?user=1' },
      { no: 27, id: 'cpfx', code: 'CPFX', expansion: 'ciprofloxacin', generic: 'シプロフロキサシン', product: 'シプロキサン錠／注', form: '内服・注射', appearance: '白色〜微黄色錠、または無色〜微黄色澄明の点滴バッグ', coverage: ['△', '○', '△', '○'], note: 'グラム陰性桿菌・緑膿菌が得意。肺炎球菌への活性は弱め。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6241008F1023_1?user=1' },
      { no: 28, id: 'lvfx', code: 'LVFX', expansion: 'levofloxacin', generic: 'レボフロキサシン', product: 'クラビット錠／点滴静注バッグ', form: '内服・注射', appearance: '淡黄白色〜黄白色錠、または淡黄色澄明の点滴バッグ', coverage: ['○', '○', '△', '○'], note: '呼吸器病原菌や非定型病原体も対象。緑膿菌の感受性は菌株差が大きい。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6241013C2024_1' },
      { no: 29, id: 'grnx', code: 'GRNX', expansion: 'garenoxacin', generic: 'ガレノキサシン', product: 'ジェニナック錠', form: '内服薬', appearance: '淡橙色のフィルムコーティング錠', coverage: ['○', '○', '△', '△'], note: '呼吸器病原菌や非定型病原体が中心。緑膿菌は通常カバーしない。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6241017F1022_2?user=1' },
      { no: 30, id: 'st', code: 'ST', expansion: 'sulfamethoxazole / trimethoprim', generic: 'スルファメトキサゾール／トリメトプリム', product: 'バクタ配合錠／配合顆粒', form: '内服薬', appearance: '白色錠、または白色〜微黄白色の顆粒', coverage: ['○', '△', '○', '○'], note: 'MRSA、Nocardia、Stenotrophomonasなども対象になりうる。緑膿菌・嫌気性菌は対象外。', source: 'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6290100D1088_2?user=1' },
    ],
  },
];

const drugs = drugFamilies.flatMap((family) => family.drugs).sort((a, b) => a.no - b.no);
const coverageHeads = ['GPC\n陽性球菌', 'GNC\n陰性球菌', 'GPR\n陽性桿菌', 'GNR\n陰性桿菌'];
export default function DrugAbbreviations() {
  return (
    <StudyPage title="抗菌薬の略称・製品名・抗菌スペクトル">
      <p className="lead">検査結果の短い英字から、<br />名前・製品・効く菌の目安までつなげます。</p>

      <SpectrumOverview drugs={drugs} />

      <section className="study-section">
        <h2>まず、名前のつながり</h2>
        <div className="name-route" aria-label="略称から製品名までの見方">
          <div><small>検査結果の表記</small><strong>略称</strong></div><span aria-hidden="true">→</span>
          <div><small>有効成分</small><strong>一般名</strong></div><span aria-hidden="true">→</span>
          <div><small>病棟で見る名前</small><strong>製品名</strong></div>
        </div>
        <p className="small-note">例：CEZ = cefazolin → セファゾリン → セファメジンα。製品名は代表例で、施設の採用品や後発品では名前が変わります。</p>
      </section>

      <section className="study-section">
        <h2>30剤からすぐ探す</h2>
        <nav className="drug-jump-list" aria-label="抗菌薬の略称一覧">
          {drugs.map((drug) => <a href={`#drug-${drug.id}`} key={drug.id}><small>{drug.no}</small>{drug.code}</a>)}
        </nav>
      </section>

      <section className="study-section">
        <h2>略称・製品・効く範囲の目安</h2>
        <div className="drug-family-list">
          {drugFamilies.map((family) => (
            <section className="drug-family" key={family.name}>
              <h3>{family.name}</h3>
              <div className="drug-detail-list">
                {family.drugs.map((drug) => (
                  <article className="drug-detail-card" id={`drug-${drug.id}`} key={drug.id}>
                    <header className="drug-detail-heading"><span className="drug-number">{drug.no}</span><div><b className="drug-code">{drug.code}</b><small>{drug.expansion}</small></div></header>
                    <div className="drug-generic"><small>正式な一般名</small><strong>{drug.generic}</strong></div>
                    <div className="drug-product-detail">
                      <div><small>代表的な製品名</small><strong>{drug.product}</strong></div>
                      <p><span>{drug.form}</span>{drug.appearance}</p>
                      <a href={drug.source} target="_blank" rel="noreferrer">PMDAで製品情報を確認 ↗</a>
                    </div>
                    <div className="drug-coverage" aria-label={`${drug.code}の大まかな抗菌スペクトル`}>
                      {coverageHeads.map((head, index) => <div key={head}><small>{head.split('\n').map((line) => <span key={line}>{line}</span>)}</small><b>{drug.coverage[index]}</b></div>)}
                    </div>
                    <p className="drug-note"><b>ポイント</b>{drug.note}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <aside className="takeaway"><h2>見た目は「照合の補助」まで</h2><p>同じ成分でも、メーカー・規格・剤形で外観が変わります。実際に扱うときは、処方、薬袋、ラベルの一般名・含量・剤形を照合してください。</p></aside>
      <details className="recall"><summary>確認：写真の20番「GM」は何の略？</summary><p><strong>gentamicin（ゲンタマイシン）。代表的な製品名はゲンタシンです。</strong></p></details>

      <section className="study-sources public-sources">
        <h2>出典・確認先</h2>
        <a href="https://www.chemotherapy.or.jp/uploads/files/publications/glossary_jjs_ryakugo.pdf" target="_blank" rel="noreferrer">日本化学療法学会「抗微生物薬略語一覧表」</a>
        <a href="https://www.chemotherapy.or.jp/uploads/files/guideline/kobiseibutuyaku_guidance_2024.pdf" target="_blank" rel="noreferrer">日本化学療法学会「抗微生物薬適正使用の手引き」</a>
        <a href="https://www.mhlw.go.jp/content/10906000/001575316.pdf" target="_blank" rel="noreferrer">厚生労働省「抗微生物薬適正使用の手引き 第四版」</a>
        <a href="https://www.pmda.go.jp/PmdaSearch/iyakuSearch/" target="_blank" rel="noreferrer">PMDA 医療用医薬品 情報検索</a>
        <p>略称・一般名・代表的な製品情報は、上記資料と各カードのPMDA掲載情報を2026年9月6日に確認しました。スペクトルは学習用の大まかな整理です。</p>
      </section>
      <p className="study-disclaimer">このページは名称と抗菌スペクトルの概略を学ぶ資料です。個別患者の薬剤選択、調製、投与量、投与方法の判断には使用できません。</p>
    </StudyPage>
  );
}
