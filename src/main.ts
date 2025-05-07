import { createChartCard } from './features/dashboard'
import './styles/base.css'



const cards = [
    { title: "訪客數", value: 1234, unit: "人", icon: "👥", background: "#dfefff" },
    { title: "銷售額", value: 82600, unit: "元", icon: "💰", background: "#fff5e0" },
    { title: "轉換率", value: "2.3%", icon: "📈", background: "#e8f5e9" }
];

const app = document.querySelector('#app')!

cards.forEach(card => {
    const cardHtml = createChartCard(card)
    app.appendChild(cardHtml)
});


