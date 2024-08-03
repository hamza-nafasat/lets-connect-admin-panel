/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);

export const LineChartComponent = ({
    heading,
    position,
    title,
    data,
    bgColor = "#35A2EB",
    borderColor = "#FF6384",
    isTittleAppear = false,
    labels = getLastYearMonths(),
}) => {
    const lineChartOption = {
        responsive: true,
        plugins: {
            legend: {
                display: isTittleAppear,
                maxHeight: 20,
            },
            title: {
                fullSize: true,
                text: heading,
                display: heading ? true : false,
                font: { size: 20, weight: 300 },
                position: position ? position : "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // stepSize: 300,
                },
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };
    const lineChartData = {
        labels,
        datasets: [
            {
                label: title,
                data,
                fill: true,
                backgroundColor: bgColor,
                borderColor,
            },
            // {
            //     label: "My Dataset",
            //     data: [65, 59, 80, 81, 56, 55, 40, 50, 40, 50, 40, 30, 40],
            //     fill: false,
            //     backgroundColor: "rgba(75,192,192,0.4)",
            //     borderColor: "rgba(75,192,192,1)",
            //     borderCapStyle: "butt",
            //     borderDash: [],
            //     borderDashOffset: 0.0,
            //     borderJoinStyle: "miter",
            //     pointBorderColor: "rgba(75,192,192,1)",
            //     pointBackgroundColor: "#fff",
            //     pointBorderWidth: 1,
            //     pointHoverRadius: 5,
            //     pointHoverBackgroundColor: "rgba(75,192,192,1)",
            //     pointHoverBorderColor: "rgba(220,220,220,1)",
            //     pointHoverBorderWidth: 2,
            //     pointRadius: 1,
            //     pointHitRadius: 10,
            // },
        ],
    };
    return <Line options={lineChartOption} data={lineChartData} />;
};
// get last year function
export const getLastYearMonths = () => {
    const months = [];
    const data = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const remains = 11 - currentMonth;
    for (let i = currentMonth; i >= 0; i--) {
        months.unshift(data[i]);
    }
    for (let i = remains; i > 0; i--) {
        months.unshift(data[currentMonth + i]);
    }
    return months;
};
