import pdfplumber
import os
import csv

directory = "FEG_data_raw"

# Get all files in the directory
files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]

print(files)

csv_folder = 'FEG_data_csv'

# Check if folder exists; if not, create it
if not os.path.exists(csv_folder):
    os.makedirs(csv_folder)
    print(f"Folder created: {csv_folder}")

def read_pdfs(files):
    for file in files:
        file_path = os.path.join(directory, file)
        with pdfplumber.open(file_path) as pdf:
            csv_path = os.path.join(csv_folder, file[:-4] + '.csv')
            with open(csv_path, mode='w', newline='', encoding='utf-8') as csv_file:
                csv_writer = csv.writer(csv_file)
                header_written = False
                # Iterate through all pages
                for page in pdf.pages:
                    table_settings = {
                        'vertical_strategy': 'text',
                        'horizontal_strategy': 'text',
                        'intersection_tolerance': 5
                    }
                    tables = page.extract_tables(table_settings)
                    for table in tables:
                        if not header_written:
                            csv_writer.writerow(table[0])  # Write header
                            header_written = True
                        for row in table[1:]:  # Skip header in subsequent pages
                            csv_writer.writerow(row)

data = read_pdfs(files)