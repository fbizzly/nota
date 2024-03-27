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
  Hidden,
  CircularProgress
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
  expandedContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  root: {

  },
  contentToPrint: {
    // Your regular styles for screen display
  },
  '@media print': {
    contentToPrint: {
      display: 'none',
      position: 'fixed',
      top: 1000,
      left: 0,
      width: '100%',
      height: '100%',
    },
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

function CollapseTop({ soSubtotal, layananSubtotal }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <Card onClick={handleExpand} sx={{ borderRadius: '16px' }}>
      <CardContent sx={{ paddingRight: 4, paddingLeft: 4 }}>
        <Grid container spacing={0} paddingBottom={1} sx={{ borderBottom: "1px dashed rgba(0, 0, 0, 0.1)" }} >
          <Grid item xs={6} sm={6}>
            <Typography sx={{ fontWeight: 'bold', fontSize: "1em" }}>Total Sale Order</Typography>
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography sx={{ fontWeight: 'bold', fontSize: "1em" }}>Pajak</Typography>
            </Collapse> */}
          </Grid>
          <Grid item xs={6} sm={6}>
            <Grid container>
              <Grid item xs={6} sm={6}>
                <Typography sx={{ fontWeight: 'bold', fontSize: "1em" }} align='right'>Rp. </Typography>
                {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Typography sx={{ fontWeight: 'bold', fontSize: "1em" }} align='right'>Rp. </Typography>
                </Collapse> */}
              </Grid>
              <Grid item xs={6} sm={6} align='right'>
                <Typography sx={{ fontWeight: 'bold', fontSize: "1em" }} align='right'>{ccyFormat(soSubtotal)}</Typography>
                {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Typography sx={{ fontWeight: 'bold', fontSize: "1em" }} align='right'>{ccyFormat(soSubtotal)}</Typography>
                </Collapse> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={0} marginTop={2}>
          <Grid item xs={6} sm={6}>
            <Typography sx={{ fontWeight: 'bold', fontSize: "1" }}>Total</Typography  >
            <Typography sx={{ fontWeight: 'bold', fontSize: "1" }}>Status</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Grid container>
              <Grid item xs={6} sm={6}>
                <Typography sx={{ fontWeight: 'bold', fontSize: "1em" }} align='right'>Rp. </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography sx={{ fontWeight: 'bold', fontSize: "1em" }} align='right'>{ccyFormat(layananSubtotal + soSubtotal)}</Typography>
              </Grid>
            </Grid>
            <Typography sx={{ fontWeight: 'bold', fontSize: "1em" }} align='right'><Button variant="contained" size="small" color="success">
              Selesai
            </Button></Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

function DataSo({ so, soSubtotal }) {

  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <>
      <Card sx={{ borderRadius: '16px' }}>
        <CardContent sx={{ paddingRight: 4, paddingLeft: 4 }}>
          <Typography color="text.secondary" gutterBottom component="div" sx={{ fontWeight: 'bold', fontSize: "1.2em", borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)' }}>
            Order
          </Typography>
          {so.map(row => (
            <Grid container key={row.id}>
              <Grid item xs={8}>
                <Typography color="text.secondary" gutterBottom>
                  {row.item_service} - {row.amount}
                </Typography>
              </Grid>
              <Grid item xs={4} align="right">
                {ccyFormat(parseFloat(row.price))}
              </Grid>
            </Grid>
          ))}
          <Grid container >
            <Grid item xs={8}>
              <Typography color="text.secondary" gutterBottom>
                Total
              </Typography>
            </Grid>
            <Grid item xs={4} align="right">
              {ccyFormat(parseFloat(soSubtotal))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
function CardHeaderCustom() {
  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardMedia
        sx={{ height: 140, paddingTop: '100px' }}
        image="https://firebasestorage.googleapis.com/v0/b/pet-client-profile.appspot.com/o/Logo%20Armonia%20Pet%20Care.png?alt=media"
      />
      <CardContent sx={{ paddingRight: 4, paddingLeft: 4 }}>
        <Typography gutterBottom component="div" sx={{ fontWeight: 'bold', fontSize: "1.2em", borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)' }}>
          Armonia Pet Care
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: "1em" }}>
          Ruko Griya Atirah Permai, Pai, Kec. Biringkanaya, Kota
          Makassar, Sulawesi Selatan 90242
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: "1em" }}>
          6287841964088
        </Typography>
      </CardContent>
    </Card >
  )
}

function CardUsers({ users }) {
  return (

    <Grid container sx={{ marginTop: 4 }} >
      <Grid item xs={4}>
        <Typography component="div" align="left" style={{ fontSize: "1em", fontWeight: "bold" }}>
          Nama
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="left" component="div" style={{ fontSize: "1em", fontWeight: "bold" }}>
          :
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography component="div" align="left" style={{ fontSize: "1em", fontWeight: "bold" }}>
          {users["name"]}
        </Typography>
      </Grid>

      {/* <Grid item xs={4}>
        <Typography component="div" align="left" style={{ fontSize: "1em", fontWeight: "bold" }}>
          Hewan
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="left" component="div" style={{ fontSize: "1em", fontWeight: "bold" }}>
          :
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography component="div" align="left" style={{ fontSize: "1em", fontWeight: "bold" }}>
          {users["pet"]}
        </Typography>
      </Grid> */}

      <Grid item xs={4}>
        <Typography component="div" style={{ fontSize: "1em", fontWeight: "bold" }}>
          Alamat
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="left" component="div" style={{ fontSize: "1em", fontWeight: "bold" }}>
          :
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography component="div" style={{ fontSize: "1em", fontWeight: "bold" }}>
          {users["alamat"]}
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography align="left" component="div" style={{ fontSize: "1em", fontWeight: "bold" }}>
          Nomor Hp
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="left" component="div" style={{ fontSize: "1em", fontWeight: "bold" }}>
          :
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography align="left" component="div" style={{ fontSize: "1em", fontWeight: "bold" }}>
          {users["phone"]}
        </Typography>
      </Grid>
    </Grid >
  )
}

function GenerateBarcode({ imageUrl, users }) {
  return (
    <Card sx={{ paddingRight: 4, paddingLeft: 4, paddingTop: 4 }}>
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
        <CardUsers users={users} />
      </CardContent>
    </Card>
  );
}

const TableSpanning = ({ services, layananSubtotal }) => {
  const classes = useStyles();
  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardContent sx={{ paddingRight: 4, paddingLeft: 4 }}>
        <Typography color="text.secondary" gutterBottom component="div" sx={{ fontWeight: 'bold', fontSize: "1.2em", borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)' }}>
          Layanan
        </Typography>
        {services.map(row => (
          <Grid container key={row.id}>
            <Grid item xs={8}>
              <Typography color="text.secondary" gutterBottom>
                {row.item_service} - {row.amount}
              </Typography>
            </Grid>
            <Grid item xs={4} align="right">
              {ccyFormat(parseFloat(row.price))}
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  )
}

function App_main({ match }) {
  const classes = useStyles();

  let { id } = useParams();
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [so, setSo] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [dataImg, setDataImg] = useState(true);
  async function fetchData() {
    await fetch(`http://localhost:9000/order/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.lenght != 0) {
          setServices(res);
        }
      });
    await fetch(`http://localhost:9000/user/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.lenght != 0) {
          setUsers(res[0]);
        }
      });
    await fetch(`http://localhost:9000/order/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.lenght != 0) {
          setSo(res)
        }
      });
    // await fetch(`https://firebasestorage.googleapis.com/v0/b/pet-client-profile.appspot.com/o/1.png?alt=media`)
    //   .then(async (res) => {
    //     const blob = await res.blob();
    //     const objectURL = URL.createObjectURL(blob);
    //     setDataImg(objectURL)
    //   })
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <LoadingPage />
    )
  }
  if (!services.length) {

    return (
      <NotFound />
    );
  }
  var layananSubtotal = 0;
  for (var i in services) {
    layananSubtotal += parseFloat(services[i].price, 10);
  }

  var soSubtotal = 0;
  for (var i in so) {
    soSubtotal += parseFloat(so[i].price, 10);
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
          <Grid container className={classes.contentToPrint} id="content-to-print">
            <Grid item xs={12} style={{ marginBottom: 10, marginTop: 10 }}>
              <CardHeaderCustom />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 10, marginTop: 10 }} >
              <GenerateBarcode imageUrl={'PV-20220101-2690'} users={users} />

            </Grid>
            {/* <Grid item xs={12} style={{ marginBottom: 10, marginTop: 10 }}>
              <TableSpanning services={services} layananSubtotal={layananSubtotal} />
            </Grid> */}
            <Grid item xs={12} style={{ marginBottom: 10, marginTop: 10 }}>
              <Card>
                <DataSo so={so} soSubtotal={soSubtotal} />
              </Card>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 10, marginTop: 10 }}>
              <CollapseTop soSubtotal={soSubtotal} layananSubtotal={layananSubtotal} />
            </Grid>
          </Grid>
        </Container>

        <Card sx={{ minWidth: 275, marginTop: 5 }}>
          <Container maxWidth="md">
            <CardContent>
              <Typography component="div" sx={{ fontSize: "1.2em", borderBottom: "1px solid rgba(0, 0, 0, 0.10)" }}>
                Syarat & Ketentuan
              </Typography>
              <br></br>
              <Typography component="div" sx={{ fontSize: "1em" }}>
                1. Syarat & Ketentuan 1
              </Typography>
              <Typography component="div" sx={{ fontSize: "1em" }}>
                2. Syarat & Ketentuan 2
              </Typography>
              <Typography component="div" sx={{ fontSize: "1em" }}>
                3. Syarat & Ketentuan 3
              </Typography>
            </CardContent>
          </Container>
        </Card>
      </ThemeProvider>
    </React.Fragment>
  );
}
function LoadingPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Grid container>
        <Grid item xs={12} align='center'>
          <CircularProgress />
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="h6">Loading...</Typography>
        </Grid>
      </Grid>
    </div>
  )
}

function NotFound() {
  const BoxWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '90vw'
    }
  }))
  return (
    <React.Fragment>
      <Box className='content-center'>
        <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <BoxWrapper>
            <Typography variant='h1'>404</Typography>
            <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
              Page Not Found ⚠️
            </Typography>
            <Typography variant='body2'>We couldn&prime;t find the page you are looking for.</Typography>
          </BoxWrapper>
        </Box>
      </Box>
    </React.Fragment>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotFound />} />
        <Route path="/nota/n/:id" element={<App_main />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
}
// ReactDOM.render(<App />, document.querySelector("#app"));
export default App;
