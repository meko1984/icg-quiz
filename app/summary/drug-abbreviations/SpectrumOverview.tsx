'use client';

import { useRef } from 'react';

type Coverage = '○' | '△' | '—';

type SpectrumDrug = {
  no: number;
  code: string;
  generic: string;
  coverage: readonly [Coverage, Coverage, Coverage, Coverage];
};

const columns = [
  { code: 'GPC', label: '陽性球菌' },
  { code: 'GPR', label: '陽性桿菌' },
  { code: 'GNC', label: '陰性球菌' },
  { code: 'GNR', label: '陰性桿菌' },
] as const;

const coverageIndex = [0, 2, 1, 3] as const;

function SpectrumTable({ drugs, expanded = false }: { drugs: readonly SpectrumDrug[]; expanded?: boolean }) {
  return (
    <div className={`spectrum-table-scroll${expanded ? ' is-expanded' : ''}`}>
      <table className="spectrum-overview-table">
        <thead>
          <tr>
            <th className="spectrum-drug-head" scope="col">薬剤</th>
            <th className="spectrum-gram-group" colSpan={2} scope="colgroup">グラム陽性</th>
            <th className="spectrum-gram-group" colSpan={2} scope="colgroup">グラム陰性</th>
          </tr>
          <tr>
            <th className="spectrum-drug-head spectrum-second-head" scope="col">略称・一般名</th>
            {columns.map((column) => <th scope="col" key={column.code}><b>{column.code}</b><small>{column.label}</small></th>)}
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug.code}>
              <th scope="row"><span>{drug.no}</span><div><b>{drug.code}</b><small>{drug.generic}</small></div></th>
              {coverageIndex.map((index) => {
                const value = drug.coverage[index];
                return <td className={`spectrum-cell spectrum-${value === '○' ? 'strong' : value === '△' ? 'partial' : 'none'}`} key={index}><span>{value}</span></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SpectrumOverview({ drugs }: { drugs: readonly SpectrumDrug[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  return (
    <section className="spectrum-overview" aria-labelledby="spectrum-overview-title">
      <div className="spectrum-overview-heading">
        <div>
          <p>30剤を同じ尺度で比較</p>
          <h2 id="spectrum-overview-title">抗菌スペクトラム早見表</h2>
        </div>
        <button type="button" className="spectrum-expand-button" onClick={openDialog} aria-haspopup="dialog">↗ 表を拡大</button>
      </div>

      <div className="spectrum-key" aria-label="表の記号">
        <span><b>○</b>比較的よく対象</span>
        <span><b>△</b>一部・菌種差あり</span>
        <span><b>—</b>主な対象外</span>
      </div>

      <SpectrumTable drugs={drugs} />
      <p className="spectrum-swipe-note">横に動かすと、すべての菌群を確認できます。</p>
      <aside className="spectrum-warning">
        <strong>○は「この患者の菌が感受性あり（S）」という意味ではありません。</strong>
        <p>同じ分類でも菌種・菌株・耐性機序で変わります。最終的には菌名と培養結果のS・I・R、施設のアンチバイオグラムで確認します。</p>
      </aside>

      <dialog
        className="spectrum-dialog"
        ref={dialogRef}
        aria-labelledby="spectrum-dialog-title"
        onClick={(event) => { if (event.target === event.currentTarget) closeDialog(); }}
      >
        <div className="spectrum-dialog-panel">
          <header>
            <div><small>30剤を同じ尺度で比較</small><h2 id="spectrum-dialog-title">抗菌スペクトラム早見表</h2></div>
            <button type="button" onClick={closeDialog} aria-label="拡大表示を閉じる">×</button>
          </header>
          <div className="spectrum-key" aria-label="表の記号">
            <span><b>○</b>比較的よく対象</span>
            <span><b>△</b>一部・菌種差あり</span>
            <span><b>—</b>主な対象外</span>
          </div>
          <SpectrumTable drugs={drugs} expanded />
        </div>
      </dialog>
    </section>
  );
}
