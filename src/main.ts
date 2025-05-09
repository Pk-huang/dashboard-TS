// main.ts
import { createChartCard } from './features/dashboard';
import { dashboardCards } from './data/dashboardData.ts';
import './styles/base.css';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// ✅ 將 Chart 暴露為全域變數（方便 Console 測試）
(window as any).Chart = Chart;

const app = document.querySelector('#app')!;

// 儲存卡片與圖表的關聯
const cardElements = dashboardCards.map(props => {
    const cardHtml = createChartCard(props);
    app.appendChild(cardHtml);

    // 建立 Chart 並記錄在 props
    const chartCanvas = cardHtml.querySelector("canvas") as HTMLCanvasElement;
    chartCanvas.id = `chart-${props.title}`;

    // console.log(props.chart)
    props.chart = createOrUpdateChart(chartCanvas, props);
    return { cardHtml, props };
});

// ✅ 函數：建立或更新 Chart
function createOrUpdateChart(canvas: HTMLCanvasElement, props: any) {
    // console.log(`⚡ 初始化或更新 Chart: ${canvas.id}`);



    const newChart = new Chart(canvas, {
        type: props.chartType || "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                data: [...props.chartData],
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderColor: "rgba(0, 123, 255, 0.8)",
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,  // ✅ 強制不維持比例
            scales: {
                x: { display: false },
                y: { display: false }
            },
            plugins: {
                legend: { display: false }
            },
            animation: {
                duration: 300,  // ✅ 減少動畫時間，避免卡住
                easing: "easeOutQuad"
            }
        }
    });

    // console.log(`✅ Chart 建立成功: ${canvas.id}`, newChart);
    return newChart;
}

function updateDashboardData() {
    cardElements.forEach(({ cardHtml, props }) => {
        const valueElement = cardHtml.querySelector(".chart-value");
        const chartCanvas = cardHtml.querySelector("canvas") as HTMLCanvasElement;

        if (typeof props.value === "number") {
            props.value = Math.floor(Math.random() * 5000); // 隨機 0 ~ 5000
        } else if (typeof props.value === "string" && props.value.includes("%")) {
            props.value = (Math.random() * 5).toFixed(1) + "%"; // 隨機 0 ~ 5%
        }

        if (valueElement) valueElement.textContent = `${props.value} ${props.unit || ""}`;

        if (chartCanvas) {
            const chartId = `chart-${props.title}`;

            const chart = Chart.getChart(chartId);

            if (chart) {
                const newData = Math.floor(Math.random() * 100);
                chart.data.datasets[0].data.push(newData);
               
                if (chart.data.datasets[0].data.length > 6) {
                    chart.data.datasets[0].data.shift();
                     console.log(chart.data.datasets[0].data.length)
                }
                chart.update();
                
            }
        }

    });
}

// ✅ 自動更新（每秒刷新）
setInterval(updateDashboardData, 1000);
