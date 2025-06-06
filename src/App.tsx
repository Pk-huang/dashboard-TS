import React, { type JSX, useState ,useEffect } from 'react';
import type { ChartData } from 'chart.js';
import ChartCard from './compent/ChartCard'
import './App.css'

type CardInfo = {
  id: number,
  title: string,
  chartData: ChartData<'bar', number[], string>,
  type: "bar" | 'line'
}

const generateSampleData = (label: string): ChartData<'bar', number[], string> => ({
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label,
      data: Array.from({ length: 4 }, () => Math.floor(Math.random() * 300)),
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
});

const STORAGE_KEY = 'dashboard_cards';
const App = (): JSX.Element => {

  const [cards, setCards] = useState<CardInfo[]>([])

  // ✅ 載入 localStorage 的資料
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: CardInfo[] = JSON.parse(saved);
        setCards(parsed);
      } catch {
        console.warn('⚠️ localStorage 內容解析失敗');
      }
    }
  }, []);

    // ✅ 每次 cards 更新時同步存入 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const addCard = (): void => {
    const newId = Date.now();
    const newCard: CardInfo = {
      id: newId,
      title: `Chart Card ${cards.length + 1}`,
      chartData: generateSampleData(`Dataset ${cards.length + 1}`),
      type: 'bar'
    }

    setCards([...cards, newCard])
  }

  const removeCard = (id: number): void => {
    setCards(cards.filter(card => card.id !== id));
  };

  const toggleType = (id: number): void => {
    setCards(cards.map(card =>
      card.id === id ? { ...card, type: card.type === "bar" ? 'line' : "bar" } : card
    ))
  }

  return (
    <div className='container'>
      <div className="row">
        <button className='btn btn-light w-25 mx-2' onClick={addCard}>Add Card</button>
      </div>
      <div className="row">
        {cards.map(card => (
          <div key={card.id} className='card m-3 col-5'>
            <button className='btn btn-warning w-25 mx-2' onClick={() => removeCard(card.id)}>Delet Card</button>
            <ChartCard title={card.title} chartData={card.chartData} type={card.type} onToggleType={() => toggleType(card.id)} />
          </div>
        ))}

      </div>
    </div>
  )
}

export default App
