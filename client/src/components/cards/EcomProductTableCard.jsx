import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EcomProductTableCard.css';

const EcomProductTableCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard?card=ecomProductTable');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch ecommerce product table data:', err);
        setError(err.message);
        // 使用預設數據
        setData({
          title: 'Product / Category / Payment / Order Status',
          products: [
            {
              id: 1,
              name: 'OnePlus 7Pro',
              brand: 'OnePlus',
              image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=60&h=60&fit=crop',
              category: {
                name: 'Smart Phone',
                icon: '📱',
                color: '#8b5cf6'
              },
              payment: {
                paid: 120,
                total: 499,
                status: 'Partially Paid'
              },
              orderStatus: {
                status: 'CONFIRMED',
                color: '#8b5cf6',
                bgColor: '#f3f0ff'
              }
            },
            {
              id: 2,
              name: 'Magic Mouse',
              brand: 'Apple',
              image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=60&h=60&fit=crop',
              category: {
                name: 'Mouse',
                icon: '🖱️',
                color: '#f59e0b'
              },
              payment: {
                paid: 149,
                total: 149,
                status: 'Fully Paid'
              },
              orderStatus: {
                status: 'COMPLETED',
                color: '#10b981',
                bgColor: '#ecfdf5'
              }
            },
            {
              id: 3,
              name: 'iMac Pro',
              brand: 'Apple',
              image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=60&h=60&fit=crop',
              category: {
                name: 'Computer',
                icon: '💻',
                color: '#06b6d4'
              },
              payment: {
                paid: 0,
                total: 2599,
                status: 'Unpaid'
              },
              orderStatus: {
                status: 'CANCELLED',
                color: '#ef4444',
                bgColor: '#fef2f2'
              }
            },
            {
              id: 4,
              name: 'Note 10',
              brand: 'Samsung',
              image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=60&h=60&fit=crop',
              category: {
                name: 'Smart Phone',
                icon: '📱',
                color: '#8b5cf6'
              },
              payment: {
                paid: 899,
                total: 899,
                status: 'Fully Paid'
              },
              orderStatus: {
                status: 'COMPLETED',
                color: '#10b981',
                bgColor: '#ecfdf5'
              }
            },
            {
              id: 5,
              name: 'iPhone 11 Pro',
              brand: 'Apple',
              image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=60&h=60&fit=crop',
              category: {
                name: 'Smart Phone',
                icon: '📱',
                color: '#8b5cf6'
              },
              payment: {
                paid: 0,
                total: 999,
                status: 'Unpaid'
              },
              orderStatus: {
                status: 'CANCELLED',
                color: '#ef4444',
                bgColor: '#fef2f2'
              }
            },
            {
              id: 6,
              name: 'Mi Led TV 4X',
              brand: 'Xiaomi',
              image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=60&h=60&fit=crop',
              category: {
                name: 'Smart TV',
                icon: '📺',
                color: '#ef4444'
              },
              payment: {
                paid: 299,
                total: 599,
                status: 'Partially Paid'
              },
              orderStatus: {
                status: 'CONFIRMED',
                color: '#8b5cf6',
                bgColor: '#f3f0ff'
              }
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return `$${amount}`;
  };

  if (loading) {
    return (
      <section className="card card--ecom-product-table ecom-product-table-card">
        <div className="ecom-product-table-card__loading">載入中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--ecom-product-table ecom-product-table-card">
        <div className="ecom-product-table-card__error">載入失敗: {error}</div>
      </section>
    );
  }

  return (
    <section className="card card--ecom-product-table ecom-product-table-card">
      <div className="ecom-product-table-card__content">
        <h3 className="ecom-product-table-card__title">{data.title}</h3>
        
        <div className="ecom-product-table-card__table">
          <div className="ecom-product-table-card__header">
            <div className="ecom-product-table-card__header-cell ecom-product-table-card__header-cell--product">PRODUCT</div>
            <div className="ecom-product-table-card__header-cell ecom-product-table-card__header-cell--category">CATEGORY</div>
            <div className="ecom-product-table-card__header-cell ecom-product-table-card__header-cell--payment">PAYMENT</div>
            <div className="ecom-product-table-card__header-cell ecom-product-table-card__header-cell--status">ORDER STATUS</div>
            <div className="ecom-product-table-card__header-cell ecom-product-table-card__header-cell--actions">ACTIONS</div>
          </div>

          <div className="ecom-product-table-card__body">
            {data.products.map((product) => (
              <div key={product.id} className="ecom-product-table-card__row">
                <div className="ecom-product-table-card__cell ecom-product-table-card__cell--product">
                  <div className="ecom-product-table-card__product-info">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="ecom-product-table-card__product-image"
                    />
                    <div className="ecom-product-table-card__product-details">
                      <div className="ecom-product-table-card__product-name">{product.name}</div>
                      <div className="ecom-product-table-card__product-brand">{product.brand}</div>
                    </div>
                  </div>
                </div>

                <div className="ecom-product-table-card__cell ecom-product-table-card__cell--category">
                  <div className="ecom-product-table-card__category-info">
                    <div 
                      className="ecom-product-table-card__category-icon"
                      style={{ 
                        backgroundColor: `${product.category.color}20`,
                        borderColor: product.category.color,
                        color: product.category.color
                      }}
                    >
                      {product.category.icon}
                    </div>
                    <span className="ecom-product-table-card__category-name">{product.category.name}</span>
                  </div>
                </div>

                <div className="ecom-product-table-card__cell ecom-product-table-card__cell--payment">
                  <div className="ecom-product-table-card__payment-info">
                    <div className="ecom-product-table-card__payment-amount">
                      <span className="ecom-product-table-card__paid-amount">
                        {formatCurrency(product.payment.paid)}
                      </span>
                      {product.payment.paid < product.payment.total && (
                        <span className="ecom-product-table-card__total-amount">
                          /{formatCurrency(product.payment.total)}
                        </span>
                      )}
                    </div>
                    <div className="ecom-product-table-card__payment-status">
                      {product.payment.status}
                    </div>
                  </div>
                </div>

                <div className="ecom-product-table-card__cell ecom-product-table-card__cell--status">
                  <div 
                    className="ecom-product-table-card__status-badge"
                    style={{
                      backgroundColor: product.orderStatus.bgColor,
                      color: product.orderStatus.color
                    }}
                  >
                    {product.orderStatus.status}
                  </div>
                </div>

                <div className="ecom-product-table-card__cell ecom-product-table-card__cell--actions">
                  <div className="ecom-product-table-card__actions">
                    <span className="ecom-product-table-card__actions-icon">⋮</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcomProductTableCard;
