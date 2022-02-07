import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import NavBar from "./Navbar";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },

    container: {
      marginTop: theme.spacing(2),
    },

  })
);

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <NavBar />
      <div className={classes.drawerHeader} />
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบลงทะเบียนเรียน</h1>
        <h2>ยินดีต้อนรับสู่ระบบลงทะเรียน</h2>
      </Container>
    </div>
  );
}
