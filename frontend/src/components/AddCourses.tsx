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
import { AddCoursesInterface } from "../models/IAddCourse";
import { format } from 'date-fns'
import NavBar from "./Navbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 10,
    },
    tableSpace: {
      marginTop: 10,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  })
);

export default function AddCourses() {
  const classes = useStyles();
  const [addcourse, setAddCourses] = useState<AddCoursesInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getAddCourse = async () => {
    fetch(`${apiUrl}/addcourses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setAddCourses(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getAddCourse();
  }, []);

  return (
    <div>
      <NavBar />
      <div className={classes.drawerHeader} />
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              รายวิชาที่จะเปิดสอนในภาคการศึกษานี้
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/addcourse/create"
              variant="contained"
              color="primary"
            >
              เพิ่มรายวิชาที่จะเปิดสอน
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  ชื่อรายวิชา
                </TableCell>
                <TableCell align="center" width="10%">
                  รหัสรายวิชา
                </TableCell>
                <TableCell align="center" width="10%">
                  หลักสูตร
                </TableCell>
                <TableCell align="center" width="10%">
                  อาจารย์ผู้สอน
                </TableCell>
                <TableCell align="center" width="10%">
                  จำนวนหน่วยกิต
                </TableCell>
                <TableCell align="center" width="10%">
                  วันที่เวลาที่สอน
                </TableCell>
                <TableCell align="center" width="10%">
                  วันที่และเวลาทีบันทึก
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addcourse.map((item: AddCoursesInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.Course.Coursename}</TableCell>
                  <TableCell align="center">{item.Course.Coursenumber}</TableCell>
                  <TableCell align="center">{item.Program.Programname}</TableCell>
                  <TableCell align="center">{item.Teacher.Name}</TableCell>
                  <TableCell align="center">{item.Credit}</TableCell>
                  <TableCell align="center">{item.DayTime}</TableCell>
                  <TableCell align="center">{format((new Date(item.SaveTime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}