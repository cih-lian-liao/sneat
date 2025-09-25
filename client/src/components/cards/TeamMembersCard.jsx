import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeamMembersCard.css';

const TeamMembersCard = () => {
  const [teamMembers, setTeamMembers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 默認數據
  const defaultData = {
    title: "Team Members",
    members: [
      {
        id: 1,
        name: "Nathan Wagner",
        role: "iOS Developer",
        avatar: null,
        initials: "NW",
        initialsBgColor: "#e0e7ff",
        initialsTextColor: "#4f46e5",
        project: {
          name: "ZIPCAR",
          color: "purple"
        },
        tasksCompleted: 87,
        tasksTotal: 135,
        progressColor: "#6366f1"
      },
      {
        id: 2,
        name: "Emma Bowen",
        role: "Product Designer",
        avatar: null,
        initials: "EB",
        initialsBgColor: "#fee2e2",
        initialsTextColor: "#ef4444",
        project: {
          name: "BITBANK",
          color: "red"
        },
        tasksCompleted: 340,
        tasksTotal: 420,
        progressColor: "#ef4444"
      },
      {
        id: 3,
        name: "Adrian McGuire",
        role: "Frontend Developer",
        avatar: null,
        initials: "AM",
        initialsBgColor: "#fde68a",
        initialsTextColor: "#92400e",
        project: {
          name: "PAYERS",
          color: "orange"
        },
        tasksCompleted: 50,
        tasksTotal: 82,
        progressColor: "#f97316"
      },
      {
        id: 4,
        name: "Alma Gonzalez",
        role: "Backend Developer",
        avatar: null,
        initials: "AG",
        initialsBgColor: "#e0f2fe",
        initialsTextColor: "#0ea5e9",
        project: {
          name: "BRANDI",
          color: "blue"
        },
        tasksCompleted: 98,
        tasksTotal: 260,
        progressColor: "#0ea5e9"
      },
      {
        id: 5,
        name: "Travis Collins",
        role: "DevOps Engineer",
        avatar: null,
        initials: "TC",
        initialsBgColor: "#e5e7eb",
        initialsTextColor: "#6b7280",
        project: {
          name: "AVIATO",
          color: "gray"
        },
        tasksCompleted: 12,
        tasksTotal: 25,
        progressColor: "#6b7280"
      }
    ]
  };

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/dashboard?card=teamMembers');
        
        setTeamMembers(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError(err.message);
        setTeamMembers(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const getProjectStyles = (color) => {
    const colorMap = {
      purple: { bg: '#e0e7ff', text: '#4f46e5' },
      red: { bg: '#fee2e2', text: '#ef4444' },
      orange: { bg: '#fef3c7', text: '#d97706' },
      blue: { bg: '#e0f2fe', text: '#0ea5e9' },
      gray: { bg: '#e5e7eb', text: '#6b7280' }
    };
    return colorMap[color] || colorMap.gray;
  };

  const calculateProgress = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  const renderProgressCircle = (completed, total, color) => {
    const percentage = calculateProgress(completed, total);
    const radius = 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="team-members-card__progress-circle">
        <svg width="24" height="24" className="team-members-card__progress-svg">
          <circle
            className="team-members-card__progress-bg"
            cx="12"
            cy="12"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
          />
          <circle
            className="team-members-card__progress-bar"
            cx="12"
            cy="12"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 12 12)"
          />
        </svg>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="card card--team-members team-members-card">
        <div className="team-members-card__loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card card--team-members team-members-card team-members-card--error">
        <div className="team-members-card__error">載入失敗: {error}</div>
      </div>
    );
  }

  const data = teamMembers || defaultData;

  return (
    <div className="card card--team-members team-members-card">
      <div className="team-members-card__content">
        {/* 標題區域 */}
        <div className="team-members-card__header">
          <h3 className="team-members-card__title">{data.title}</h3>
          <div className="team-members-card__menu">
            <span>⋯</span>
          </div>
        </div>

        {/* 列表標頭 */}
        <div className="team-members-card__table-header">
          <div className="team-members-card__header-name">NAME</div>
          <div className="team-members-card__header-project">PROJECT</div>
          <div className="team-members-card__header-tasks">TASKS</div>
          <div className="team-members-card__header-progress">PROGRESS</div>
        </div>

        {/* 團隊成員列表 */}
        <div className="team-members-card__members-list">
          {data.members.map((member) => {
            const projectStyles = getProjectStyles(member.project.color);
            
            return (
              <div key={member.id} className="team-members-card__member-row">
                {/* 姓名列 */}
                <div className="team-members-card__member-info">
                  <div className="team-members-card__avatar">
                    {member.avatar ? (
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="team-members-card__avatar-img"
                      />
                    ) : (
                      <div 
                        className="team-members-card__avatar-initials"
                        style={{
                          backgroundColor: member.initialsBgColor,
                          color: member.initialsTextColor
                        }}
                      >
                        {member.initials}
                      </div>
                    )}
                  </div>
                  <div className="team-members-card__member-details">
                    <div className="team-members-card__member-name">{member.name}</div>
                    <div className="team-members-card__member-role">{member.role}</div>
                  </div>
                </div>

                {/* 項目列 */}
                <div className="team-members-card__member-project">
                  <div 
                    className="team-members-card__project-tag"
                    style={{
                      backgroundColor: projectStyles.bg,
                      color: projectStyles.text
                    }}
                  >
                    {member.project.name}
                  </div>
                </div>

                {/* 任務列 */}
                <div className="team-members-card__member-tasks">
                  {member.tasksCompleted}/{member.tasksTotal}
                </div>

                {/* 進度列 */}
                <div className="team-members-card__member-progress">
                  {renderProgressCircle(member.tasksCompleted, member.tasksTotal, member.progressColor)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamMembersCard;
