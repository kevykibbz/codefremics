"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { getAccessTokenFromCookies } from "@/utils/cookie";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddCustomer from "@/components/Customer/AddCustomer";
import CircularProgress from "@mui/material/CircularProgress";
interface Customer {
  customer_id: string;
  first_name: string;
  other_names: string;
  gender: string;
  email: string;
  mobile_number: string;
}

const Page = () => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, settLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      settLoading(true)
      try {
        const accessToken = getAccessTokenFromCookies();
        const response = await axios.get<Customer[]>(
          "https://stemprotocol.codefremics.com/api/v2/customers/get-merchant-customers/1",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log('response:',response)
        setCustomers(response.data?.response || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }finally{
        settLoading(false)
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0); 
  };

  const filteredCustomers = customers.filter((customer) => {
    const { first_name, other_names, customer_id, email } = customer;
    const query = searchQuery.toLowerCase();
  
    return (
      (first_name && first_name.toLowerCase().includes(query)) ||
      (other_names && other_names.toLowerCase().includes(query)) ||
      (customer_id && customer_id.toLowerCase().includes(query)) ||
      (email && email.toLowerCase().includes(query))
    );
  });
  

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page when changing rows per page
  };

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  const theme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "rgb(9, 5, 57)",
            borderRadius: "10px 0 0 10px",
            padding: "40px 30px",
            borderLeft: "1px solid rgb(98, 105, 216)",
            borderBottom: "1px solid rgb(98, 105, 216)",
            borderTop: "1px solid rgb(98, 105, 216)",
          },
        },
      },
    },
  });

  return (
    <>
      <div className="single-content">
        <div className="row head-area">
          <div className="col-md-6">
            <h5>Create customer</h5>
          </div>
          <div className="col-md-6 text-md-end">
            <button
              className="cmn-btn active"
              type="button"
              onClick={() => toggleDrawer(true)}
            >
              Add new customer
            </button>
          </div>
          <ThemeProvider theme={theme}>
            <Drawer
              anchor="right"
              open={open}
              onClose={() => toggleDrawer(false)}
            >
              <Box
                sx={{ width: 450 }}
                role="presentation"
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    toggleDrawer(false);
                  }
                }}
              >
                <IconButton
                  onClick={() => toggleDrawer(false)}
                  className="closeButton"
                  style={{ float: "right" }}
                >
                  <CloseIcon className="text-light" />
                </IconButton>
                <AddCustomer />
              </Box>
            </Drawer>
          </ThemeProvider>
        </div>
      </div>
      <div className="single-content">
        <div className="head-area d-flex align-items-center justify-content-between">
          <h5>Customers</h5>
        </div>
        <div className="main-content table-area">
          <Box display="flex" justifyContent="flex-end" marginBottom={2}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              onChange={handleSearch}
              InputLabelProps={{
                sx: {
                  color: "#fff",
                  "&.Mui-focused": {
                    color: "#6269d8",
                  },
                },
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6269d8",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6269d8",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6269d8",
                  },
                  "&.Mui-disabled": {
                    color: "#fff",
                  },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: "#6269d8" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="customer table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? 
                <>
                <TableRow >
                  <TableCell colSpan={4} >
                    <Box sx={{ display: 'flex',width:"100%" }}>
                      <CircularProgress size={25} sx={{ color: "#6269d8",marginRight: 1 }}/> 
                      <Typography variant="body2"  sx={{ fontWeight: 'bold',color:"#fff" }}>
                        Loading...
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
                </>
                :
                filteredCustomers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer,index) => (
                      <TableRow key={index} sx={{ cursor: 'pointer' }}>
                       <TableCell>
                          <Link href={`/profile/${customer.customer_id}`}>{customer.customer_id}</Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/profile/${customer.customer_id}`}>{customer.first_name}</Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/profile/${customer.customer_id}`}>{customer.other_names}</Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/profile/${customer.customer_id}`}>{customer.email}</Link>
                        </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="row">
            <div className="col-12 flex justify-content-center">
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                sx={{ width: "100% !important",color:"#6269d8"}}
                count={filteredCustomers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

// Styles for pagination controls
const TablePaginationActions = (props: any) => {
  const { onPageChange, page } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(
      event,
      Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1)
    );
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageRoundedIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <ChevronLeftRoundedIcon />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(props.count / props.rowsPerPage) - 1}
        aria-label="next page"
      >
        <ChevronRightRoundedIcon />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(props.count / props.rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageRoundedIcon />
      </IconButton>
    </Box>
  );
};
