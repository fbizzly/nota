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
  Collapse,
  Divider,
  Button,
  IconButton,
  Hidden
} from "@mui/material";
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams
} from "react-router-dom";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./App.css";
import numeral from 'numeral';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  tableRow: {
    marginTop: theme.spacing(2),
  },
  expandedContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  root: {
  },
}));

const theme = createTheme({
  palette: {
    background: {
      default: "#EFEFEF" // Set your desired background color here
    },
  }
});

const ccyFormat = num => {
  return `${numeral(num).format('0,0.00')}`
}

function DataSo({so, soSubtotal, layananSubtotal}){

  const [expandedRow, setExpandedRow] = useState(null);

  const handleExpand = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };
  
  return (
    <TableContainer component={Paper} sx={{paddingRight:10, paddingLeft:10, paddingBottom: 10}}>
      <Table aria-label='spanning table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' style={{fontWeight: "bold"}} colSpan={7}>
              Details
            </TableCell>
            <TableCell align='center' style={{fontWeight: "bold"}} colSpan={5}>Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1} align="left">No</TableCell>
            <TableCell colSpan={4} align="left">Service</TableCell>
            <TableCell colSpan={2} align="right">Amount</TableCell>
            <TableCell colSpan={2} align="right">Unit Price</TableCell>
            <TableCell colSpan={2} align="right">Total Price</TableCell>
            <TableCell colSpan={1} align="right">Test</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {so.map(row => (
              <React.Fragment key={row.id}>
                <TableRow onClick={() => handleExpand(row.id)}>
                  <TableCell colSpan={1}>{row.id}</TableCell>
                  <TableCell colSpan={4} align="left">{row.item_service}</TableCell>
                  <TableCell colSpan={2} align="right">{row.amount}</TableCell>
                  <TableCell colSpan={2} align="right">{ccyFormat(parseFloat(row.fixed_price))}</TableCell>
                  <TableCell colSpan={2} align="right">{ccyFormat(parseFloat(row.price))}</TableCell>
                  <TableCell colSpan={1} align="right">
                    <IconButton onClick={handleExpand}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: 0 }} colSpan={12}>
                    <Collapse in={expandedRow === row.id} timeout="auto" unmountOnExit>
                      {/* Your collapsible content */}
                      <div>
                        <p>Content goes here...</p>
                      </div>
                    </Collapse>
                    </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
            <TableRow>
              <TableCell colSpan={4} rowSpan={3} />
              <TableCell colSpan={4}><Typography align="left" component="div" style={{fontWeight: "bold"}}>Subtotal Layanan: </Typography></TableCell>
              <TableCell colSpan={4} align='right' style={{fontWeight: ""}}>{ccyFormat(layananSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}><Typography align="left" component="div" style={{fontWeight: "bold"}}>Subtotal Sale Order: </Typography></TableCell>
              <TableCell colSpan={4} align='right' style={{fontWeight: ""}}>{ccyFormat(soSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}><Typography align="left" component="div" style={{fontWeight: "bold"}}>Total: </Typography></TableCell>
              <TableCell colSpan={4} align='right' style={{fontWeight: ""}}>{ccyFormat(layananSubtotal + soSubtotal)}</TableCell>
            </TableRow>
          </TableBody>
      </Table>
    </TableContainer>
  )
}
function CardHeaderCustom(){
  return(
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image="https://firebasestorage.googleapis.com/v0/b/pet-client-profile.appspot.com/o/1.png?alt=media"
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

const TableSpanning = ({services, soSubtotal, layananSubtotal}) => {
  const classes = useStyles();
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
              <TableCell colSpan={2} align="right">{ccyFormat(parseFloat(row.fixed_price))}</TableCell>
              <TableCell colSpan={2} align="right">{ccyFormat(parseFloat(row.price))}</TableCell>
            </TableRow>
          ))}
            <TableRow>
              <TableCell colSpan={4} rowSpan={3} />
              <TableCell colSpan={4}><Typography align="left" component="div" style={{fontWeight: "bold"}}>Subtotal Layanan: </Typography></TableCell>
              <TableCell colSpan={4} align='right' style={{fontWeight: ""}}>{ccyFormat(layananSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}><Typography align="left" component="div" style={{fontWeight: "bold"}}>Subtotal Sale Order: </Typography></TableCell>
              <TableCell colSpan={4} align='right' style={{fontWeight: ""}}>{ccyFormat(soSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}><Typography align="left" component="div" style={{fontWeight: "bold"}}>Total: </Typography></TableCell>
              <TableCell colSpan={4} align='right' style={{fontWeight: ""}}>{ccyFormat(layananSubtotal + soSubtotal)}</TableCell>
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
  const [so, setSo] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await fetch(`http://localhost:9000/layanan/PV-20220101-2690`)
    .then((res) => res.json())
    .then((res) => {
      if (res.lenght != 0) {
        setServices(res);
      }
    });
    await fetch(`http://localhost:9000/user/PV-20220101-2690`)
    .then((res) => res.json())
    .then((res) => {
      if (res.lenght != 0) {
        setUsers(res[0]);
      }
    });
    await fetch(`http://localhost:9000/so/PV-20220101-2690`)
    .then((res) => res.json())
    .then((res) => {
      if (res.lenght != 0) {
        setSo(res)
      }
    });
  };

  var layananSubtotal = 0;
  for (var i in so){
     layananSubtotal += parseFloat(so[i].price, 10);
  }

  var soSubtotal = 0;
  for (var i in services){
     soSubtotal += parseFloat(services[i].price, 10);
  }
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
            <Grid item xs={12} style={{ marginBottom: 10, marginTop: 20 }} boxShadow={20}>
              <CardHeaderCustom/>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 20, marginTop: 20}} boxShadow={20}>
              <GenerateBarcode imageUrl={'PV-20220101-2690'}/>
              <CardUsers users={users}/>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 20, marginTop: 20 }} boxShadow={20}>
              <Card>
                <CardHeader title='Layanan' sx={{paddingTop:10, paddingRight:10, paddingLeft:10, fontWeight: 'bold' }} titleTypographyProps={{ variant: 'h4' }} />
                <TableSpanning services={services} soSubtotal={soSubtotal} layananSubtotal={layananSubtotal}/>
              </Card>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 20, marginTop: 20}} boxShadow={20}>
              <Card>
                <CardHeader title='Sale Order' sx={{paddingTop:10, paddingRight:10, paddingLeft:10, fontWeight: 'bold' }} titleTypographyProps={{ variant: 'h4' }} />
                <DataSo so={so} soSubtotal={soSubtotal} layananSubtotal={layananSubtotal}/>
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
