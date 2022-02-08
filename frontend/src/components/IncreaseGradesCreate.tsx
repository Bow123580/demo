import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles, } from "@material-ui/core/styles";
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

import { StudentsInterface } from "../models/IStudent";
import { CoursesInterface } from "../models/ICourse";
import { GradesInterface } from "../models/IGrades";
import { IncreaseGradesInterface } from "../models/IIncreaseGrades";
import NavBar from "./Navbar";

import { MuiPickersUtilsProvider, KeyboardDateTimePicker, } from "@material-ui/pickers";
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

function IncreaseGradesCreate() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [increasegrades, setIncreaseGrades] = useState<Partial<IncreaseGradesInterface>>({});
    const [students, setStudents] = useState<StudentsInterface[]>([]);
    const [courses, setCourses] = useState<CoursesInterface[]>([]);
    const [grades, setGrades] = useState<GradesInterface[]>([]);


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
        const name = event.target.name as keyof typeof increasegrades;
        setIncreaseGrades({
            ...increasegrades,
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
        const name = event.target.id as keyof typeof increasegrades;
        setIncreaseGrades({
            ...increasegrades,
            [name]: event.target.value,
        });
    };


    const getStudents = async () => {
        fetch(`${apiUrl}/students`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setStudents(res.data);
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

    const getGrades = async () => {
        fetch(`${apiUrl}/grades`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setGrades(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getStudents();
        getCourses();
        getGrades();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    function submit() {
        let data = {
            StudentID: convertType(increasegrades.StudentID),
            CourseID: convertType(increasegrades.CourseID),
            GradesID: convertType(increasegrades.GradesID),
            GradePoint: +(increasegrades.GradePoint ?? ""),
            Description: increasegrades.Description ?? "",
            Date: selectedDate || "",
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

        fetch(`${apiUrl}/increasegrades`, requestOptionsPost)
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
            <div className={classes.drawerHeader} />
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    บันทึกสำเร็จ
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    การบันทึกผิดพลาด
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
                            บันทึกผลการเรียน
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
                                นักศึกษา
                            </Typography>
                            <Select
                                native
                                value={increasegrades.StudentID}
                                onChange={handleChange}
                                inputProps={{
                                    name: "StudentID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกนักศึกษา
                                </option>
                                {students.map((item: StudentsInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.ID_student} {item.Name}
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
                                รหัสรายวิชา
                            </Typography>
                            <Select
                                native
                                value={increasegrades.CourseID}
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
                                        {item.Coursenumber} {item.Coursename}
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
                                คะแนน
                            </Typography>
                            <option aria-label="None" value="">
                                กรุณาใส่คะแนน
                            </option>
                            <TextField
                                id="GradePoint"
                                variant="outlined"
                                type="number"
                                size="medium"
                                value={increasegrades.GradePoint || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography
                                color="textPrimary"
                            >
                                ผลการเรียน
                            </Typography>
                            <Select
                                native
                                value={increasegrades.GradesID}
                                onChange={handleChange}
                                inputProps={{
                                    name: "GradesID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกผลการเรียน
                                </option>
                                {grades.map((item: GradesInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Grade}
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
                                เหตุผล
                            </Typography>
                            <option aria-label="None" value="">
                                กรุณาใส่เหตุผล
                            </option>
                            <TextField
                                id="Description"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={increasegrades.Description || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography
                                color="textPrimary"
                            >
                                วันที่และเวลา
                            </Typography>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                    name="Date"
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
                            to="/increasegrade"
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

export default IncreaseGradesCreate;