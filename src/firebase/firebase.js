// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, push } from "firebase/database";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Your Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

// Set session persistence for auth
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Session persistence set to local');
  })
  .catch((error) => {
    console.error('Failed to set persistence:', error);
  });

// Function to read multiple CSV files
const readMultipleCSVs = (folderPath) => {
  fs.readdirSync(folderPath).forEach(file => {
    const filePath = path.join(folderPath, file);
    if (filePath.endsWith(".csv")) {
      console.log(`Reading file: ${file}`);
      readCSV(filePath);
    }
  });
};

// Read a single CSV file
const readCSV = (csvPath) => {
  let csvData = [];
  
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (row) => {
      csvData.push(row);
    })
    .on("end", () => {
      console.log(`CSV file ${csvPath} successfully processed`);
      saveToFirebase(csvData);
    });
};

// Upload data to Firebase Realtime Database
const saveToFirebase = (data) => {
  const refPath = ref(realtimeDb, 'csv_data');
  data.forEach((row) => {
    push(refPath, row);
  });

  console.log("Data uploaded to Firebase Realtime Database");
};

// Call the function to read all CSVs in a folder
const folderPath = "../../FEG_data_csv";
readMultipleCSVs(folderPath);

// Export Firebase auth and db (if needed elsewhere)
export { auth, db, realtimeDb };