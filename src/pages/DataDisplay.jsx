import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css'; 
import 'primereact/resources/themes/soho-light/theme.css'
// primereact/resources/themes/tailwind-light/theme.css
// primereact/resources/themes/lara-light-blue/theme.css
// primereact/resources/themes/lara-light-indigo/theme.css
// primereact/resources/themes/lara-light-purple/theme.css
// primereact/resources/themes/lara-light-teal/theme.css
// primereact/resources/themes/soho-light/theme.css
// primereact/resources/themes/viva-light/theme.css
// primereact/resources/themes/nano/theme.css
// primereact/resources/themes/saga-blue/theme.css
// primereact/resources/themes/saga-green/theme.css
// primereact/resources/themes/saga-orange/theme.css
// primereact/resources/themes/saga-purple/theme.css        

function DataDisplay() {
    const dtRef = useRef(null);
    
    // get data from db
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/data");
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError('Failed to fetch data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    console.log(data);

    const footer = (
        <div className="table-footer">
            <Button
                label="Generate Report"
                icon="pi pi-upload"
                onClick={() => dtRef.current.exportCSV()}
                className="btn px-3 py-3"
            />
        </div>
    );

    return (
        <div className="ml-64 w-full p-4">
            <h1 className="table-title">Fuel Economy Data - All Vehicles 2021-2024</h1>

            <DataTable value={data} paginator rows={6} filterDisplay="row" showGridlines 
                        scrollable style={{ maxWidth: '75%', overflowX: 'auto' }}
                        ref={dtRef} footer={footer}
            >
                <Column field = "Manufacturer" header = "Manufacturer" sortable filter style={{ minWidth: '150px' }}></Column>
                <Column field = "Model" header = "Model" sortable filter style={{ minWidth: '150px' }} ></Column>
                <Column field = "Year" header = "Year" sortable filter style={{ minWidth: '150px' }}></Column>
                <Column field = "Trans" header = "Trans" sortable filter style={{ minWidth: '150px' }}></Column>
                <Column field = "Cyl" header = "Cyl" sortable filter style={{ minWidth: '150px' }}></Column>
                <Column field = "Eng Size" header = "Eng Size" sortable filter style={{ minWidth: '150px' }}></Column>
                <Column field = "MPG City" header = "MPG City" sortable filter style={{ minWidth: '150px' }}></Column>
                <Column field = "MPG Hwy" header = "MPG Hwy" sortable filter style={{ minWidth: '150px' }}></Column>
                <Column field = "MPG Comb" header = "MPG Comb" sortable filter style={{ minWidth: '150px' }}></Column>
                <Column field = "Annual Fuel Cost" header = "Annual Fuel Cost" sortable filter style={{ minWidth: '150px' }}></Column>
                <Column field = "GHG Rating" header = "GHG Rating" sortable filter style={{ minWidth: '150px' }}></Column>
                <Column field = "Notes" header = "Notes" sortable filter style={{ minWidth: '150px' }}></Column>
            </DataTable>
        </div>
    );
}

export default DataDisplay;