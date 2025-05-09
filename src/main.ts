import { Dashboard } from "./features/dashboard/Dashboard";
import './styles/base.css'

// const app = document.querySelector('#app')!;
const dashboard = new Dashboard('#app');

setInterval(() => {
  dashboard.updateData();
}, 1000);

// ✅ 新增卡片按鈕
const addCardBtn = document.createElement("button");
addCardBtn.textContent = "➕ 新增卡片";
addCardBtn.addEventListener("click", () => {
  const newProps = {
    title: `卡片 ${Math.floor(Math.random() * 100)}`,
    value: Math.floor(Math.random() * 1000),
    unit: "次",
    chartType: "line",
    chartData: [12, 19, 3, 5, 2, 3]
  };
  dashboard.addCard(newProps);
});
document.body.appendChild(addCardBtn);
