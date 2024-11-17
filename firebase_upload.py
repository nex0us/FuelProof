import firebase_admin
from firebase_admin import credentials, firestore
import csv
import os

# Path to your service account key
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore (or Realtime Database if you prefer)
db = firestore.client()

def sanitize_header(header):
    # Replace invalid characters in field names
    return header.strip().replace(' ', '_').replace('/', '_').replace('.', '_')

def read_csv(file_path):
    with open(file_path, mode='r') as file:
        print(f"Processing {file_path}")
        reader = csv.DictReader(file)
        headers = reader.fieldnames
        headers[0] = 'Index'
        print(f"Headers: {headers}")
        rows = []
        for row in reader:
            # print(f"Row: {row}")
            sanitized_row = {sanitize_header(k): v for k, v in row.items()}
            rows.append(sanitized_row)
        return rows

def read_csvs(directory):
    files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
    data = []
    for file in files:
        file_path = os.path.join(directory, file)
        csv = read_csv(file_path)
        data.append(csv)
    return data

def upload_to_firestore(data):
    for csv in data:
        collection = db.collection('fuel_economy')  # The collection where the data will be stored
        for row in csv:
            collection.add(row)
        print("Data uploaded to Firestore successfully.")

def main():
    directory = "FEG_data_csv"  # Replace with the path to your CSV file
    data = read_csvs(directory)
    upload_to_firestore(data)  # Or upload_to_realtime_db(data)

if __name__ == "__main__":
    main()