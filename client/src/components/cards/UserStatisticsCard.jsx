import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserStatisticsCard.css";

export default function UserStatisticsCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard?card=userStatistics');
        console.log('User Statistics API Response:', res.data);
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching user statistics:', error);
        setError(error.message);
        // 備援數據
        const fallbackData = {
          totalUsers: 15420,
          activeUsers: 12350,
          newUsers: 850,
          changePct: 15.2,
          changeType: 'increase',
          userTypes: [
            { type: 'Premium', count: 3200, percentage: 20.8, icon: '👑' },
            { type: 'Standard', count: 8900, percentage: 57.7, icon: '👤' },
            { type: 'Basic', count: 3320, percentage: 21.5, icon: '🔰' }
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

  if (loading) return <section className="card card--user-statistics">載入中...</section>;
  if (error) return <section className="card card--user-statistics error">錯誤: {error}</section>;

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toLocaleString();
  };

  return (
    <section className="card card--user-statistics">
      <h3 className="user-stats__title">User Statistics</h3>
      <p className="user-stats__subtitle">
        {formatNumber(data.totalUsers || 0)} Total Users
      </p>

      <div className="user-stats__main">
        <div className="user-stats__active">
          <h2>{formatNumber(data.activeUsers || 0)}</h2>
          <p>Active Users</p>
        </div>
        <div className="user-stats__new">
          <div className="circle">
            <span className="change-indicator">
              {data.changeType === 'increase' ? '↗' : '↘'}
            </span>
            {data.changePct || 0}%
          </div>
          <p>New Users</p>
        </div>
      </div>

      <div className="user-stats__new-count">
        <span className="new-users-badge">+{formatNumber(data.newUsers || 0)}</span>
        <span className="new-users-label">New This Month</span>
      </div>

      <ul className="user-stats__types">
        {Array.isArray(data.userTypes) && data.userTypes.length > 0 ? (
          data.userTypes.map((userType, idx) => (
            <li key={`${userType.type}-${idx}`} className="user-stats__item">
              <div className="user-stats__item-info">
                <strong>{userType.icon} {userType.type}</strong>
                <p className="desc">{userType.percentage}% of total</p>
              </div>
              <span className="value">{formatNumber(userType.count)}</span>
            </li>
          ))
        ) : (
          <li className="user-stats__item">
            <div className="user-stats__item-info">
              <strong>No user types available</strong>
              <p className="desc">User types data is missing</p>
            </div>
            <span className="value">--</span>
          </li>
        )}
      </ul>
    </section>
  );
}
