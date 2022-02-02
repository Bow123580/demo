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

import { ExamTypesInterface } from "../models/IExamType";
import { SemestersInterface } from "../models/ISemester";
import { CoursesInterface } from "../models/ICourse";
import { ExamScheduleInterface } from "../models/IExamSchedule";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TextField } from "@material-ui/core";

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

function ExamScheduleCreate(this: any) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectTimeStart, setSelectedTimeStart] = useState<Date | null>(new Date());
  const [selectedTimeend, setSelectedTimeEnd] = useState<Date | null>(new Date());
  const [ExamTypes, setExamTypes] = useState<ExamTypesInterface[]>([]);
  const [Semesters, setSemesters] = useState<SemestersInterface[]>([]);
  const [Courses, setCourses] = useState<CoursesInterface[]>([]);
  const [ExamSchedule, setExamSchedule] = useState<Partial<ExamScheduleInterface>>({}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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



  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof ExamSchedule;
    setExamSchedule({
      ...ExamSchedule,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof ExamSchedule;
    const { value } = event.target;
    setExamSchedule({ ...ExamSchedule, [id]: value });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
    setSelectedTimeStart(date)
    setSelectedTimeEnd(date)
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

  const getExamType = async () => {
    fetch(`${apiUrl}/examtypes`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setExamTypes(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getSemester = async () => {
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
    getCourses();
    getExamType();
    getSemester();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      SemesterID: convertType(ExamSchedule.SemesterID),
      AcademicYear: convertType(ExamSchedule.AcademicYear),
      ExamTypeID: convertType(ExamSchedule.ExamTypeID),
      CourseID: convertType(ExamSchedule.CourseID),
      RoomExam: ExamSchedule.RoomExam ?? "",
      DateExam: selectedDate,
      StartTime: selectTimeStart,
      EndTime: selectedTimeend,
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

    fetch(`${apiUrl}/examschedules`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
          setErrorMessage(res.error)
        }
      });
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกตารางสอบสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกตารางสอบไม่สำเร็จ: {errorMessage}
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
              เพิ่มตารางสอบ
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ภาคการศึกษา</p>
              <Select
                native
                value={ExamSchedule.SemesterID}
                onChange={handleChange}
                inputProps={{
                  name: "SemesterID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกภาคการศึกษา
                </option>
                {Semesters.map((item: SemestersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Semester}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>ปีการศึกษา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="AcademicYear"
                variant="outlined"
                type="number"
                size="medium"
                placeholder="กรุณาปีการศึกษา"
                value={ExamSchedule.AcademicYear || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ประเภทการจัดสอบ</p>
              <Select
                native
                value={ExamSchedule.ExamTypeID}
                onChange={handleChange}
                inputProps={{
                  name: "ExamTypeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกประเภทการจัดสอบ
                </option>
                {ExamTypes.map((item: ExamTypesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Type}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อรายวิชา</p>
              <Select
                native
                value={ExamSchedule.CourseID}
                onChange={handleChange}
                inputProps={{
                  name: "CourseID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชื่อรายวิชา
                </option>
                {Courses.map((item: CoursesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Coursename}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>ห้องสอบ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="RoomExam"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกห้องสอบ"
                value={ExamSchedule.RoomExam || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่สอบ</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="DateExam"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="กรุณาเลือกวันสอบ"
                  format="yyyy/MM/dd"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เวลาเริ่มต้น</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  name="StartTime"
                  value={selectTimeStart}
                  onChange={handleDateChange}
                  label="กรุณาเลือกเวลาเริ่มต้น"
                  format="hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เวลาสิ้นสุด</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  name="EndTime"
                  value={selectedTimeend}
                  onChange={handleDateChange}
                  label="กรุณาเลือกเวลาสิ้นสุด"
                  format="hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/examschedule"
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

export default ExamScheduleCreate;
