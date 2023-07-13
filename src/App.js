import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import QRCode from 'qrcode.react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  tableCellClasses,
  Typography,
  Image,
  CssBaseline,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
  createTheme,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams
} from "react-router-dom";
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const theme = createTheme({
  palette: {
    background: {
      default: "#EFEFEF" // Set your desired background color here
    },
  }
});

function CardHeader(){
  return(
    <Card sx={{paddingRight:10, paddingLeft:10}}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://firebasestorage.googleapis.com/v0/b/pet-client-profile.appspot.com/o/1.png?alt=media"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          Armonia Pet Care
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ruko Griya Atirah Permai, Pai, Kec. Biringkanaya, Kota
          Makassar, Sulawesi Selatan 90242
        </Typography>
        <Typography variant="body2" color="text.secondary">
          6287841964088
        </Typography>
      </CardContent>
    </Card>
  )
}

function CardUsers({users}){
  return(
    <Card sx={{paddingRight:10, paddingLeft:10 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Nama: {users["name"]}
        </Typography>
        <Typography variant="h5" component="div">
          Pet: {users["name"]}
        </Typography>
        <Typography variant="h5" component="div">
          Alamat: {users["alamat"]}
        </Typography>
        <Typography variant="h5" component="div">
          Phone: {users["phone"]}
        </Typography>
        <Typography></Typography>
      </CardContent>
    </Card>
  )
}

function DataService({services}){
  const columns = [
    { field: 'id', headerName: 'No', width: 90 },
    {
      field: 'item_service',
      headerName: 'Service',
      width: 150,
    },
    {
      field: 'doctor',
      headerName: 'Doctor',
      width: 150,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Unit Price',
      type: 'number',
      width: 150,
    },
    {
      field: 'fixed_price',
      headerName: 'Total Price',
      type: 'number',
      width: 150,
    }
  ];
  return(
    <Box sx={{ bgcolor: "white", height: 400, width: '100%', paddingRight:10, paddingLeft:10 }}>
      <DataGrid
        rows={services}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  )
}

function DataTable({services}){
  console.log(services)
  return(
    <TableContainer component={Paper} sx={{paddingRight:10, paddingLeft:10}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="right">Service</StyledTableCell>
            <StyledTableCell align="right">Doctor</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Unit Price</StyledTableCell>
            <StyledTableCell align="right">Total Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.item_service}</StyledTableCell>
              <StyledTableCell align="right">{row.doctor}</StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.fixed_price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
function GenerateBarcode({imageUrl}){
  return (
    <div style={{
      display: "flex",
      justifyContent: "center"
      }}>
      <Stack spacing={2}>
        <Item><QRCode value={imageUrl} size={300} /></Item>
        <Item>{imageUrl}</Item>
      </Stack>
    </div>
  );
}

function App_main({ match }) {
  let { id } = useParams();
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await fetch(`http://localhost:9000/PV-20220101-2690`, {
      // await fetch(`https://19c7-158-140-163-37.ngrok-free.app/PV-20220101-2690`, {
      headers: {
        "ngrok-skip-browser-warning": "*"
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.lenght != 0) {
          setServices(res);
          setUsers(res[0]);
        }
      });
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <svg viewBox="50 90 100 10" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="50" rx="100" ry="50" style={{
              fill: "white"
            }}></ellipse>
        </svg>
        <Container maxWidth="md">
          <Box sx={{ boxShadow: 23, bgcolor: "white"}}>
            <CardHeader/>
            <br></br>
            <GenerateBarcode imageUrl={'PV-20220101-2690'}/>
            <br></br>
            <CardUsers users={users}/>
            {/* <DataService services={services}/> */}
            <DataTable services={services}/>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

function NotFound() {
  return <h1>404 Not Found</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App_main />} />
        <Route path="/:id" element={<App_main />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
}
// ReactDOM.render(<App />, document.querySelector("#app"));
export default App;
