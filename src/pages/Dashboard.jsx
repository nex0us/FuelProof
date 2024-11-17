import { useState, useEffect } from "react";
import { Grid2, Paper } from "@mui/material";
// import { collection, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [err, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
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
      {data ? (
        <LineChart
          width={500}
          height={300}
          data={data} // Directly passing the data
          margin={{ top: 40, right: 30, left: 20, bottom: 20 }}  // Adjust margins for extra space
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Avg MPG Comb" stroke="#EB0A1E" />
          <text
            x={270}
            y={10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="18"
            fill="#333"
          >
            Average MPG Comb by Year Across Toyota Vehicles
          </text>
        </LineChart>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default Dashboard;
