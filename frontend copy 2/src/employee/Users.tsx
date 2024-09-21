import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { NavLink } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  GetEmployees,
  DeleteEmployeeByID,
  GetPositions,
} from "./services/https";
import { EmployeeInterface } from "./interfaces/IEmployee";
import { PositionInterface } from "./interfaces/IPosition";

export default function Users() {
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [positions, setPositions] = useState<PositionInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    getEmployees();
    getPositions();
  }, []);

  const getEmployees = async () => {
    const res = await GetEmployees();
    if (res) {
      setEmployees(res);
    }
  };

  const getPositions = async () => {
    const res = await GetPositions();
    if (res) {
      setPositions(res);
    }
  };

  const handleEmployeeUpdate = (id: number) => {
    if (id) {
      window.location.href = `/login/employee/update/${id}`;
    }
  };

  const handleEmployeeDelete = async (id: number) => {
    if (id) {
      const success = await DeleteEmployeeByID(id);
      if (success) {
        alert("Employee deleted successfully");
        getEmployees(); // Refresh the list after deletion
      } else {
        alert("Failed to delete employee");
      }
    }
  };

  const handleClickOpen = (image?: string) => {
    if (image) {
      setSelectedImage(image);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography component="div">
                <Box sx={{ fontSize: "h6.fontSize", m: 1 }}>Employees</Box>
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <NavLink to='/login/employee/create'>
                <Button variant="contained" size="large" sx={{ px: 3, py: 1 }}>
                  <PlusOutlined />
                  Create
                </Button>
              </NavLink>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Profile</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Position</TableCell>
                  <TableCell align="right">Date of Birth</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow
                    key={employee.ID}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {employee.ID}
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center">
                        <Avatar
                          src={employee.Profile || ""} // Set a default empty string if profile is undefined
                          alt="avatar"
                          sx={{
                            width: 70,
                            height: 70,
                            objectFit: "cover",
                            cursor: 'pointer'
                          }}
                          onClick={() => handleClickOpen(employee.Profile)}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">{employee.FirstName}</TableCell>
                    <TableCell align="right">{employee.LastName}</TableCell>
                    <TableCell align="right">{employee.Email}</TableCell>
                    <TableCell align="right">{employee.Gender}</TableCell>
                    <TableCell align="right">
                      {positions.find(
                        (position) => position.ID === employee.PositionID
                      )?.Position_Name || "Unknown Position"}
                    </TableCell>
                    <TableCell align="right">
                      {employee.Date_of_Birth
                        ? new Date(employee.Date_of_Birth).toLocaleDateString()
                        : "Date not available"}
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          size="large"
                          sx={{ mr: 1, px: 2 }}
                          onClick={() => handleEmployeeUpdate(employee.ID!)}
                        >
                          <EditOutlined />
                        </Button>
                        <Button
                          size="large"
                          sx={{ color: "red", px: 2 }}
                          onClick={() => handleEmployeeDelete(employee.ID!)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {/* Dialog for full profile image */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Profile Image</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <img
              src={selectedImage || ""} // Set a default empty string if selectedImage is undefined
              alt="Profile"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
