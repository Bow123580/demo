import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
        <h1 style={{ textAlign: "center" }}>ระบบ ลงทะเบียนเรียน</h1>
        <h2 style={{ textAlign: "center" }}>ยินดีต้อนรับนักศึกษาเข้าสู่ระบบลงทะเรียน</h2>
        <p>
          
        </p>
      </Container>
    </div>
  );
}
export default Home;