import { useMemo, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

/**
 * 基礎平滑折線圖
 * @param {string[]} labels - X 軸標籤
 * @param {number[]} values - 對應數值
 * @param {number} height - 容器高度（px）；若外層有固定高度可不傳
 */
export default function OrderChart({
  labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  values = [120, 180, 150, 200, 260, 220, 300],
  height = 240,
}) {
  const chartRef = useRef(null);

  // 安全的數據處理
  const safeLabels = Array.isArray(labels) ? labels : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const safeValues = Array.isArray(values) ? values.map(v => Number(v) || 0) : [120, 180, 150, 200, 260, 220, 300];

  // 用 scriptable options 動態建立漸層，避免初次渲染 chartArea 未準備好
  const data = useMemo(() => {
    try {
      return {
        labels: safeLabels,
        datasets: [
          {
            label: "Orders",
            data: safeValues,
          borderColor: "#59c344ff",
          borderWidth: 2,
          tension: 0.35,         // 平滑
          pointRadius: 0,        // 不顯示點
          fill: true,
          backgroundColor: (ctx) => {
            const { chart } = ctx;
            const { ctx: canvasCtx, chartArea } = chart;
            if (!chartArea) return "rgba(91,53,255,0.12)"; // 初次渲染 fallback
            const gradient = canvasCtx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );
            gradient.addColorStop(0, "rgba(104, 234, 99, 0.41)");
            gradient.addColorStop(1, "rgba(48, 247, 84, 0.02)");
            return gradient;
          },
        },
        ],
      };
    } catch (error) {
      console.error('OrderChart data error:', error);
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Orders",
            data: [120, 180, 150, 200, 260, 220, 300],
            borderColor: "#59c344ff",
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 0,
            fill: true,
            backgroundColor: "rgba(91,53,255,0.12)",
          },
        ],
      };
    }
  }, [safeLabels, safeValues]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false, // 讓圖表吃滿父容器高度
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          padding: 10,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y.toLocaleString()} orders`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#666" },
          border: { display: false },
        },
        y: {
          beginAtZero: true,
          grid: { color: "rgba(0,0,0,0.06)", drawBorder: false },
          ticks: {
            color: "#666",
            callback: (v) =>
              Math.abs(v) >= 1000 ? `${(v / 1000).toFixed(1)}k` : v,
          },
        },
      },
    }),
    []
  );

  return (
    <div style={{ width: "100%", height }} ref={chartRef}>
      <Line data={data} options={options} />
    </div>
  );
}
