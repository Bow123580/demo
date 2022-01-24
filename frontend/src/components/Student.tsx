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
import { StudentsInterface } from "../models/IStudent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: { marginTop: theme.spacing(2), },
    table: { minWidth: 650, },
    tableSpace: { marginTop: 20, },
  })
);

function Students() {
  const classes = useStyles();
  const [students, setStudents] = useState<StudentsInterface[]>([]);
  let uid = localStorage.getItem("uid");
  const getStudents = async () => {
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/students/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStudents(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getStudents();
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
              ข้อมูลนักศึกษา
            </Typography>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="20%">
                  รหัสนักศึกษา
                </TableCell>
                <TableCell align="center" width="20%">
                  คำนำหน้า
                </TableCell>
                <TableCell align="center" width="20%">
                  ชื่อ - นามสกุล
                </TableCell>
                <TableCell align="center" width="20%">
                  สาขาวิชา
                </TableCell>
                <TableCell align="center" width="20%">
                  ระดับชั้นปี
                </TableCell>
                <TableCell align="center" width="20%">
                  อีเมล
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((user: StudentsInterface) => (
                <TableRow key={user.ID}>
                  <TableCell align="center">{user.ID_student}</TableCell>
                  <TableCell align="center">{user.Prefix}</TableCell>
                  <TableCell align="center">{user.Name}</TableCell>
                  <TableCell align="center">{user.Major}</TableCell>
                  <TableCell align="center">{user.Year}</TableCell>
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

export default Students;