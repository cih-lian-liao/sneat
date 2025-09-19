const revenueData = [
  {
    title: "Revenue",
    totalRevenue: 425000,
    weeklyData: [
      { day: "M", revenue: 45000, isHighlighted: false },
      { day: "T", revenue: 62000, isHighlighted: false },
      { day: "W", revenue: 58000, isHighlighted: false },
      { day: "T", revenue: 41000, isHighlighted: false },
      { day: "F", revenue: 89000, isHighlighted: true },  // 最高點，突出顯示
      { day: "S", revenue: 38000, isHighlighted: false },
      { day: "S", revenue: 52000, isHighlighted: false }
    ],
    currency: "USD",
    lastUpdated: new Date()
  }
];

module.exports = revenueData;
