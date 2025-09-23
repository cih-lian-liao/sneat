import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ActivityTimelineCard.css";

export default function ActivityTimelineCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard?card=activityTimeline');
        console.log('Activity Timeline API Response:', res.data);
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching activity timeline data:', error);
        setError(error.message);
        // 備援數據
        const fallbackData = {
          title: 'Activity Timeline',
          activities: [
            {
              id: '1',
              title: '12 Invoices have been paid',
              description: 'Invoices have been paid to the company',
              timestamp: '12 min ago',
              dotColor: '#8b5cf6',
              type: 'invoice',
              attachments: [
                {
                  type: 'file',
                  name: 'Invoices.pdf',
                  icon: '📄'
                }
              ]
            },
            {
              id: '2',
              title: 'Client Meeting',
              description: 'Project meeting with john @10:15am',
              timestamp: '45 min ago',
              dotColor: '#f59e0b',
              type: 'meeting',
              attachments: [
                {
                  type: 'avatar',
                  name: 'Steven Nash (Client)',
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                  role: 'CEO of ThemeSelection'
                }
              ]
            },
            {
              id: '3',
              title: 'Create a new project for client',
              description: '5 team members in a project',
              timestamp: '2 days ago',
              dotColor: '#06b6d4',
              type: 'project',
              teamMembers: [
                {
                  name: 'John Doe',
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
                },
                {
                  name: 'Jane Smith',
                  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
                },
                {
                  name: 'Mike Johnson',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
                },
                {
                  name: 'Sarah Wilson',
                  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
                },
                {
                  name: 'David Brown',
                  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
                }
              ]
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

  if (loading) return <section className="card card--timeline">載入中...</section>;
  if (error) return <section className="card card--timeline error">錯誤: {error}</section>;

  return (
    <section className="card card--timeline">
      {/* 標題和選項按鈕 */}
      <div className="timeline__header">
        <h3 className="timeline__title">{data.title || 'Activity Timeline'}</h3>
        <button className="timeline__options" aria-label="More options">
          <span className="options-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* 時間軸內容 */}
      <div className="timeline__content">
        {Array.isArray(data.activities) && data.activities.length > 0 ? (
          data.activities.map((activity, index) => (
            <div key={activity.id} className="timeline__item">
              {/* 時間軸點和線 */}
              <div className="timeline__marker">
                <div 
                  className="timeline__dot"
                  style={{ backgroundColor: activity.dotColor }}
                ></div>
                {index < data.activities.length - 1 && (
                  <div className="timeline__line"></div>
                )}
              </div>

              {/* 活動內容 */}
              <div className="timeline__content-item">
                <div className="timeline__main">
                  <h4 className="timeline__activity-title">{activity.title}</h4>
                  <p className="timeline__activity-description">{activity.description}</p>
                  
                  {/* 附件或團隊成員 */}
                  <div className="timeline__attachments">
                    {activity.attachments && activity.attachments.map((attachment, idx) => (
                      <div key={idx} className="timeline__attachment">
                        {attachment.type === 'file' && (
                          <div className="file-attachment">
                            <span className="file-icon">{attachment.icon}</span>
                            <span className="file-name">{attachment.name}</span>
                          </div>
                        )}
                        {attachment.type === 'avatar' && (
                          <div className="avatar-attachment">
                            <img 
                              src={attachment.avatar} 
                              alt={attachment.name}
                              className="avatar-image"
                            />
                            <div className="avatar-info">
                              <div className="avatar-name">{attachment.name}</div>
                              <div className="avatar-role">{attachment.role}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {activity.teamMembers && (
                      <div className="team-members">
                        {activity.teamMembers.map((member, idx) => (
                          <img
                            key={idx}
                            src={member.avatar}
                            alt={member.name}
                            className="team-avatar"
                            style={{ 
                              marginLeft: idx > 0 ? '-8px' : '0',
                              zIndex: activity.teamMembers.length - idx
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 時間戳 */}
                <div className="timeline__timestamp">
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="timeline__item">
            <div className="timeline__marker">
              <div className="timeline__dot" style={{ backgroundColor: '#e5e7eb' }}></div>
            </div>
            <div className="timeline__content-item">
              <div className="timeline__main">
                <h4 className="timeline__activity-title">No activities</h4>
                <p className="timeline__activity-description">No activity data available</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
