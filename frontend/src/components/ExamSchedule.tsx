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
import { ExamScheduleInterface } from "../models/IExamSchedule";
import { format } from 'date-fns'

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

function ExamSchedules() {
  const classes = useStyles();
  const [ExamSchedule, setExamSchedules] = useState<ExamScheduleInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    },
  };

  const getExamSchedules = async () => {
    fetch(`${apiUrl}/examschedules`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setExamSchedules(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getExamSchedules();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={2}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลตารางสอบ
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/examschedule/create"
              variant="contained"
              color="primary"
            >
              เพิ่มตารางสอบ
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  ภาคการศึกษา
                </TableCell>
                <TableCell align="center" width="10%">
                  ปีการศึกษา
                </TableCell>
                <TableCell align="center" width="10%">
                  ประเภทการจัดสอบ
                </TableCell>
                <TableCell align="center" width="20%">
                  ชื่อรายวิชา
                </TableCell>
                <TableCell align="center" width="10%">
                  ห้องสอบ
                </TableCell>
                <TableCell align="center" width="15%">
                  วันที่สอบ
                </TableCell>
                <TableCell align="center" width="10%">
                  เวลาเริ่มต้น
                </TableCell>
                <TableCell align="center" width="10%">
                  เวลาสิ้นสุด
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ExamSchedule.map((item: ExamScheduleInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.Semester.Semester}</TableCell>
                  <TableCell align="center">{item.AcamedicYear}</TableCell>
                  <TableCell align="center">{item.ExamType.Type}</TableCell>
                  <TableCell align="center">{item.Course.Coursename}</TableCell>
                  <TableCell align="center">{item.RoomExam}</TableCell>
                  <TableCell align="center">{format((new Date(item.DateExam)), 'dd MMMM yyyy')}</TableCell>
                  <TableCell align="center">{format((new Date(item.StartTime)),'hh:mm a')}</TableCell>
                  <TableCell align="center">{format((new Date(item.EndTime)),'hh:mm a')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default ExamSchedules;