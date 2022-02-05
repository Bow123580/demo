import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import NavBar from "./NavBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div>
      <NavBar />
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบลงทะเบียนเรียน</h1>
        <h3> </h3>

        {/* <Grid item xs={12}>
          <Button
            component={RouterLink}
            style={{ float: "left" }}
            to="/students"
            variant="contained"
            color="inherit"
          >
            นักศึกษา
          </Button><Button
            component={RouterLink}
            style={{ float: "right" }}
            to="/registrars"
            variant="contained"
            color="inherit"
          >
            ฝ่ายทะเบียน
          </Button>
        </Grid> */}
      </Container>
    </div >
  );
}
export default Home;
