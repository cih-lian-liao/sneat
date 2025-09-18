// client/src/components/TestCard.jsx
import React from 'react';

export default function TestCard() {
  console.log('TestCard rendering...');
  
  return (
    <section className="card">
      <header className="card__header">Test Card</header>
      <div className="card__content">
        <p>這是一個測試卡片</p>
        <p>如果這個卡片能正常顯示，說明基本渲染沒問題</p>
        <div>測試數據: {JSON.stringify({ test: 'data' })}</div>
      </div>
    </section>
  );
}
