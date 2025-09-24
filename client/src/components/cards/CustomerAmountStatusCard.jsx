import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerAmountStatusCard.css';

const CustomerAmountStatusCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 默認數據
  const defaultData = {
    title: "Customer • Amount • Status",
    customers: [
      {
        id: 1,
        name: "Henry Barnes",
        email: "jok@puc.co.uk",
        avatar: null,
        initials: "HB",
        initialsBgColor: "#e0e7ff",
        initialsTextColor: "#4f46e5",
        amount: 459.65,
        status: "PAID",
        statusColor: "green",
        paidBy: "mastercard"
      },
      {
        id: 2,
        name: "Herman Holland",
        email: "sami@lelo.com",
        avatar: null,
        initials: "HH",
        initialsBgColor: "#fee2e2",
        initialsTextColor: "#ef4444",
        amount: 93.81,
        status: "PENDING",
        statusColor: "orange",
        paidBy: "visa"
      },
      {
        id: 3,
        name: "Hallie Warner",
        email: "initus@odemi.com",
        avatar: null,
        initials: "HW",
        initialsBgColor: "#fef3c7",
        initialsTextColor: "#d97706",
        amount: 934.34,
        status: "PENDING",
        statusColor: "orange",
        paidBy: "visa"
      },
      {
        id: 4,
        name: "John Davidson",
        email: "tum@upkesja.gov",
        avatar: null,
        initials: "JD",
        initialsBgColor: "#e0f2fe",
        initialsTextColor: "#0ea5e9",
        amount: 794.97,
        status: "PAID",
        statusColor: "green",
        paidBy: "paypal"
      },
      {
        id: 5,
        name: "Cora Schmidt",
        email: "wipare@tin.com",
        avatar: null,
        initials: "CS",
        initialsBgColor: "#e5e7eb",
        initialsTextColor: "#6b7280",
        amount: 19.49,
        status: "PAID",
        statusColor: "green",
        paidBy: "mastercard"
      },
      {
        id: 6,
        name: "Betty Ross",
        email: "nur@kaomor.edu",
        avatar: null,
        initials: "BR",
        initialsBgColor: "#fce7f3",
        initialsTextColor: "#be185d",
        amount: 636.27,
        status: "FAILED",
        statusColor: "red",
        paidBy: "paypal"
      }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/dashboard?card=customerAmountStatus');
        
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching customer amount status:', err);
        setError(err.message);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusStyles = (statusColor) => {
    const colorMap = {
      green: { bg: '#dcfce7', text: '#16a34a' },
      orange: { bg: '#fed7aa', text: '#ea580c' },
      red: { bg: '#fecaca', text: '#dc2626' }
    };
    return colorMap[statusColor] || colorMap.green;
  };

  const getPaidByStyles = (paidBy) => {
    const styleMap = {
      mastercard: { bg: '#fee2e2', text: '#dc2626' },
      visa: { bg: '#e0e7ff', text: '#4f46e5' },
      paypal: { bg: '#e0f2fe', text: '#0ea5e9' }
    };
    return styleMap[paidBy] || styleMap.mastercard;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="card card--customer-status customer-amount-status-card">
        <div className="customer-amount-status-card__loading">載入中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card card--customer-status customer-amount-status-card customer-amount-status-card--error">
        <div className="customer-amount-status-card__error">載入失敗: {error}</div>
      </div>
    );
  }

  const cardData = data || defaultData;

  return (
    <div className="card card--customer-status customer-amount-status-card">
      <div className="customer-amount-status-card__content">
        {/* 標題區域 */}
        <div className="customer-amount-status-card__header">
          <h3 className="customer-amount-status-card__title">{cardData.title}</h3>
          <div className="customer-amount-status-card__menu">
            <span>⋯</span>
          </div>
        </div>

        {/* 表格標頭 */}
        <div className="customer-amount-status-card__table-header">
          <div className="customer-amount-status-card__header-customer">CUSTOMER</div>
          <div className="customer-amount-status-card__header-amount">AMOUNT</div>
          <div className="customer-amount-status-card__header-status">STATUS</div>
          <div className="customer-amount-status-card__header-paid-by">PAID BY</div>
          <div className="customer-amount-status-card__header-actions">ACTIONS</div>
        </div>

        {/* 客戶列表 */}
        <div className="customer-amount-status-card__customers-list">
          {cardData.customers.map((customer) => {
            const statusStyles = getStatusStyles(customer.statusColor);
            const paidByStyles = getPaidByStyles(customer.paidBy);
            
            return (
              <div key={customer.id} className="customer-amount-status-card__customer-row">
                {/* 客戶列 */}
                <div className="customer-amount-status-card__customer-info">
                  <div className="customer-amount-status-card__avatar">
                    {customer.avatar ? (
                      <img 
                        src={customer.avatar} 
                        alt={customer.name}
                        className="customer-amount-status-card__avatar-img"
                      />
                    ) : (
                      <div 
                        className="customer-amount-status-card__avatar-initials"
                        style={{
                          backgroundColor: customer.initialsBgColor,
                          color: customer.initialsTextColor
                        }}
                      >
                        {customer.initials}
                      </div>
                    )}
                  </div>
                  <div className="customer-amount-status-card__customer-details">
                    <div className="customer-amount-status-card__customer-name">{customer.name}</div>
                    <div className="customer-amount-status-card__customer-email">{customer.email}</div>
                  </div>
                </div>

                {/* 金額列 */}
                <div className="customer-amount-status-card__amount">
                  {formatCurrency(customer.amount)}
                </div>

                {/* 狀態列 */}
                <div className="customer-amount-status-card__status">
                  <div 
                    className="customer-amount-status-card__status-badge"
                    style={{
                      backgroundColor: statusStyles.bg,
                      color: statusStyles.text
                    }}
                  >
                    {customer.status}
                  </div>
                </div>

                {/* 支付方式列 */}
                <div className="customer-amount-status-card__paid-by">
                  <div 
                    className="customer-amount-status-card__paid-by-badge"
                    style={{
                      backgroundColor: paidByStyles.bg,
                      color: paidByStyles.text
                    }}
                  >
                    {customer.paidBy.toUpperCase()}
                  </div>
                </div>

                {/* 操作列 */}
                <div className="customer-amount-status-card__actions">
                  <button className="customer-amount-status-card__action-btn" aria-label="more">
                    ⋯
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerAmountStatusCard;
