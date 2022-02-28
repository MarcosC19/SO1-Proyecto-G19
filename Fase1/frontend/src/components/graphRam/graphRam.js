import React from "react";
import './graphRam.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const scores = [60, 50, 50, 50, 30, 40, 60, 40, 50];
const scores2 = [10, 30, 20, 20, 40, 40, 50, 30, 20];
const labels = [100, 200, 300, 400, 500, 600, 700];

const options = {
    responsive: true,
    scales: {
        y: {
            min: 0,
            max: 100
        },
    },
    plugins: {
        legend: {
            display: true,
        },
    },
};

export default function GraphRam(){

    const data = {
        datasets: [
            {
                label: "RAM VM1",
                data: scores,
                borderColor: "rgb(75, 192, 192)",
                pointBackgroundColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.3)",
            },
            {
                label: "RAM VM2",
                data: scores2,
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.3)",
            },
        ],
        labels,
    }

    return(        
        <div className="grafica">
            <Line data={data} options={options} />
        </div>
    )
}