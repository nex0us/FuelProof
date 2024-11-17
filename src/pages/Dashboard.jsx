import { useState, useEffect } from "react";
import {
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
// import { collection, getDocs } from "firebase/firestore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import MpgTable from "../components/ToyotaMpgTable";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [err, setError] = useState([]);

  useEffect(() => {
    if (!trigger) {
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
      setTrigger(true);
    }
  }, [trigger]);

  const [avg_mpg, setAvgMpg] = useState([]);

  useEffect(() => {
    if (!trigger) {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/toyota_avg_mpg");
          const result = await response.json();
          setAvgMpg(result);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchData();
      console.log(avg_mpg);
      setTrigger(true);
    }
  }, [trigger]);

  const [comp_mpg, setCompMpg] = useState([]);
  const [comp_diff, setCompDiff] = useState([]);

  useEffect(() => {
    if (!trigger) {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/comp_avg_mpg");
          const result = await response.json();
          setCompMpg(result);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchData();
      if (avg_mpg.length > 0 && comp_mpg.length > 0) {
        var difference = (
          avg_mpg[0]["AVG MPG Comb"] - comp_mpg[0]["Comp AVG"]
        ).toFixed();
        if (difference > 0) {
          setCompDiff("+" + difference);
        } else {
          setCompDiff("-" + difference);
        }
      }

      console.log(comp_mpg);
      console.log(comp_diff);
      setTrigger(false);
    }
  }, [trigger]);

  const DataCard = ({ title, data }) => {
    return (
      <Card sx={{ maxWidth: 200, marginBottom: 2, height: 125 }}>
        <CardHeader title={title} />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center", // Horizontally center the content
            alignItems: "center", // Vertically center the content
            height: "50%", // Ensure the CardContent takes the full height
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: data.includes('+') ? "green" : data < 0 ? "red" : "black", // Conditional coloring
            }}
          >
            {data}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const refreshData = () => {
    setTrigger(!trigger); // Increment the dependency to re-trigger the effect
  };

  return (
    <div className="ml-32 w-full p-4">
      <Grid2
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{}}
      >
        {/* Use xs=12 to stack on smaller screens, and sm=6 and md=4 for responsive layout */}
        <Grid2 item xs={12} sm={6} md={4}>
          <DataCard
            title="AVG MPG"
            data={
              avg_mpg.length > 0 ? avg_mpg[0]["AVG MPG Comb"].toFixed(1) : "N/A"
            }
          />
        </Grid2>
        <Grid2 item xs={12} sm={6} md={4}>
          <DataCard title="Competitor Diff" data={comp_diff} />
        </Grid2>
        <Grid2>
          <Card sx={{ maxWidth: 200, marginBottom: 2, height: 125 }}>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center", // Vertically center the button
                justifyContent: "center", // Horizontally center the button (optional)
                height: "100%", // Ensure the CardContent takes the full height
              }}
            >
              <button onClick={refreshData} className="btn">
                Refresh Data
              </button>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
      <Paper
        elevation={3}
        sx={{
          margin: "0 auto",
          padding: "20px",
          borderRadius: "8px",
          overflowX: "hidden",
          maxWidth: "700px",
        }}
      >
        {data ? (
          <LineChart
            width={600}
            height={300}
            data={data} // Directly passing the data
            margin={{ top: 40, right: 30, left: 30, bottom: 20 }} // Adjust margins for extra space
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
