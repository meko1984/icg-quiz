'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ReturnToQuizNotice() {
  const searchParams = useSearchParams();
  const [closeBlocked, setCloseBlocked] = useState(false);
  if (searchParams.get('from') !== 'quiz') return null;

  function returnToQuiz() {
    window.opener?.focus();
    window.close();
    window.setTimeout(() => setCloseBlocked(true), 250);
  }

  return (
    <aside className="return-to-quiz" aria-label="クイズ画面へ戻る">
      <div>
        <strong>解きかけのクイズは残っています</strong>
        <span>{closeBlocked ? 'このタブを閉じると、元のクイズ画面に戻れます。' : 'このページを閉じれば、同じ問題の続きから再開できます。'}</span>
      </div>
      <button type="button" onClick={returnToQuiz}>クイズ画面へ戻る</button>
    </aside>
  );
}
