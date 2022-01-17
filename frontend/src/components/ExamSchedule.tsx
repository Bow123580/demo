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
import { ExamScheduleInterface } from "../models/IExamSchedule";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TextField } from "@material-ui/core";
import { ExamSchedule } from "@material-ui/icons";

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

function ExamScheduleCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [ExamTypes, setExamTypes] = useState<ExamTypesInterface[]>([]);
  const [Semesters, setSemesters] = useState<SemestersInterface[]>([]);
  const [ExamSchedule, setExamSchedule] = useState<Partial<ExamScheduleInterface>>({}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);


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
    setWarning(false);
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
  };

  const getUsers = async () => {
    fetch(`${apiUrl}/users`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getCourses = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/Course/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        ExamSchedule.CourseID = res.data.ID
        if (res.data) {
          setCourses(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getExamType = async () => {
    fetch(`${apiUrl}/ExamTypes`, requestOptions)
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
    fetch(`${apiUrl}/Semesters`, requestOptions)
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
    getUsers();
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
      ExamTypeID: convertType(ExamSchedule.ExamTypeID),
      SemesterID: convertType(ExamSchedule.SemesterID),
      CourseID: convertType(ExamSchedule.CourseID),
      Phone: ExamSchedule.Phone ?? "",
      Price: typeof ExamSchedule.Price === "string" ? parseInt(ExamSchedule.Price) : 0,
      ExamScheduleTime: selectedDate,
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

    fetch(`${apiUrl}/ExamSchedules`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.duplicateExamSchedule) {
          setWarning(true);
        }
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
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
          บันทึกตารางสอบไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={warning} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          หมายเลขคำสั่งซื้อนี้ได้ทำการชำระไปแล้ว กรุณาเลือกหมายเลขคำสั่งซื้อใหม่
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
              ชำระเงิน
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <p>ยอดเงิน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Price"
                variant="outlined"
                type="number"
                size="medium"
                placeholder="กรุณากรอกยอดเงิน"
                value={ExamSchedule.Price || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ช่องทางชำระเงิน</p>
              <Select
                native
                value={ExamSchedule.ExamTypeID}
                onChange={handleChange}
                inputProps={{
                  name: "ExamTypeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกช่องทางชำระเงิน
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
              <p>การจัดส่ง</p>
              <Select
                native
                value={ExamSchedule.SemesterID}
                onChange={handleChange}
                inputProps={{
                  name: "SemesterID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกการจัดส่ง
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
            <p>เบอร์โทรศัพท์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Phone"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                value={ExamSchedule.Phone || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="ExamScheduleTime"
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
              to="/ExamSchedules"
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