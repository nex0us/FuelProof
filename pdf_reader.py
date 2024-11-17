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
    for file in files[:-1]:
        file_path = os.path.join(directory, file)
        with pdfplumber.open(file_path) as pdf:
            csv_path = os.path.join(csv_folder, file[:-4] + '.csv')
            with open(csv_path, mode='w', newline='', encoding='utf-8') as csv_file:
                csv_writer = csv.writer(csv_file)
                header_written = False
                
                # define dataframe
                cols = ['Car Type', 'Manufacturer', 'Model', 'Trans', 'Eng Size', 'Cyl', 'MPG Comb', 'MPG City',
                        'MPG Hwy', 'Annual Fuel Cost', 'GHG Rating', 'Notes']
                df = pd.DataFrame(columns = cols)
                
                # Iterate through pages 12-end (page 12 is where data starts)
                for page in pdf.pages[12:]:
                    
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
                    print(right_lines)
                    
                    # break when reach new section (will no longer have manufacturer as first line)
                    if left_lines[0] != 'Manufacturer':
                        break
                    
                    
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
                        print(left_lines[line], page, file)
                        # check if current line is data, every data line has a $ in it
                        if "$" in left_lines[line]:
                            data = left_lines[line].split()
                            
                            trans = data[0][:-1]
                            eng_size = data[1][:-1]
                            cyl = data[2]
                            mpg_comb = data[3]
                            try:
                                mpg_city = data[4][:data[4].index("/")]
                                mpg_hwy = data[4][data[4].index("/") + 1:]
                            except:
                                continue
                            cost = data[5]
                            ghg = data[6]
                            notes = data[7:]
                            
                            # insert new row after data line encountered
                            if not car_type:
                                car_type = df.iloc[-1, 0]
                            if not manufacturer:
                                manufacturer = df.iloc[-1, 1]
                            if not car_model:
                                car_model = df.iloc[-1, 2]
                                  
                            new_row = [car_type, manufacturer, car_model, trans, eng_size, cyl, mpg_comb, mpg_city, 
                                       mpg_hwy, cost, ghg, notes]
                            df.loc[len(df)] = new_row
                                
                            # reset all vars
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
                        # take care of page number and footer
                        elif line == len(left_lines) - 1 or "FUEL ECONOMY" in left_lines[line]:
                            break
                        # if current line all caps and data line at least 3
                        elif left_lines[line].isupper() and "$" not in left_lines[line+1] and "$" not in left_lines[line+2]:
                            car_type = left_lines[line]
                            # print("car type", car_type)
                        elif left_lines[line].isupper() and "$" not in left_lines[line+1]:
                            manufacturer = left_lines[line]
                            # print("manufacturer", manufacturer)
                        else:
                            car_model = left_lines[line]
                            # print("car model", car_model)
                            
                    for line in range(5, len(right_lines)): # we know first 5 lines are just labels  
                        print(right_lines[line], page, file)                      
                        # check if current line is data, every data line has a $ in it
                        if "$" in right_lines[line]:
                            data = right_lines[line].split()
                            
                            trans = data[0][:-1]
                            eng_size = data[1][:-1]
                            cyl = data[2]
                            mpg_comb = data[3]
                            try:
                                mpg_city = data[4][:data[4].index("/")]
                                mpg_hwy = data[4][data[4].index("/") + 1:]
                            except:
                                continue
                            cost = data[5]
                            ghg = data[6]
                            notes = data[7:]
                            
                            # insert new row after data line encountered
                            if not car_type:
                                car_type = df.iloc[-1, 0]
                            if not manufacturer:
                                manufacturer = df.iloc[-1, 1]
                            if not car_model:
                                car_model = df.iloc[-1, 2]
                                  
                            new_row = [car_type, manufacturer, car_model, trans, eng_size, cyl, mpg_comb, mpg_city, 
                                       mpg_hwy, cost, ghg, notes]
                            df.loc[len(df)] = new_row
                            # print(new_row)
                                
                            # reset all vars
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
                        # take care of page number and footer
                        elif line == len(right_lines) - 1 or "FUEL ECONOMY" in right_lines[line]:
                            break
                        # if current line all caps and data line at least 3
                        elif right_lines[line].isupper() and "$" not in right_lines[line+1] and "$" not in right_lines[line+2]:
                            car_type = right_lines[line]
                            # print("car type", car_type)
                        elif right_lines[line].isupper() and "$" not in right_lines[line+1]:
                            manufacturer = right_lines[line]
                            # print("manufacturer", manufacturer)
                        else:
                            car_model = right_lines[line]
                            # print("model", car_model)
                            
                    
                    print(df)
                    # exit()
                    
                # write to csv
                df.to_csv(csv_path)

data = read_pdfs(files)