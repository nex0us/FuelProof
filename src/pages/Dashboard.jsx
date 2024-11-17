import { useState, useEffect } from "react";
import { Grid2, Paper } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { collection, getDocs } from "firebase/firestore";
import { Chart, Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [err, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/api/data');
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        }
    };

    fetchData();
    console.log(data);
  }, []);

  return (
    <div className="ml-64 w-full p-4">
      {/* {data ? (
        <LineChart
          xAxis={[
            {
              dataKey: "Year",
              min: 2021,
              max: 2024,
            },
          ]}
          series={[]}
          dataset={data}
          width={500}
          height={300}
        />
      ) : (
        <p>Loading chart data...</p>
      )} */}
    </div>
  );
};

export default Dashboard;
