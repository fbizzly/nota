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
  Stack,
  Grid,
  CardHeader,
  Hidden
} from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams
} from "react-router-dom";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// const useStyles = makeStyles((theme) => ({
//   tableRow: {
//     marginTop: theme.spacing(2),
//   },
// }));

const theme = createTheme({
  palette: {
    background: {
      default: "#EFEFEF" // Set your desired background color here
    },
  }
});

function CardHeaderCustom(){
  return(
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image="https://firebasestorage.googleapis.com/v0/b/pet-client-profile.appspot.com/o/1.png?alt=media"
        title="green iguana"
      />
      <CardContent sx={{paddingRight:10, paddingLeft:10}}>
        <Typography gutterBottom variant="h3" component="div" sx={{fontWeight: 'bold', borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)'}}>
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
    <Card sx={{paddingRight:10, paddingLeft:10, paddingBottom: 5 }}>
      
      <CardContent>
        <Grid container spacing={0} alignItems="flex-start">
          <Grid item xs={2}>
            <Typography component="div" style={{fontWeight: "bold"}}>
              Nama
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="left" component="div" style={{fontWeight: "bold"}}>
              :
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography component="div" style={{fontWeight: "bold"}}>
              {users["name"]}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="div" style={{fontWeight: "bold"}}>
              Hewan
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="left" component="div" style={{fontWeight: "bold"}}>
              :
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography component="div" style={{fontWeight: "bold"}}>
              {users["pet"]}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="div" style={{fontWeight: "bold"}}>
              Alamat
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="left" component="div" style={{fontWeight: "bold"}}>
              :
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography component="div" style={{fontWeight: "bold"}}>
              {users["alamat"]}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="div" style={{fontWeight: "bold"}}>
              Nomor Hp
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="left" component="div" style={{fontWeight: "bold"}}>
              :
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography component="div" style={{fontWeight: "bold"}}>
              {users["phone"]}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

function GenerateBarcode({imageUrl}){
  return (
    <Card sx={{paddingRight:10, paddingLeft:10, paddingTop: 10}}>
      <CardContent>
        <div style={{
          display: "flex",
          justifyContent: "center"
          }}>
          <Stack spacing={2}>
            <Item><QRCode value={imageUrl} size={300} /></Item>
            <Item>{imageUrl}</Item>
          </Stack>
        </div>
      </CardContent>
    </Card>
  );
}

const TableSpanning = ({services}) => {
  // const classes = useStyles();
  const ccyFormat = num => {
    return `${num.toFixed(2)}`
  }
  var invoiceSubtotal = 0;
  for (var i in services){
     invoiceSubtotal += parseInt(services[i].price, 10);
  }
  return (
    <TableContainer component={Paper} sx={{paddingRight:10, paddingLeft:10, paddingBottom: 10}}>
      <Table aria-label='spanning table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' style={{fontWeight: "bold"}} colSpan={8}>
              Details
            </TableCell>
            <TableCell align='center' style={{fontWeight: "bold"}} colSpan={4}>Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1} align="left">No</TableCell>
            <TableCell colSpan={3} align="left">Service</TableCell>
            <TableCell colSpan={3} align="left">Doctor</TableCell>
            <TableCell colSpan={1} align="right">Amount</TableCell>
            <TableCell colSpan={2} align="right">Unit Price</TableCell>
            <TableCell colSpan={2} align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map(row => (
            <TableRow key={row.id}>
              <TableCell colSpan={1}>{row.id}</TableCell>
              <TableCell colSpan={3} align="left">{row.item_service}</TableCell>
              <TableCell colSpan={3} align="left">{row.doctor}</TableCell>
              <TableCell colSpan={1} align="right">{row.amount}</TableCell>
              <TableCell colSpan={2} align="right">{ccyFormat(parseInt(row.fixed_price))}</TableCell>
              <TableCell colSpan={2} align="right">{ccyFormat(parseInt(row.price))}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} rowSpan={3} />
            <TableCell colSpan={4}><Typography align="left" component="div" style={{fontWeight: "bold"}}>Subtotal: </Typography></TableCell>
            <TableCell colSpan={4} align='right' style={{fontWeight: "bold"}}>{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
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
        <Container maxWidth="md" >
          <Grid container>
            <Grid item xs={12} style={{ marginBottom: 10, marginTop: 100 }} boxShadow={20}>
              <CardHeaderCustom/>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 100, marginTop: 100}} boxShadow={20}>
              <GenerateBarcode imageUrl={'PV-20220101-2690'}/>
              <CardUsers users={users}/>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 100, marginTop: 20 }} boxShadow={20}>
              <Card>
                <CardHeader title='Layanan' sx={{paddingTop:10, paddingRight:10, paddingLeft:10, fontWeight: 'bold' }} titleTypographyProps={{ variant: 'h4' }} />
                <TableSpanning services={services}/>
              </Card>
            </Grid>
          </Grid>
        </Container>
       

        <Card sx={{ minWidth: 275 , marginTop: 5}}>
          <Container maxWidth="md">
            <CardContent>
              <Typography variant="h4" component="div" sx={{borderBottom: "1px solid rgba(0, 0, 0, 0.10)"}}>
                Syarat & Ketentuan
              </Typography>
              <br></br>
              <Typography component="div">
              1. Syarat & Ketentuan 1
              </Typography>
              <Typography component="div">
              2. Syarat & Ketentuan 2
              </Typography>
              <Typography component="div">
              3. Syarat & Ketentuan 3
              </Typography>
            </CardContent>
          </Container>
        </Card>
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
