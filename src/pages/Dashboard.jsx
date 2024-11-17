import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase/firebase';

function Dashboard() {
  const [items, setItems] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "invitees"));
  //     const dataArray = querySnapshot.docs.map(doc => doc.data());
  //     setItems(dataArray);
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
        <h1>Dashboard</h1>
    </div>
    );
}

export default Dashboard;