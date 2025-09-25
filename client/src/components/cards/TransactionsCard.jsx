import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TransactionsCard.css";

export default function TransactionsCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard?card=transactions');
        console.log('Transactions API Response:', res.data);
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching transactions data:', error);
        setError(error.message);
        // 備援數據
        const fallbackData = {
          title: 'Transactions',
          items: [
            {
              id: '1',
              type: 'Paypal',
              description: 'Send money',
              amount: 82.6,
              currency: 'USD',
              icon: 'P',
              iconColor: '#ff6b35',
              isPositive: true,
              date: new Date('2024-01-15')
            },
            {
              id: '2',
              type: 'Wallet',
              description: 'Mac\'D',
              amount: 270.69,
              currency: 'USD',
              icon: '💳',
              iconColor: '#8b5cf6',
              isPositive: true,
              date: new Date('2024-01-14')
            },
            {
              id: '3',
              type: 'Transfer',
              description: 'Refund',
              amount: 637.91,
              currency: 'USD',
              icon: '↻',
              iconColor: '#06b6d4',
              isPositive: true,
              date: new Date('2024-01-13')
            },
            {
              id: '4',
              type: 'Credit Card',
              description: 'Ordered Food',
              amount: 838.71,
              currency: 'USD',
              icon: '💳',
              iconColor: '#10b981',
              isPositive: false,
              date: new Date('2024-01-12')
            },
            {
              id: '5',
              type: 'Wallet',
              description: 'Starbucks',
              amount: 203.33,
              currency: 'USD',
              icon: '💳',
              iconColor: '#8b5cf6',
              isPositive: true,
              date: new Date('2024-01-11')
            },
            {
              id: '6',
              type: 'Mastercard',
              description: 'Ordered Food',
              amount: 92.45,
              currency: 'USD',
              icon: '💳',
              iconColor: '#f59e0b',
              isPositive: false,
              date: new Date('2024-01-10')
            }
          ]
        };
        console.log('Using fallback data:', fallbackData);
        setData(fallbackData);
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="card card--transactions">載入中...</section>;
  if (error) return <section className="card card--transactions error">錯誤: {error}</section>;

  const formatAmount = (amount, isPositive) => {
    const sign = isPositive ? '+' : '-';
    return `${sign}${amount.toFixed(2)}`;
  };

  return (
    <section className="card card--transactions">
      {/* 標題和選項按鈕 */}
      <div className="transactions__header">
        <h3 className="transactions__title">{data.title || 'Transactions'}</h3>
        <button className="transactions__options" aria-label="More options">
          <span className="options-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* 交易列表 */}
      <div className="transactions__list">
        {Array.isArray(data.items) && data.items.length > 0 ? (
          data.items.map((item) => (
            <div key={item.id} className="transaction__item">
              {/* 左側圖標和文字 */}
              <div className="transaction__left">
                <div 
                  className="transaction__icon"
                  style={{ backgroundColor: item.iconColor }}
                >
                  <span className="icon-symbol">{item.icon}</span>
                </div>
                <div className="transaction__text">
                  <div className="transaction__type">{item.type}</div>
                  <div className="transaction__description">{item.description}</div>
                </div>
              </div>

              {/* 右側金額 */}
              <div className="transaction__right">
                <div 
                  className={`transaction__amount ${item.isPositive ? 'positive' : 'negative'}`}
                >
                  {formatAmount(item.amount, item.isPositive)}
                </div>
                <div className="transaction__currency">{item.currency}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="transaction__item">
            <div className="transaction__left">
              <div className="transaction__icon" style={{ backgroundColor: '#e5e7eb' }}>
                <span className="icon-symbol">📄</span>
              </div>
              <div className="transaction__text">
                <div className="transaction__type">No transactions</div>
                <div className="transaction__description">No transaction data available</div>
              </div>
            </div>
            <div className="transaction__right">
              <div className="transaction__amount">--</div>
              <div className="transaction__currency">--</div>
            </div>
          </div>
        )}
      </div>

      
    </section>
  );
}
