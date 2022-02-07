import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { RequestExamInterface } from "../models/IRequestExam";
import { format } from 'date-fns'
import NavBar from "./Navbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 800,
    },
    tableSpace: {
      marginTop: 10,
    },
  })
);

export default function RequestExams() {
  const classes = useStyles();
  const [requestexams, setRequestExams] = useState<RequestExamInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getRequestExams = async () => {
    fetch(`${apiUrl}/request_exams`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setRequestExams(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getRequestExams();
  }, []);

  return (
    <div>
      <NavBar />
      <Container className={classes.container} maxWidth="xl">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลคำร้องขอสอบซ้ำซ้อน
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/request_exam/create"
              variant="contained"
              color="primary"
            >
              สร้างคำร้อง
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="5%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="17%">
                  นักศึกษา
                </TableCell>
                <TableCell align="center" width="16%">
                  ภาคการศึกษา
                </TableCell>
                <TableCell align="center" width="11%">
                  ปีการศึกษา
                </TableCell>
                <TableCell align="center" width="4%">
                  รายวิชา
                </TableCell>
                <TableCell align="center" width="16%">
                  อาจารย์ผู้สอน
                </TableCell>
                <TableCell align="center" width="5%">
                  เบอร์ติดต่อ
                </TableCell>
                <TableCell align="center" width="14%">
                  สถานะคำร้อง
                </TableCell>
                <TableCell align="center" width="20%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestexams.map((item: RequestExamInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Student.Name}</TableCell>
                  <TableCell align="center">{item.Semester.Semester}</TableCell>
                  <TableCell align="center">{item.AcademicYear}</TableCell>
                  <TableCell align="center">{item.Course.Coursename}</TableCell>
                  <TableCell align="center">{item.Teacher.Name}</TableCell>
                  <TableCell align="center">{item.Tel}</TableCell>
                  <TableCell align="center">{item.RequestStatus.Status}</TableCell>
                  <TableCell align="center">{format((new Date(item.RequestTime)), 'dd MMMM yyyy hh:mm a')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}