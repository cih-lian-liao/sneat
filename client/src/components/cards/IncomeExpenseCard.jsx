import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IncomeExpenseCard.css";

export default function IncomeExpenseCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('income');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard?card=incomeExpense');
        console.log('Income Expense API Response:', res.data);
        setData(res.data || {});
        setActiveTab(res.data?.activeTab || 'income');
        setError('');
      } catch (error) {
        console.error('Error fetching income expense data:', error);
        setError(error.message);
        // 備援數據
        const fallbackData = {
          activeTab: 'income',
          income: {
            total: 459100,
            changePct: 42.9,
            changeType: 'increase',
            thisWeek: 6500,
            lastWeekComparison: '$39k less than last week',
            chartData: [
              { month: 'Jan', value: 320000 },
              { month: 'Feb', value: 380000 },
              { month: 'Mar', value: 350000 },
              { month: 'Apr', value: 420000 },
              { month: 'May', value: 390000 },
              { month: 'Jun', value: 450000 },
              { month: 'Jul', value: 459100 }
            ]
          },
          expenses: {
            total: 285000,
            changePct: 15.2,
            changeType: 'increase',
            thisWeek: 4200,
            lastWeekComparison: '$12k more than last week',
            chartData: [
              { month: 'Jan', value: 250000 },
              { month: 'Feb', value: 270000 },
              { month: 'Mar', value: 260000 },
              { month: 'Apr', value: 280000 },
              { month: 'May', value: 275000 },
              { month: 'Jun', value: 290000 },
              { month: 'Jul', value: 285000 }
            ]
          },
          profit: {
            total: 174100,
            changePct: 28.5,
            changeType: 'increase',
            thisWeek: 2300,
            lastWeekComparison: '$27k less than last week',
            chartData: [
              { month: 'Jan', value: 70000 },
              { month: 'Feb', value: 110000 },
              { month: 'Mar', value: 90000 },
              { month: 'Apr', value: 140000 },
              { month: 'May', value: 115000 },
              { month: 'Jun', value: 160000 },
              { month: 'Jul', value: 174100 }
            ]
          }
        };
        console.log('Using fallback data:', fallbackData);
        setData(fallbackData);
        setActiveTab('income');
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="card card--income-expense">載入中...</section>;
  if (error) return <section className="card card--income-expense error">錯誤: {error}</section>;

  const currentData = data[activeTab] || {};
  const formatValue = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
    return `$${value}`;
  };

  const formatWeekValue = (value) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value.toString();
  };

  // 計算圖表數據
  const chartData = currentData.chartData || [];
  const maxValue = Math.max(...chartData.map(d => d.value));
  const minValue = Math.min(...chartData.map(d => d.value));
  const range = maxValue - minValue;

  // 生成 SVG 路徑
  const generatePath = () => {
    if (chartData.length === 0) return '';
    
    const width = 220;
    const height = 100;
    const padding = 20;
    
    const points = chartData.map((point, index) => {
      const x = padding + (index * (width - 2 * padding)) / (chartData.length - 1);
      const y = height - padding - ((point.value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  // 生成區域路徑
  const generateAreaPath = () => {
    if (chartData.length === 0) return '';
    
    const width = 220;
    const height = 100;
    const padding = 20;
    
    const points = chartData.map((point, index) => {
      const x = padding + (index * (width - 2 * padding)) / (chartData.length - 1);
      const y = height - padding - ((point.value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    const bottomY = height - padding;
    
    return `M ${firstPoint} L ${points.join(' L ')} L ${lastPoint.split(',')[0]},${bottomY} L ${firstPoint.split(',')[0]},${bottomY} Z`;
  };

  return (
    <section className="card card--income-expense">
      {/* 標籤頁 */}
      <div className="income-expense__tabs">
        <button 
          className={`tab ${activeTab === 'income' ? 'active' : ''}`}
          onClick={() => setActiveTab('income')}
        >
          INCOME
        </button>
        <button 
          className={`tab ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          EXPENSES
        </button>
        <button 
          className={`tab ${activeTab === 'profit' ? 'active' : ''}`}
          onClick={() => setActiveTab('profit')}
        >
          PROFIT
        </button>
      </div>

      {/* 主要內容 */}
      <div className="income-expense__content">
        {/* 左側圖標和標題 */}
        <div className="income-expense__header">
          <div className="income-expense__icon">
            <div className="icon-background">
              <span className="icon-symbol">💰</span>
            </div>
          </div>
          <div className="income-expense__title">
            <h3>Total {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
            <div className="income-expense__value">
              {formatValue(currentData.total || 0)}
            </div>
            <div className={`income-expense__change ${currentData.changeType === 'increase' ? 'positive' : 'negative'}`}>
              <span className="arrow">
                {currentData.changeType === 'increase' ? '↑' : '↓'}
              </span>
              <span>{currentData.changePct || 0}%</span>
            </div>
          </div>
        </div>

        {/* 圖表 */}
        <div className="income-expense__chart">
          <svg width="220" height="100" viewBox="0 0 220 100">
            {/* 網格線 */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="2,2"/>
              </pattern>
            </defs>
            <rect width="220" height="100" fill="url(#grid)" />
            
            {/* 區域填充 */}
            <path 
              d={generateAreaPath()} 
              fill="url(#gradient)" 
              opacity="0.3"
            />
            
            {/* 線條 */}
            <path 
              d={generatePath()} 
              fill="none" 
              stroke="#8b5cf6" 
              strokeWidth="2"
            />
            
            {/* 數據點 */}
            {chartData.map((point, index) => {
              const width = 220;
              const height = 100;
              const padding = 20;
              const x = padding + (index * (width - 2 * padding)) / (chartData.length - 1);
              const y = height - padding - ((point.value - minValue) / range) * (height - 2 * padding);
              
              return (
                <circle 
                  key={index}
                  cx={x} 
                  cy={y} 
                  r={index === chartData.length - 1 ? "4" : "2"} 
                  fill={index === chartData.length - 1 ? "#8b5cf6" : "#8b5cf6"}
                  opacity={index === chartData.length - 1 ? "1" : "0.6"}
                />
              );
            })}
            
            {/* 漸變定義 */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
          </svg>
          
          {/* X軸標籤 */}
          <div className="chart-labels">
            {chartData.map((point, index) => (
              <span key={index} className="chart-label">
                {point.month}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 底部統計 */}
      <div className="income-expense__footer">
        <div className="weekly-progress">
          <div className="progress-circle">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="4"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 16}`}
                strokeDashoffset={`${2 * Math.PI * 16 * 0.3}`}
                strokeLinecap="round"
                transform="rotate(-90 20 20)"
              />
            </svg>
            <div className="progress-text">
              {formatWeekValue(currentData.thisWeek || 0)}
            </div>
          </div>
          <div className="weekly-info">
            <div className="weekly-title">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} this week
            </div>
            <div className="weekly-comparison">
              {currentData.lastWeekComparison || ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
