import { React, useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField, // For the text input field
} from "@mui/material";

const MpgTable = () => {
  // State for pagination and filter
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState(""); // Filter state to store search query

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update the filter state on text change
  };

  const [data, setData] = useState([]);
  const [err, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mpg_comb");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Filter the data based on the filter text input
  const filteredData = data.filter((row) => {
    return (
      row["Model"].toLowerCase().includes(filter.toLowerCase()) ||
      row["Year"].toString().includes(filter) ||
      row["MPG Comb"].toString().includes(filter)
    );
  });

  return (
    <Paper sx={{ padding: '20px' }}>
      {/* Filter Input */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={filter}
        onChange={handleFilterChange}
        sx={{ marginBottom: '20px' }}
      />

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>MPG Comb</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row["MPG Comb"]}</TableCell>
                  <TableCell>{row["Model"]}</TableCell>
                  <TableCell>{row.Year}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MpgTable;