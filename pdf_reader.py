import pdfplumber
import os
import csv
import pandas as pd

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
                # Iterate through pages 12-end (page 12 is where data starts)
                for page in pdf.pages[12:]:
                    # define dataframe
                    cols = ['Car Type', 'Manufacturer', 'Model', 'Trans', 'Eng Size', 'Cyl', 'MPG Comb', 'MPG City',
                            'MPG Hwy', 'Annual Fuel Cost', 'GHG Rating', 'Notes']
                    df = pd.DataFrame(columns = cols)
                    
                    # each page has 2 columns so need bounding boxes
                    width = page.width
                    height = page.height
                    left_bbox = (0, 0, width / 2, height)
                    right_bbox = (width / 2, 0, width, height)

                    # Extract text from each column
                    left_column = page.within_bbox(left_bbox) # crop left column
                    left_text = left_column.extract_text()
                    
                    right_column = page.within_bbox(right_bbox) # Crop right column
                    right_text = right_column.extract_text()
                    
                    # print(left_text + right_text)
                    # print(left_text)
                    
                    # populate dataframe
                    # split text into lines
                    left_lines = left_text.splitlines()
                    right_lines = right_text.splitlines()
                    # print(left_lines)
                    
                    # populate dataframe
                    car_type = None
                    manufacturer = None
                    car_model = None
                    trans = None
                    eng_size = None 
                    cyl = None 
                    mpg_comb = None 
                    mpg_city = None 
                    mpg_hwy = None 
                    cost = None 
                    ghg = None 
                    notes = None
                    for line in range(5, len(left_lines)): # we know first 5 lines are just labels
                        # print(left_lines[line])
                        # check if current line is data, every data line has a $ in it
                        if "$" in left_lines[line]:
                            data = left_lines[line].split()
                            trans = data[0][:-1]
                            eng_size = data[1][:-1]
                            cyl = data[2]
                            mpg_comb = data[3]
                            mpg_city = data[4][:data[4].index("/")]
                            mpg_hwy = data[4][data[4].index("/") + 1:]
                            cost = data[5]
                            ghg = data[6]
                            notes = data[7:]
                            
                            # insert new row after data line encountered
                            if not car_type:
                                car_type = df.iloc[-1, 0]
                            if not manufacturer:
                                manufacturer = df.iloc[-1, 1]
                            # if not car_model:
                            #     car_model = df.iloc[-1, 2]
                            #     print(car_model)
                                  
                            new_row = [car_type, manufacturer, car_model, trans, eng_size, cyl, mpg_comb, mpg_city, 
                                       mpg_hwy, cost, ghg, notes]
                            df.loc[len(df)] = new_row
                                
                            # reset all vars except car type and manufacturer
                            car_type = None
                            manufacturer = None
                            car_model = None
                            trans = None
                            eng_size = None 
                            cyl = None 
                            mpg_comb = None 
                            mpg_city = None 
                            mpg_hwy = None 
                            cost = None 
                            ghg = None 
                            notes = None
                        # if current line and next line all caps then that's a car type line
                        elif left_lines[line].isupper() and left_lines[line+1].isupper() and left_lines[line+1].isalpha():
                            car_type = left_lines[line]
                            # print(left_lines[line+1], left_lines[line+1].isupper())
                            # print("car type", car_type)
                        elif left_lines[line].isupper() and not any(c.isnumeric() for c in left_lines[line]):
                            manufacturer = left_lines[line]
                            # print("manufacturer", manufacturer)
                        else:
                            car_model = left_lines[line]
                            # print("car model", car_model)
                            # print(left_lines[line].isupper(), left_lines[line].isalpha(), left_lines[line+1].isupper())
                            
                    
                    print(df)
                    exit()

data = read_pdfs(files)