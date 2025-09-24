import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SalesAnalyticsCard.css";

export default function SalesAnalyticsCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard?card=salesAnalytics');
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching sales analytics data:', error);
        // 在開發環境中使用預設資料
        const defaultData = {
          title: 'Sales Analytics',
          selectedYear: '2025',
          performanceIndicator: {
            percentage: 42.6,
            label: 'Than last year'
          },
          heatmapData: {
            yAxisLabels: ['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k'],
            xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            data: [
              [0, 0, 0, 0, 0, 0, 0, 0], // 1k
              [0, 1, 0, 0, 0, 0, 0, 0], // 2k
              [0, 0, 1, 0, 0, 0, 0, 0], // 3k
              [0, 0, 0, 0, 0, 0, 0, 0], // 4k
              [0, 0, 0, 1, 1, 0, 0, 0], // 5k
              [0, 0, 0, 0, 0, 1, 0, 0], // 6k
              [0, 0, 0, 0, 0, 0, 1, 1], // 7k
              [0, 0, 0, 0, 0, 0, 0, 0]  // 8k
            ]
          }
        };
        setData(defaultData);
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="card card--sales-analytics sales-analytics-card">
        <div className="sales-analytics-card__loading">載入中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--sales-analytics sales-analytics-card">
        <div className="sales-analytics-card__error">錯誤: {error}</div>
      </section>
    );
  }

  const {
    title = "Sales Analytics",
    performanceIndicator = { percentage: 42.6, label: "Than last year" },
    heatmapData = {
      yAxisLabels: ['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k'],
      xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      data: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    }
  } = data;

  // 生成熱力圖
  const generateHeatmap = () => {
    return heatmapData.data.map((row, rowIndex) => (
      <div key={`heatmap-row-${rowIndex}-${row.join('-')}`} className="sales-analytics-card__heatmap-row">
        {row.map((value, colIndex) => (
          <div
            key={`heatmap-cell-${rowIndex}-${colIndex}`}
            className={`sales-analytics-card__heatmap-cell ${
              value === 1 ? 'sales-analytics-card__heatmap-cell--active' : ''
            }`}
            style={{
              backgroundColor: value === 1 ? '#7c3aed' : '#f3f4f6'
            }}
          />
        ))}
      </div>
    ));
  };

  // 生成 Y 軸標籤
  const generateYAxisLabels = () => {
    return heatmapData.yAxisLabels.map((label, index) => (
      <div key={`y-axis-label-${label}-${index}`} className="sales-analytics-card__y-label">
        {label}
      </div>
    ));
  };

  // 生成 X 軸標籤
  const generateXAxisLabels = () => {
    return heatmapData.xAxisLabels.map((label, index) => (
      <div key={`x-axis-label-${label}`} className="sales-analytics-card__x-label">
        {label}
      </div>
    ));
  };

  return (
    <section className="card card--sales-analytics sales-analytics-card">
      <div className="sales-analytics-card__content">
        {/* 標題區域 */}
        <div className="sales-analytics-card__header">
          <div className="sales-analytics-card__title-section">
            <h3 className="sales-analytics-card__title">{title}</h3>
            <div className="sales-analytics-card__performance">
              <span className="sales-analytics-card__performance-badge">
                +{performanceIndicator.percentage}%
              </span>
              <span className="sales-analytics-card__performance-label">
                {performanceIndicator.label}
              </span>
            </div>
          </div>
          <div className="sales-analytics-card__year-selector">
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="sales-analytics-card__year-select"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        {/* 熱力圖區域 */}
        <div className="sales-analytics-card__chart">
          <div className="sales-analytics-card__heatmap-container">
            {/* Y 軸標籤 */}
            <div className="sales-analytics-card__y-axis">
              {generateYAxisLabels()}
            </div>
            
            {/* 熱力圖 */}
            <div className="sales-analytics-card__heatmap">
              {generateHeatmap()}
            </div>
          </div>
          
          {/* X 軸標籤 */}
          <div className="sales-analytics-card__x-axis">
            {generateXAxisLabels()}
          </div>
        </div>
      </div>
    </section>
  );
}
