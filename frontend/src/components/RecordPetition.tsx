import { SetStateAction, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";


import { StudentsInterface } from "../models/IStudent";
import { PetitionsInterface } from "../models/IPetition";
import { CoursesInterface } from "../models/ICourse";
import { RecordPetitionInterface } from "../models/IRecordPetition";
import { TextField } from "@material-ui/core";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NavBar from "./Navbar";




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

export default function RecordPetitionCreate() {
  const classes = useStyles();
  const [students, setStudents] = useState<Partial<StudentsInterface>>({});
  const [petitions, setPetitions] = useState<PetitionsInterface[]>([]);
  const [courses, setCourses] = useState<CoursesInterface[]>([]);
  const [recordpetition, setRecordPetition] = useState<Partial<RecordPetitionInterface>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

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
    const name = event.target.name as keyof typeof recordpetition;
    setRecordPetition({
      ...recordpetition,
      [name]: event.target.value,
    });
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

  const getPetitions = async () => {
    fetch(`${apiUrl}/petitions`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPetitions(res.data);
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

  useEffect(() => {
    getStudents();
    getPetitions();
    getCourses();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      StudentID: convertType(students?.ID),
      PetitionID: convertType(recordpetition.PetitionID),
      CourseID: convertType(recordpetition.CourseID),
      Because: (recordpetition.Because),
      RegisteredCredit: convertType(recordpetition.RegisteredCredit),
      TimeRecord: selectedDate,

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

    fetch(`${apiUrl}/record_petitions`, requestOptionsPost)
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
    <div>
      <NavBar />
      <div className={classes.drawerHeader} />
      <Container className={classes.container} maxWidth="md">

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

        <br></br>

        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกคำร้องขอทะเบียนเรียนเกิน/ต่ำกว่าหน่วยกิตที่กำหนด
            </Typography>
          </Box>
        </Box>
        <Divider />


        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <p>ผู้เข้าใช้ระบบ</p>
            <Select
              native
              disabled
              value={recordpetition.StudentID}
            // onChange={handleChange}
            // inputProps={{
            //   name: "UserID",
            // }}
            >
              <option aria-label="None" value="">
                {students?.ID_student}
              </option>

            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <p>คำร้อง</p>
            <Select
              native
              value={recordpetition.PetitionID}
              onChange={handleChange}
              inputProps={{
                name: "PetitionID",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือกคำร้อง
              </option>
              {petitions.map((item: PetitionsInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Claim}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <br></br> <br></br>

        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <option aria-label="None" value="">
              เหตุผลที่ต้องการลงทะเบียนเรียนเกิน/ต่ำกว่าหน่วยกิตที่กำหนด
            </option>

            <br></br>

            <TextField
              id="Because"
              name="Because"
              label="กรุณาใส่เหตุผล"
              type="string"
              variant="outlined"
              fullWidth
              multiline
              value={recordpetition.Because || ""}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <br></br> <br></br>


        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <option aria-label="None" value="">
              หน่วยกิตทั้งหมดที่ต้องการลงทะเบียนเรียน
            </option>
            <br></br>

            <TextField
              id="RegisteredCredit"
              name="RegisteredCredit"
              label="กรุณาใส่หน่วยกิตทั้งหมดที่ต้องการลงทะเบียนเรียน"
              type="number"
              variant="outlined"
              fullWidth
              multiline
              value={recordpetition.RegisteredCredit || ""}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <br></br>  <br></br>

        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <p>เลือกรหัสวิชาที่ต้องการยื่นคำร้องลงทะเบียนเรียนเกิน/ต่ำกว่าหน่วยกิตที่กำหนด</p>
            <Select
              native
              value={recordpetition.CourseID}
              onChange={handleChange}
              inputProps={{
                name: "CourseID",
              }}
            >
              <br></br>

              <option aria-label="None" value="">
                เลือกรหัสวิชา
              </option>
              {courses.map((item: CoursesInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Coursenumber}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <br></br>

        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <p>วันที่และเวลาที่บันทึกคำร้อง</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                name="TimeRecord"
                value={selectedDate}
                onChange={handleDateChange}
                label="กรุณาเลือกวันที่และเวลา"
                minDate={new Date("2018-01-01T00:00")}
                format="yyyy/MM/dd hh:mm a"
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </Grid>

        <br></br>  <br></br>

        <Button
          style={{ float: "left" }}
          variant="contained"
          onClick={submit}
          color="primary"
        >
          บันทึกคำร้อง
        </Button>
      </Container>
    </div >
  );
}