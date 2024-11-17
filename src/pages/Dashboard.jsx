import { useState, useEffect } from "react";
import { Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
// import { collection, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import MpgTable from "../components/ToyotaMpgTable";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [err, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/avg_mpg_comb");
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
    <div className="ml-32 w-full p-4">
      <Paper elevation={3} sx={{ margin:"0 auto", padding: '20px', borderRadius: '8px', overflowX: "hidden", maxWidth: "700px"}}>
      {data ? (
        <LineChart
          width={600}
          height={300}
          data={data} // Directly passing the data
          margin={{ top: 40, right: 30, left: 30, bottom: 20 }}  // Adjust margins for extra space
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Avg MPG Comb" stroke="#EB0A1E" />
          <text
            x={330}
            y={10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="17"
            fill="#333"
            fontWeight="bold"
          >
            Average MPG Comb by Year Across Toyota Vehicles
          </text>
        </LineChart>
      ) : (
        <p>Loading chart data...</p>
      )}
      <MpgTable />
      </Paper>
    </div>
  );
};

export default Dashboard;
