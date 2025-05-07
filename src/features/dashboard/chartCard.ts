export interface ChartCardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon?: string;
  background?: string;
}

export function createChartCard({ title, value, unit = '', icon= "📊", background= '#fff' }: ChartCardProps): HTMLElement {
  const card = document.createElement("div");
  card.className = "chart-card";
  card.style.background = background;

  card.innerHTML = `
    <div class="chart-header">
      <span class="chart-icon">${icon}</span>
      <h3 class="chart-title">${title}</h3>
    </div>
    <div class="chart-value">${value} ${unit}</div>
    <div class="chart-area"><!-- 這裡未來可以放圖表 --></div>
  `;

  return card;
}