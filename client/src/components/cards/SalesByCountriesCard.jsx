import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalesByCountriesCard.css';

const SalesByCountriesCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard?card=salesByCountries');
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching sales by countries data:', error);
        // 在開發環境中使用預設資料
        const defaultData = {
          title: 'Sales by Countries',
          subtitle: 'Monthly Sales Overview',
          countries: [
            {
              flag: '🇺🇸',
              countryName: 'United states of america',
              salesAmount: '$8,656k',
              changePercentage: 25.8,
              changeDirection: 'up',
              rightValue: '894k'
            },
            {
              flag: '🇧🇷',
              countryName: 'Brazil',
              salesAmount: '$2,415k',
              changePercentage: -6.2,
              changeDirection: 'down',
              rightValue: '645k'
            },
            {
              flag: '🇮🇳',
              countryName: 'India',
              salesAmount: '$865k',
              changePercentage: 12.4,
              changeDirection: 'up',
              rightValue: '148k'
            },
            {
              flag: '🇦🇺',
              countryName: 'Australia',
              salesAmount: '$745k',
              changePercentage: -11.9,
              changeDirection: 'down',
              rightValue: '86k'
            },
            {
              flag: '🇧🇪',
              countryName: 'Belgium',
              salesAmount: '$45k',
              changePercentage: 16.2,
              changeDirection: 'up',
              rightValue: '42k'
            },
            {
              flag: '🇨🇳',
              countryName: 'China',
              salesAmount: '$12k',
              changePercentage: 14.8,
              changeDirection: 'up',
              rightValue: '8k'
            }
          ]
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
      <section className="card card--sales-countries sales-by-countries-card">
        <div className="sales-by-countries-card__loading">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--sales-countries sales-by-countries-card">
        <div className="sales-by-countries-card__error">錯誤: {error}</div>
      </section>
    );
  }

  const {
    title = "Sales by Countries",
    subtitle = "Monthly Sales Overview",
    countries = []
  } = data;

  return (
    <section className="card card--sales-countries sales-by-countries-card">
      <div className="sales-by-countries-card__content">
        {/* 標題區域 */}
        <div className="sales-by-countries-card__header">
          <div className="sales-by-countries-card__title-section">
            <h3 className="sales-by-countries-card__title">{title}</h3>
            <p className="sales-by-countries-card__subtitle">{subtitle}</p>
          </div>
          <div className="sales-by-countries-card__menu">
            <span className="sales-by-countries-card__menu-icon">⋮</span>
          </div>
        </div>

        {/* 國家列表 */}
        <div className="sales-by-countries-card__countries-list">
          {countries.map((country, index) => (
            <div key={`country-${country.countryName}-${index}`} className="sales-by-countries-card__country-item">
              <div className="sales-by-countries-card__country-info">
                <div className="sales-by-countries-card__flag">{country.flag}</div>
                <div className="sales-by-countries-card__country-details">
                  <div className="sales-by-countries-card__sales-row">
                    <span className="sales-by-countries-card__sales-amount">{country.salesAmount}</span>
                    <div className={`sales-by-countries-card__change ${country.changeDirection}`}>
                      <span className="sales-by-countries-card__change-icon">
                        {country.changeDirection === 'up' ? '▲' : '▼'}
                      </span>
                      <span className="sales-by-countries-card__change-percentage">
                        {country.changeDirection === 'up' ? '+' : ''}{country.changePercentage}%
                      </span>
                    </div>
                  </div>
                  <div className="sales-by-countries-card__country-name">{country.countryName}</div>
                </div>
              </div>
              <div className="sales-by-countries-card__right-value">{country.rightValue}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesByCountriesCard;
