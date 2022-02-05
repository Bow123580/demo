import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { CoursesInterface } from "../models/ICourse";
import { ProgramsInterface } from "../models/IProgram";
import { TeachersInterface } from "../models/ITeacher";
import { AddCoursesInterface } from "../models/IAddCourse";

import NavBar from './NavBar';


import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function AddCourseCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [courses, setCourses] = useState<CoursesInterface[]>([]);
  const [programs, setPrograms] = useState<ProgramsInterface[]>([]);
  const [teachers, setTeachers] = useState<TeachersInterface[]>([]);
  const [addcourses, setAddCourse] = useState<Partial<AddCoursesInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof addcourses;
    setAddCourse({
      ...addcourses,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const name = event.target.id as keyof typeof addcourses;
    setAddCourse({
      ...addcourses,
      [name]: event.target.value,
    });
  };

  const getCourses = async () => {
    fetch(`${apiUrl}/courses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCourses(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPrograms = async () => {
    fetch(`${apiUrl}/programs`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPrograms(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getTeachers = async () => {
    fetch(`${apiUrl}/teachers`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTeachers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getCourses();
    getPrograms();
    getTeachers();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      CourseID: convertType(addcourses.CourseID),
      ProgramID: convertType(addcourses.ProgramID),
      TeacherID: convertType(addcourses.TeacherID),
      Credit: convertType(addcourses.Credit),
      DayTime: addcourses.DayTime ?? "",
      SaveTime: selectedDate || "",
    };

    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/addcourse`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
        }
      });
  }

  return (
    <Container className={classes.container} maxWidth="sm">
      <NavBar />
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการเพิ่มรายวิชา
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <Typography
                color="textPrimary"
              >
                รหัสรายวิชา
              </Typography>
              <Select
                native
                value={addcourses.CourseID}
                onChange={handleChange}
                inputProps={{
                  name: "CourseID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกรหัสรายวิชา
                </option>
                {courses.map((item: CoursesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Coursenumber} - {item.Coursename}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <Typography
                color="textPrimary"
              >
                หลักสูตร
              </Typography>
              <Select
                native
                value={addcourses.ProgramID}
                onChange={handleChange}
                inputProps={{
                  name: "ProgramID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหลักสูตร
                </option>
                {programs.map((item: ProgramsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Programname}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <Typography
                color="textPrimary"
              >
                อาจารย์ผู้สอน
              </Typography>
              <Select
                native
                value={addcourses.TeacherID}
                onChange={handleChange}
                inputProps={{
                  name: "TeacherID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกอาจารย์ผู้สอน
                </option>
                {teachers.map((item: TeachersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>

            <p>จำนวนหน่วยกิต</p>

            <FormControl fullWidth variant="outlined">

              <TextField

                id="Credit"

                variant="outlined"

                type="number"

                size="medium"

                InputProps={{ inputProps: { min: 1} }}

                InputLabelProps={{ shrink: true,}}

                value={addcourses.Credit || ""}

                onChange={handleInputChange}

              />

            </FormControl>

          </Grid> 
          <Grid item xs={6}>

            <p>วันที่และเวลาที่สอน</p>

            <FormControl fullWidth variant="outlined">

              <TextField

                id="DayTime"

                variant="outlined"

                type="string"

                size="medium"

                value={addcourses.DayTime }

                onChange={handleInputChange}

              />

            </FormControl>

          </Grid> 
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลาที่บันทึก</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="SaveTime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="กรุณาเลือกวันที่และเวลา"
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/addcourse"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AddCourseCreate;
