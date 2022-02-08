import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { SigninInterface } from "../models/ISignin";
import { AppBar, Tabs, Tab, Box, Card } from "@material-ui/core";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}><Typography>{children}</Typography></Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  card: {marginTop: theme.spacing(7),},
  paper: { marginTop: theme.spacing(5), display: "flex", flexDirection: "column", alignItems: "center", },
  avatar: { margin: theme.spacing(2), backgroundColor: theme.palette.secondary.main, },
  form: { width: "100%", marginTop: theme.spacing(1), },
  submit: { margin: theme.spacing(3, 0, 2), },
}));


function SignIn() {
  const classes = useStyles();
  const [signin, setSignin] = useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = React.useState(0);

  const loginStudent = () => {
    const apiUrl = "http://localhost:8080/student/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("uid", res.data.id);
          localStorage.setItem("role", res.data.role);
          window.location.reload()
        } else {
          setError(true);
        }
      });
  };

  const loginRegistrar = () => {
    const apiUrl = "http://localhost:8080/registrar/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("uid", res.data.id);
          localStorage.setItem("role", res.data.role);
          window.location.reload()
        } else {
          setError(true);
        }
      });
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          เข้าสู่ระบบสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          ไอดีหรือรหัสผ่านไม่ถูกต้อง
        </Alert>
      </Snackbar>
      <CssBaseline />
     <Card className={classes.card}> 
       <div className={classes.paper} >
        
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="secondary" aria-label="simple tabs example" >
              <Tab label="นักศึกษา" {...a11yProps(0)} />
              <Tab label="ฝ่ายทะเบียน" {...a11yProps(1)} />
            </Tabs>

          <TabPanel value={value} index={0}>

            <form className={classes.form} noValidate >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="UserCode"
                label="ID Address"
                name="UserCode"
                autoComplete="usercode"
                autoFocus
                value={signin.UserCode || ""}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="Password"
                autoComplete="current-password"
                value={signin.Password || ""}
                onChange={handleInputChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={loginStudent}
              >
                Sign In 
              </Button>
            </form>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="UserCode"
                label="ID Address"
                name="UserCode"
                autoComplete="usercode"
                autoFocus
                value={signin.UserCode || ""}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="Password"
                autoComplete="current-password"
                value={signin.Password || ""}
                onChange={handleInputChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={loginRegistrar}
              >
                Sign In
              </Button>
            </form>
          </TabPanel>
          
        </div>
        </Card>
    </Container>
  );
}

export default SignIn;
