import sqlite3
import os
import csv

# Folder containing CSV files
folder_path = 'FEG_data_csv'
db_file = 'fuel_economy.db'

# Connect to SQLite database
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# Process each CSV file in the folder
for file_name in os.listdir(folder_path):
    if file_name.endswith('.csv'):
        table_name = os.path.splitext(file_name)[0]  # Use file name as table name
        csv_file = os.path.join(folder_path, file_name)
        
        # Read the CSV file
        with open(csv_file, 'r') as file:
            reader = csv.reader(file)
            headers = next(reader)  # Get the header row
            columns = ', '.join([f'"{col}" TEXT' for col in headers])
            
            # Create a table for the CSV
            cursor.execute(f'CREATE TABLE IF NOT EXISTS "{table_name}" ({columns})')
            
            # Insert data into the table
            for row in reader:
                placeholders = ', '.join(['?' for _ in row])
                cursor.execute(f'INSERT INTO "{table_name}" VALUES ({placeholders})', row)

# Commit and close
conn.commit()
conn.close()

print(f"All CSV files from {folder_path} have been loaded into {db_file}.")