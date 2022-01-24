import { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { RegistrarsInterface } from "../models/IRegister";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: { marginTop: theme.spacing(2), },
    table: { minWidth: 650, },
    tableSpace: { marginTop: 20, },
  })
);

function Registrars() {
  const classes = useStyles();
  const [registrars, setRegistrars] = useState<RegistrarsInterface[]>([]);
  let uid = localStorage.getItem("uid");
 
  const getRegistrars = async () => {
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/registrars/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRegistrars(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getRegistrars();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="xl">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลฝ่ายทะเบียน
            </Typography>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="20%">
                  รหัสฝ่ายทะเบียน
                </TableCell>
                <TableCell align="center" width="20%">
                  คำนำหน้า
                </TableCell>
                <TableCell align="center" width="20%">
                  ชื่อ - นามสกุล
                </TableCell>
                <TableCell align="center" width="20%">
                  อีเมล
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registrars.map((user: RegistrarsInterface) => (
                <TableRow key={user.ID}>
                  <TableCell align="center">{user.ID_registrar}</TableCell>
                  <TableCell align="center">{user.Prefix}</TableCell>
                  <TableCell align="center">{user.Name}</TableCell>
                  <TableCell align="center">{user.Email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Registrars;