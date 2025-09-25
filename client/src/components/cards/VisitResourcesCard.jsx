import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VisitResourcesCard.css";

export default function VisitResourcesCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('browser');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard?card=visitResources');
        setData(res.data || {});
        setActiveTab(res.data?.activeTab || 'browser');
        setError('');
      } catch (error) {
        console.error('Error fetching visit resources data:', error);
        setError(error.message);
        // Fallback data
        const fallbackData = {
          title: 'Visit & Sources',
          activeTab: 'browser',
          tabs: [
            { id: 'browser', name: 'BROWSER' },
            { id: 'operatingSystem', name: 'OPERATING SYSTEM' },
            { id: 'country', name: 'COUNTRY' }
          ],
          browserData: [
            {
              no: 1,
              name: 'Chrome',
              icon: '🌐',
              visits: 8920,
              percentage: 64.91,
              progressBarColor: '#4CAF50'
            },
            {
              no: 2,
              name: 'Safari',
              icon: '🧭',
              visits: 1290,
              percentage: 19.03,
              progressBarColor: '#2196F3'
            },
            {
              no: 3,
              name: 'Firefox',
              icon: '🦊',
              visits: 328,
              percentage: 3.26,
              progressBarColor: '#03A9F4'
            },
            {
              no: 4,
              name: 'Edge',
              icon: '🌊',
              visits: 142,
              percentage: 3.99,
              progressBarColor: '#FF9800'
            },
            {
              no: 5,
              name: 'Opera',
              icon: '🎭',
              visits: 85,
              percentage: 2.12,
              progressBarColor: '#F44336'
            },
            {
              no: 6,
              name: 'Brave',
              icon: '🦁',
              visits: 36,
              percentage: 1.06,
              progressBarColor: '#0EA5E9'
            }
          ],
          operatingSystemData: [
            {
              no: 1,
              name: 'Windows',
              icon: '🪟',
              visits: 475260,
              percentage: 61.5,
              progressBarColor: '#4CAF50'
            },
            {
              no: 2,
              name: 'Mac',
              icon: '🍎',
              visits: 89120,
              percentage: 15.67,
              progressBarColor: '#8B5CF6'
            },
            {
              no: 3,
              name: 'Ubuntu',
              icon: '🐧',
              visits: 38680,
              percentage: 5.82,
              progressBarColor: '#06B6D4'
            },
            {
              no: 4,
              name: 'Linux',
              icon: '🐧',
              visits: 30270,
              percentage: 5.03,
              progressBarColor: '#F59E0B'
            },
            {
              no: 5,
              name: 'Chrome',
              icon: '🌐',
              visits: 8340,
              percentage: 3.25,
              progressBarColor: '#EF4444'
            },
            {
              no: 6,
              name: 'Cent',
              icon: '🌸',
              visits: 2250,
              percentage: 1.76,
              progressBarColor: '#0EA5E9'
            }
          ],
          countryData: [
            {
              no: 1,
              name: 'USA',
              flagUrl: 'https://flagcdn.com/w40/us.png',
              visits: 87240,
              percentage: 38.12,
              progressBarColor: '#4CAF50'
            },
            {
              no: 2,
              name: 'Brazil',
              flagUrl: 'https://flagcdn.com/w40/br.png',
              visits: 42690,
              percentage: 28.23,
              progressBarColor: '#8B5CF6'
            },
            {
              no: 3,
              name: 'India',
              flagUrl: 'https://flagcdn.com/w40/in.png',
              visits: 12580,
              percentage: 13.82,
              progressBarColor: '#06B6D4'
            },
            {
              no: 4,
              name: 'Australia',
              flagUrl: 'https://flagcdn.com/w40/au.png',
              visits: 4130,
              percentage: 12.72,
              progressBarColor: '#F59E0B'
            },
            {
              no: 5,
              name: 'China',
              flagUrl: 'https://flagcdn.com/w40/cn.png',
              visits: 2210,
              percentage: 7.11,
              progressBarColor: '#EF4444'
            },
            {
              no: 6,
              name: 'France',
              flagUrl: 'https://flagcdn.com/w40/fr.png',
              visits: 1560,
              percentage: 6.59,
              progressBarColor: '#0EA5E9'
            }
          ]
        };
        setData(fallbackData);
        setActiveTab(fallbackData.activeTab);
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="card card--visit-resources">Loading...</section>;
  if (error) return <section className="card card--visit-resources error">錯誤: {error}</section>;

  const formatVisits = (visits) => {
    if (visits >= 1000000) return `${(visits / 1000000).toFixed(1)}M`;
    if (visits >= 1000) return `${(visits / 1000).toFixed(1)}k`;
    return visits.toString();
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'browser':
        return data.browserData || [];
      case 'operatingSystem':
        return data.operatingSystemData || [];
      case 'country':
        return data.countryData || [];
      default:
        return [];
    }
  };

  const getColumnHeader = () => {
    switch (activeTab) {
      case 'browser':
        return 'BROWSER';
      case 'operatingSystem':
        return 'SYSTEM';
      case 'country':
        return 'COUNTRY';
      default:
        return 'ITEM';
    }
  };

  const currentData = getCurrentData();
  const columnHeader = getColumnHeader();

  return (
    <section className="card card--visit-resources">
      <div className="visit-resources__header">
        <h3 className="visit-resources__title">{data.title || 'Visit & Sources'}</h3>
        <div className="visit-resources__tabs">
          {data.tabs && data.tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="visit-resources__content">
        <div className="visit-resources__table">
          <div className="table-header">
            <div className="header-cell">NO.</div>
            <div className="header-cell">{columnHeader}</div>
            <div className="header-cell">VISITS</div>
            <div className="header-cell">DATA IN PERCENTAGE</div>
          </div>
          
          <div className="table-body">
            {currentData.length > 0 ? (
              currentData.map(item => (
                <div key={`${activeTab}-${item.no}`} className="table-row">
                  <div className="table-cell cell-no">{item.no}</div>
                  <div className="table-cell cell-name">
                    {activeTab === 'country' ? (
                      <div className="name-with-flag">
                        <img 
                          src={item.flagUrl} 
                          alt={`${item.name} flag`} 
                          className="flag-icon"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <span className="name-text">{item.name}</span>
                      </div>
                    ) : (
                      <div className="name-with-icon">
                        <span className="item-icon">{item.icon}</span>
                        <span className="name-text">{item.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="table-cell cell-visits">{formatVisits(item.visits)}</div>
                  <div className="table-cell cell-percentage">
                    <div className="percentage-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${item.percentage}%`,
                            backgroundColor: item.progressBarColor 
                          }}
                        ></div>
                      </div>
                      <span className="percentage-text">{item.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No data available for {activeTab}.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
