// 重新設計的 Total Revenue 數據結構
// 更符合實際業務邏輯的設計

const totalRevenueData = {
  // 2024年數據 - 實際業務數據
  "2024": {
    "year": 2024,
    "totalRevenue": 1250000, // $1.25M
    "monthlyRevenue": [
      { "month": "Jan", "revenue": 95000 },
      { "month": "Feb", "revenue": 110000 },
      { "month": "Mar", "revenue": 105000 },
      { "month": "Apr", "revenue": 120000 },
      { "month": "May", "revenue": 115000 },
      { "month": "Jun", "revenue": 130000 },
      { "month": "Jul", "revenue": 125000 },
      { "month": "Aug", "revenue": 140000 },
      { "month": "Sep", "revenue": 135000 },
      { "month": "Oct", "revenue": 150000 },
      { "month": "Nov", "revenue": 145000 },
      { "month": "Dec", "revenue": 160000 }
    ],
    "growthRate": 15.2, // 相對於2023年的增長率
    "currency": "USD"
  },
  
  // 2023年數據 - 基準年
  "2023": {
    "year": 2023,
    "totalRevenue": 1085000, // $1.085M
    "monthlyRevenue": [
      { "month": "Jan", "revenue": 85000 },
      { "month": "Feb", "revenue": 90000 },
      { "month": "Mar", "revenue": 95000 },
      { "month": "Apr", "revenue": 100000 },
      { "month": "May", "revenue": 105000 },
      { "month": "Jun", "revenue": 110000 },
      { "month": "Jul", "revenue": 115000 },
      { "month": "Aug", "revenue": 120000 },
      { "month": "Sep", "revenue": 125000 },
      { "month": "Oct", "revenue": 130000 },
      { "month": "Nov", "revenue": 135000 },
      { "month": "Dec", "revenue": 140000 }
    ],
    "growthRate": 8.5, // 相對於2022年的增長率
    "currency": "USD"
  },

  // 2025年數據 - 預測數據
  "2025": {
    "year": 2025,
    "totalRevenue": 1450000, // $1.45M (預測)
    "monthlyRevenue": [
      { "month": "Jan", "revenue": 120000 },
      { "month": "Feb", "revenue": 125000 },
      { "month": "Mar", "revenue": 130000 },
      { "month": "Apr", "revenue": 135000 },
      { "month": "May", "revenue": 140000 },
      { "month": "Jun", "revenue": 145000 },
      { "month": "Jul", "revenue": 150000 },
      { "month": "Aug", "revenue": 155000 },
      { "month": "Sep", "revenue": 160000 },
      { "month": "Oct", "revenue": 165000 },
      { "month": "Nov", "revenue": 170000 },
      { "month": "Dec", "revenue": 175000 }
    ],
    "growthRate": 16.0, // 預測增長率
    "currency": "USD"
  }
};

// 計算年度增長率
const calculateGrowthRate = (currentYear, previousYear) => {
  if (!previousYear || previousYear.totalRevenue === 0) return 0;
  return ((currentYear.totalRevenue - previousYear.totalRevenue) / previousYear.totalRevenue) * 100;
};

// 生成最終的 API 響應格式
const generateAPIResponse = (year1, year2) => {
  const year1Data = totalRevenueData[year1.toString()];
  const year2Data = totalRevenueData[year2.toString()];
  
  if (!year1Data || !year2Data) {
    throw new Error(`Data not found for years ${year1} or ${year2}`);
  }

  const growthPercentage = calculateGrowthRate(year1Data, year2Data);
  
  return {
    year1: {
      year: year1Data.year,
      totalRevenue: year1Data.totalRevenue,
      monthlyRevenue: year1Data.monthlyRevenue,
      growthRate: year1Data.growthRate,
      currency: year1Data.currency
    },
    year2: {
      year: year2Data.year,
      totalRevenue: year2Data.totalRevenue,
      monthlyRevenue: year2Data.monthlyRevenue,
      growthRate: year2Data.growthRate,
      currency: year2Data.currency
    },
    growthPercentage: Math.round(growthPercentage * 10) / 10, // 保留一位小數
    currency: "USD",
    lastUpdated: new Date().toISOString()
  };
};

module.exports = {
  totalRevenueData,
  generateAPIResponse,
  calculateGrowthRate
};
