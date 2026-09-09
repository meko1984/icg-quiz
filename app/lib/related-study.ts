import type { SourceQuestion } from './quiz';

export type RelatedStudy = {
  href: string;
  title: string;
  note: string;
};

export function getRelatedStudy(question: SourceQuestion): RelatedStudy | null {
  const { number } = question;

  if (number <= 8) return { href: '/summary/infection-chain/', title: '感染成立の6要素を図で確認する', note: '病原体・病原性・量・伝播経路・侵入門戸・感受性のある宿主をつなげて考えます。' };
  if (number >= 60 && number <= 66) return { href: '/summary/cleaning/#spread', title: '洗浄剤の注意点と、菌を広げない清掃', note: '汚れたクロスや洗浄液を使い続けると、別の場所へ菌を運ぶことがあります。' };
  if (number >= 91 && number <= 100) return { href: '/summary/hepatitis-hiv/', title: '肝炎・HIVの経路とリスクを比較する', note: '感染率と発症率を分け、講義の数値と報告値の条件を確認します。' };
  if (number >= 101 && number <= 109) return { href: '/summary/exposure/', title: '曝露後の対応ステップを図で確認する', note: '洗浄 → 迅速な報告 → 血液検査。必要な予防の評価は検査と並行して進めます。' };
  if (number === 156 || number === 157) return { href: '/summary/miller-jones/', title: 'Miller & Jones分類を図で確認する', note: 'M1〜P3は喀痰の肉眼的な性状の分類です。膿性部分の割合を見ます。' };
  if (number === 140 || number === 131) return { href: '/summary/bacteria-names/', title: '菌名・形態・感染症のつながりを見る', note: '学名の意味と、菌の見え方・代表的な感染症を合わせて整理します。' };

  if (number >= 30 && number <= 38) {
    return {
      href: '/summary/5moments/',
      title: '5momentsを図で確認する',
      note: '手指衛生は「患者を守る前の2場面」と「自分・周囲を守る後の3場面」に分けると整理しやすい。',
    };
  }

  if (number >= 39 && number <= 48) {
    return {
      href: '/summary/disinfection/#spaulding',
      title: 'Spaulding分類を図で確認する',
      note: '器材が触れる場所の感染リスクから、滅菌・高水準消毒・低水準消毒のどれが必要かを決める。',
    };
  }

  if (number >= 49 && number <= 59) {
    return {
      href: number === 52 ? '/summary/disinfection/#glutaral' : '/summary/disinfection/#levels',
      title: '消毒薬の水準・代表薬を見る',
      note: number === 52
        ? 'グルタラールは高水準消毒薬。主に熱に弱い器材の処理に使い、蒸気や皮膚・眼への曝露を防ぐ必要がある。'
        : '高水準にはグルタラール・フタラール・過酢酸があり、低水準には第四級アンモニウム塩などがある。用途と濃度は製品ごとに確認する。',
    };
  }

  if (number >= 114 && number <= 142) {
    return {
      href: '/summary/gram-stain/',
      title: 'グラム染色と代表菌を図で確認する',
      note: 'まず紫かピンクか、次に球菌か桿菌かを見ると、GPC・GNC・GPR・GNRの4群に整理できる。',
    };
  }

  if (number >= 143 && number <= 146) {
    return {
      href: '/summary/antibiotics/',
      title: '抗菌薬の効き方を確認する',
      note: '感受性は「その菌に、その抗菌薬の効果が期待できるか」を判断する情報。菌・薬剤・判定基準をセットで読む。',
    };
  }

  if (number >= 164 && number <= 171) {
    return {
      href: '/summary/resistance/',
      title: '抗菌作用と耐性の仕組みを図で確認する',
      note: '細菌は薬を分解する、標的を変える、薬を入れない・外へ出すなどの方法で抗菌薬に耐性を示す。',
    };
  }

  if (number >= 172 && number <= 181) {
    return {
      href: '/summary/gram-stain/#resistance',
      title: '代表菌と耐性菌の呼び名を確認する',
      note: 'MRSAやVREなどは菌の名前だけでなく、どの抗菌薬に耐性を示すかを含んだ呼び名。',
    };
  }

  if (number >= 182 && number <= 188) {
    return {
      href: '/summary/antibiotics/',
      title: '抗菌薬と耐性の基本を確認する',
      note: 'バイオフィルムや芽胞は、抗菌薬耐性とは別の仕組みで菌を守り、除去や消毒を難しくする。',
    };
  }

  return null;
}
