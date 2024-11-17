import { useState, useEffect } from 'react';
import { Grid2, Paper } from "@mui/material";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Import your Firestore instance
import { Chart, Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null); // To store the chart data from Firestore

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "dummy"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data()); // Assuming each doc contains the necessary chart data
        });
        // Prepare data for Chart.js
        const labels = data.map((item) => item.label); // Example field
        const values = data.map((item) => item.value); // Example field
        console.log(values)
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Dataset 1",
              data: values,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="ml-64 w-full p-4">
    <Grid2 container spacing={3}>
      <Grid2 item xs={12} sm={6}>
        <Paper className="p-4">
          {/* Render chart only if chartData is available */}
          {chartData ? (
            <Line data={chartData} />
          ) : (
            <p>Loading chart data...</p>
          )}
        </Paper>
      </Grid2>
      <Grid2 item xs={12} sm={6}>
        <Paper className="p-4">Table</Paper>
      </Grid2>
    </Grid2>
    </div>
  );
};

export default Dashboard;