const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Atlas 連接字符串
const MONGODB_URI = process.env.MONGO_URI || 'process.env.MONGO_URI';

// DashboardData Schema
const dashboardSchema = new mongoose.Schema({
  // Team Members
  teamMembers: {
    title: { type: String, default: 'Team Members' },
    members: [{
      id: { type: Number, required: true },
      name: { type: String, required: true },
      role: { type: String, required: true },
      avatar: { type: String, default: null },
      initials: { type: String, required: true },
      initialsBgColor: { type: String, required: true },
      initialsTextColor: { type: String, required: true },
      project: {
        name: { type: String, required: true },
        color: { type: String, required: true }
      },
      tasksCompleted: { type: Number, required: true },
      tasksTotal: { type: Number, required: true },
      progressColor: { type: String, required: true }
    }]
  }
}, { 
  timestamps: true, 
  collection: 'dashboard' 
});

const DashboardData = mongoose.model('DashboardData', dashboardSchema);

// Team Members 數據
const teamMembersData = {
  title: 'Team Members',
  members: [
    {
      id: 1,
      name: 'Nathan Wagner',
      role: 'iOS Developer',
      avatar: null,
      initials: 'NW',
      initialsBgColor: '#e0e7ff',
      initialsTextColor: '#4f46e5',
      project: {
        name: 'ZIPCAR',
        color: 'purple'
      },
      tasksCompleted: 87,
      tasksTotal: 135,
      progressColor: '#6366f1'
    },
    {
      id: 2,
      name: 'Emma Bowen',
      role: 'Product Designer',
      avatar: null,
      initials: 'EB',
      initialsBgColor: '#fee2e2',
      initialsTextColor: '#ef4444',
      project: {
        name: 'BITBANK',
        color: 'red'
      },
      tasksCompleted: 340,
      tasksTotal: 420,
      progressColor: '#ef4444'
    },
    {
      id: 3,
      name: 'Adrian McGuire',
      role: 'Frontend Developer',
      avatar: null,
      initials: 'AM',
      initialsBgColor: '#fde68a',
      initialsTextColor: '#92400e',
      project: {
        name: 'PAYERS',
        color: 'orange'
      },
      tasksCompleted: 50,
      tasksTotal: 82,
      progressColor: '#f97316'
    },
    {
      id: 4,
      name: 'Alma Gonzalez',
      role: 'Backend Developer',
      avatar: null,
      initials: 'AG',
      initialsBgColor: '#e0f2fe',
      initialsTextColor: '#0ea5e9',
      project: {
        name: 'BRANDI',
        color: 'blue'
      },
      tasksCompleted: 98,
      tasksTotal: 260,
      progressColor: '#0ea5e9'
    },
    {
      id: 5,
      name: 'Travis Collins',
      role: 'DevOps Engineer',
      avatar: null,
      initials: 'TC',
      initialsBgColor: '#e5e7eb',
      initialsTextColor: '#6b7280',
      project: {
        name: 'AVIATO',
        color: 'gray'
      },
      tasksCompleted: 12,
      tasksTotal: 25,
      progressColor: '#6b7280'
    }
  ]
};

async function updateTeamMembers() {
  try {
    // 連接到 MongoDB Atlas
    await mongoose.connect(MONGODB_URI);
    console.log('✅ 已連接到 MongoDB Atlas');

    // 查找現有的 dashboard 文檔
    let dashboard = await DashboardData.findOne();
    
    if (!dashboard) {
      // 如果沒有現有文檔，創建一個新的
      dashboard = new DashboardData();
      console.log('📄 創建新的 dashboard 文檔');
    } else {
      console.log('📄 找到現有的 dashboard 文檔');
    }

    // 更新 teamMembers 數據
    dashboard.teamMembers = teamMembersData;
    
    // 保存到數據庫
    await dashboard.save();
    console.log('✅ Team Members 數據已成功更新到 MongoDB Atlas');
    
    // 驗證數據
    const updatedDashboard = await DashboardData.findOne();
    console.log('📊 更新後的 Team Members 數據:');
    console.log(`- 標題: ${updatedDashboard.teamMembers.title}`);
    console.log(`- 團隊成員數量: ${updatedDashboard.teamMembers.members.length}`);
    console.log(`- 成員列表:`);
    updatedDashboard.teamMembers.members.forEach(member => {
      console.log(`  - ${member.name} (${member.role}) - ${member.tasksCompleted}/${member.tasksTotal} 任務`);
    });

  } catch (error) {
    console.error('❌ 更新 Team Members 數據時發生錯誤:', error);
  } finally {
    // 關閉數據庫連接
    await mongoose.disconnect();
    console.log('🔌 已斷開 MongoDB Atlas 連接');
  }
}

// 執行更新
updateTeamMembers();
