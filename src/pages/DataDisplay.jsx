import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/firebase"; // Import the Firestore instance
import { Grid2, Paper, Button } from "@mui/material";

function DataDisplay() {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // State to track the sort order

  // Fetch data from Firestore when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "dummy"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(items);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Firestore</h1>
      <Grid2 container spacing={3}>
        {data.length === 0 ? (
          <p>Loading data...</p>
        ) : (
          data.map((item) => (
            <Grid2 item xs={12} sm={6} key={item.id}>
              <Paper className="p-4">
                <div className="font-bold">Car Data:</div>
                {Object.keys(item).map((key) => {
                  // Skip the 'id' key if it exists
                  if (key === "id") return null;

                  return (
                    <div key={key}>
                      <strong>{key.replace("car", "Car ")}: </strong>
                      {item[key]}
                    </div>
                  );
                })}
              </Paper>
            </Grid2>
          ))
        )}
      </Grid2>
    </div>
  );
}

export default DataDisplay;