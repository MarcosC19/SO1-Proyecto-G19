import React, { useEffect } from "react";
import './GraphRam.css'
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

const labels = [];

export default function GraphRam(props) {
    const values = props.data
    
    const data = {
        datasets: [
            {
                label: "RAM VM1",
                data: values.grafica1,
                borderColor: "rgb(75, 192, 192)",
                pointBackgroundColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.3)",
            },
            {
                label: "RAM VM2",
                data: values.grafica2,
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.3)",
            },
        ],
        labels,
    }

    const maxLength = values.grafica1.length
    if (values.grafica2.length > values.grafica1.length){
        maxLength = values.grafica2.length
    }

    useEffect(() => {
        labels.push(maxLength)
    }, [values])

    const options = {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: values.maxValue
            },
        },
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    return (
        <div className="grafica">
            <Line data={data} options={options} />
        </div>
    )
}