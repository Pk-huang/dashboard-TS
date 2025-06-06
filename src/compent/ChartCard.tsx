import React, { useEffect, useRef, type JSX } from 'react';
import { Chart, ChartConfiguration, ChartData } from 'chart.js/auto';

type ChartCardProps = {
    title: string;
    chartData: ChartData<'bar' | 'line', number[], string>;
    type?: 'bar' | 'line'; // 可選，預設是 bar
    onToggleType: () => void
};


const ChartCard = ({ title, chartData, type, onToggleType }: ChartCardProps): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const ctx = canvasRef.current.getContext('2d')
        if (!ctx) return

        const config: ChartConfiguration<'bar' | 'line'> = {
            type,
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                // scales: {
                //     x: { display: true },
                //     y: { display: true }
                // },
                // plugins: {
                //     legend: { display: false }
                // },
                // animation: {
                //     duration: 200,
                //     easing: "easeOutQuad"
                // }
            }
        }

        const chartInstance = new Chart(ctx, config)
        return () => {
            chartInstance.destroy()
        }

    }, [chartData, type])

    return (
        <div className="">
            <h2 className='card-title'>{title}</h2>
            <button className="btn btn-sm btn-outline-secondary" onClick={onToggleType}>
                switch {type === 'bar' ? 'bar' : 'line'}
            </button>
            <canvas ref={canvasRef} height={200}></canvas>
        </div>
    )
}

export default ChartCard