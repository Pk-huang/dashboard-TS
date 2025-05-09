import { createChartCard } from './chartCard'
import { dashboardCards } from './dashboardData'
import { Chart, registerables, CategoryScale, LinearScale } from "chart.js";
Chart.register(...registerables, CategoryScale, LinearScale);

export class Dashboard {
    private cardElements: { cardHtml: HTMLElement, props: any }[] = [];
    private app: HTMLElement;

    constructor(appSelector: string) {
        this.app = document.querySelector(appSelector)!;
        this.initialize();
    }

    // ✅ 初始化所有卡片
    private initialize() {
        dashboardCards.forEach((props) => this.addCard(props));
    }

    addCard(props: any) {
        const cardHtml = createChartCard(props)
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌ 刪除";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => this.removeCard(cardHtml, props));

        cardHtml.appendChild(deleteBtn);
        this.app.appendChild(cardHtml);

        // 建立圖表
        const chartCanvas = cardHtml.querySelector("canvas") as HTMLCanvasElement;
        props.chart = this.createOrUpdateChart(chartCanvas, props);

        this.cardElements.push({ cardHtml, props });
    }

    removeCard(cardHtml: HTMLElement, props: any) {
        if (props.chart) props.chart.destroy();
        cardHtml.remove();
        this.cardElements = this.cardElements.filter(card => card.cardHtml !== cardHtml);
    }

    // ✅ 建立或更新 Chart
    private createOrUpdateChart(canvas: HTMLCanvasElement, props: any) {
        return new Chart(canvas, {
            type: props.chartType || "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{
                    data: [...props.chartData || []],
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    borderColor: "rgba(0, 123, 255, 0.8)",
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: { display: true },
                    y: { display: true }
                },
                plugins: {
                    legend: { display: false }
                },
                animation: {
                    duration: 200,
                    easing: "easeOutQuad"
                }
            }
        });
    }

    // ✅ 更新所有卡片數據
    updateData() {
        this.cardElements.forEach(({ cardHtml, props }) => {
            const valueElement = cardHtml.querySelector(".chart-value");
            const chart = props.chart as Chart;

            // 模擬數據更新
            if (typeof props.value === "number") {
                props.value = Math.floor(Math.random() * 5000);
            } else if (typeof props.value === "string" && props.value.includes("%")) {
                props.value = (Math.random() * 5).toFixed(1) + "%";
            }

            if (valueElement) valueElement.textContent = `${props.value} ${props.unit || ""}`;

            // 更新圖表數據
            if (chart) {
                const newData = Math.floor(Math.random() * 100);
                chart.data.datasets[0].data.push(newData);

                if (chart.data.datasets[0].data.length > 6) {
                    chart.data.datasets[0].data.shift();
                }

                chart.update();
            }
        });
    }

}