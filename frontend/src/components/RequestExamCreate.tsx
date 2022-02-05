import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
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
import TextField from "@material-ui/core/TextField";

import { StudentsInterface } from "../models/IStudent";
import { SemestersInterface } from "../models/ISemester";
import { CoursesInterface } from "../models/ICourse";
import { TeachersInterface } from "../models/ITeacher";
import { RequestStatusesInterface } from "../models/IRequestStatus";
import { RequestExamInterface } from "../models/IRequestExam";

import NavBar from "./NavBar";

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

function RequestExamCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [students, setStudents] = useState<Partial<StudentsInterface>>({});
  const [semesters, setSemesters] = useState<SemestersInterface[]>([]);
  const [courses, setCourses] = useState<CoursesInterface[]>([]);
  const [teachers, setTeachers] = useState<TeachersInterface[]>([]);
  const [requeststatuses, setRequestStatuses] = useState<RequestStatusesInterface[]>([]);

  const [requestexam, setRequestExam] = useState<Partial<RequestExamInterface>>({});
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
    const name = event.target.name as keyof typeof requestexam;
    setRequestExam({
      ...requestexam,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>
 
  ) => {
 
    const id = event.target.id as keyof typeof RequestExamCreate;
 
    const { value } = event.target;
 
    setRequestExam({ ...requestexam, [id]: value });
 
  };


  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getStudents = async () => {
    const uid = Number(localStorage.getItem("uid"));
    fetch(`${apiUrl}/student/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStudents(res.data);
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

  const getRequestStatuses = async () => {
    fetch(`${apiUrl}/requeststatuses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRequestStatuses(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getSemesters = async () => {
    fetch(`${apiUrl}/semesters`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSemesters(res.data);
        } else {
          console.log("else");
        }
      });
  };


  useEffect(() => {
    getStudents();
    getTeachers();
    getCourses();
    getRequestStatuses();
    getSemesters();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };



  function submit() {
    let data = {
      StudentID: convertType(students?.ID),
      SemesterID: convertType(requestexam.SemesterID),
      AcademicYear: convertType(requestexam.AcademicYear),
      CourseID: convertType(requestexam.CourseID),
      Tel: requestexam.Tel ?? "",
      TeacherID: convertType(requestexam.TeacherID),
      RequestStatusID: convertType(requestexam.RequestStatusID),
      
      RequestTime: selectedDate,
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

    fetch(`${apiUrl}/request_exams`, requestOptionsPost)
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
    <Container className={classes.container} maxWidth="md">
      <NavBar />
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกคำร้องสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกคำร้องไม่สำเร็จ
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
              บันทึกคำร้อง
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>นักศึกษา</p>
              <Select
                native
                disabled
                value={requestexam.StudentID}
                
              >
                  <option aria-label="None" value="">
                    {students?.Name}
                  </option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
          <FormControl fullWidth variant="outlined">
              <p>ภาคการศึกษา</p>
              <Select
                native
                value={requestexam.SemesterID}
                onChange={handleChange}
                inputProps={{
                  name: "SemesterID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกภาคการศึกษา
                </option>
                {semesters.map((item: SemestersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Semester}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>


         <Grid item xs={3}>
           <FormControl fullWidth variant="outlined">
           <p>ปีการศึกษา</p>

            <TextField

              id="AcademicYear"

              variant="outlined"

              type="number"

              size="medium"

              InputProps={{ inputProps: { min: 1 } }}

              InputLabelProps={{

                shrink: true,

              }}

              value={requestexam.AcademicYear || ""}

              onChange={handleInputChange}

            />
           </FormControl>
         </Grid>
         <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>รายวิชา</p>
              <Select
                native
                value={requestexam.CourseID}
                onChange={handleChange}
                inputProps={{
                  name: "CourseID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกวิชา
                </option>
                {courses.map((item:CoursesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Coursename}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

         
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อาจารย์ผู้สอน</p>
              <Select
                native
                value={requestexam.TeacherID}
                onChange={handleChange}
                inputProps={{
                  name: "TeacherID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกอาจารย์ผู้สอน
                </option>
                {teachers.map((item:TeachersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
          <p>กรุณากรอกเบอร์ติดต่อของนักศึกษา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Tel"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกห้องสอบ"
                value={requestexam.Tel || ""}
                onChange={handleInputChange}
              />
          </FormControl>

         </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สถานะคำร้อง</p>
              <Select
                native
                value={requestexam.RequestStatusID}
                onChange={handleChange}
                inputProps={{
                  name: "RequestStatusID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสถานะ
                </option>
                {requeststatuses.map((item:RequestStatusesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Status}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="RequestExamTime"
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
              to="/request_exams"
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

export default RequestExamCreate;
