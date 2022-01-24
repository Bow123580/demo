import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
<<<<<<< HEAD
import { Button, Grid } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
=======
>>>>>>> e159a46eb8d75ab8b1e71a0d432a911c4948f880

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
      <Container className={classes.container} maxWidth="md">
<<<<<<< HEAD
        <h1 style={{ textAlign: "center" }}>ระบบลงทะเบียนเรียน</h1>
        <h3> </h3>

        <Grid item xs={12}>
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
        </Grid>
      </Container>
    </div >
=======
        <h1 style={{ textAlign: "center" }}>ระบบ ลงทะเบียนเรียน</h1>
        <h2 style={{ textAlign: "center" }}>ยินดีต้อนรับนักศึกษาเข้าสู่ระบบลงทะเรียน</h2>
        <p>
          
        </p>
      </Container>
    </div>
>>>>>>> e159a46eb8d75ab8b1e71a0d432a911c4948f880
  );
}
export default Home;