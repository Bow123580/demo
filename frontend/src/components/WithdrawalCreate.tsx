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
import { TeachersInterface } from "../models/ITeacher";
import { SemestersInterface } from "../models/ISemester";
import { WithdrawalsInterface } from "../models/IWithdrawal";

import { MuiPickersUtilsProvider, KeyboardDateTimePicker, } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TextField } from "@material-ui/core";
import { RegisCoursesInterface } from "../models/IRegisCourse";
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

export default function WithdrawalCreate() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [withdrawals, setWithdrawals] = useState<Partial<WithdrawalsInterface>>({});
    const [students, setStudents] = useState<Partial<StudentsInterface>>({});
    const [regiscourses, setRegisCourses] = useState<RegisCoursesInterface[]>([]);
    const [teachers, setTeachers] = useState<TeachersInterface[]>([]);
    const [semesters, setSemesters] = useState<SemestersInterface[]>([]);
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

    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const name = event.target.name as keyof typeof withdrawals;
        setWithdrawals({
            ...withdrawals,
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
        const name = event.target.id as keyof typeof withdrawals;
        setWithdrawals({
            ...withdrawals,
            [name]: event.target.value,
        });
    };

    const getStudents = async () => {
        let uid = localStorage.getItem("uid");
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

    const getRegisCourses = async () => {
        let uid = localStorage.getItem("uid");
        fetch(`${apiUrl}/regiscourses/${uid}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setRegisCourses(res.data);
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
        getRegisCourses();
        getTeachers();
        getSemesters();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    function submit() {
        let data = {
            StudentID: convertType(students?.ID),
            RegisCourseID: convertType(withdrawals.RegisCourseID),
            TeacherID: convertType(withdrawals.TeacherID),
            SemesterID: convertType(withdrawals.SemesterID),
            YearTime: convertType(withdrawals.YearTime),
            RemainCredit: convertType(withdrawals.RemainCredit),
            Reason: withdrawals.Reason ?? "",
            withdrawalTime: selectedDate || "",
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

        fetch(`${apiUrl}/withdrawal`, requestOptionsPost)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("บันทึกได้")
                    setSuccess(true);
                    setErrorMessage("")

                } else {
                    console.log("บันทึกไม่ได้")
                    setError(true);
                    setErrorMessage(res.error)

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
                        บันทึกสำเร็จ
                    </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        การบันทึกผิดพลาด: {errorMessage}
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
                                บันทึกการถอนรายวิชา
                            </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Grid container spacing={3} className={classes.root}>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <Typography
                                    color="textPrimary"
                                >
                                    นักศึกษา
                                </Typography>
                                <Select
                                    native
                                    value={withdrawals.StudentID}
                                    onChange={handleChange}
                                    disabled
                                >
                                    <option aria-label="None" value="">
                                        {students?.ID_student}   {students?.Name}
                                    </option>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <Typography
                                    color="textPrimary"
                                >
                                    รหัสรายวิชา
                                </Typography>

                                <Select
                                    native
                                    value={withdrawals.RegisCourseID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "RegisCourseID",
                                    }}
                                >
                                    <option aria-label="None" value="Course">
                                        กรุณาเลือกรายวิชา
                                    </option>

                                    {regiscourses.map((item: RegisCoursesInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.CourseID}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <Typography
                                    color="textPrimary"
                                >
                                    อาจารย์ผู้สอน
                                </Typography>
                                <Select
                                    native
                                    value={withdrawals.TeacherID}
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
                            <FormControl fullWidth variant="outlined">
                                <Typography
                                    color="textPrimary"
                                >
                                    ภาคการศึกษา
                                </Typography>
                                <Select
                                    native
                                    value={withdrawals.SemesterID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "SemesterID",
                                    }}
                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกการศึกษา
                                    </option>
                                    {semesters.map((item: SemestersInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Semester}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <Typography
                                    color="textPrimary"
                                >
                                    ปีการศึกษา
                                </Typography>
                                <option aria-label="None" value="">
                                    กรุณาใส่ปีการศึกษา
                                </option>

                                <TextField
                                    id="YearTime"
                                    variant="outlined"
                                    type="number"
                                    size="medium"
                                    InputProps={{ inputProps: { min: 2564 } }}
                                    InputLabelProps={{ shrink: true, }}
                                    value={withdrawals.YearTime || ""}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <Typography
                                    color="textPrimary"
                                >
                                    หน่วยกิตคงเหลือ
                                </Typography>
                                <option aria-label="None" value="">
                                    กรุณาใส่หน่วยกิตคงเหลือ
                                </option>

                                <TextField
                                    id="RemainCredit"
                                    variant="outlined"
                                    type="number"
                                    size="medium"
                                    InputProps={{ inputProps: { min: 1 } }}
                                    InputLabelProps={{ shrink: true, }}
                                    value={withdrawals.RemainCredit || ""}
                                    onChange={handleInputChange}
                                />
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
                                    id="Reason"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    value={withdrawals.Reason || ""}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <Typography
                                    color="textPrimary"
                                >
                                    วันที่และเวลา
                                </Typography>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDateTimePicker
                                        name="WithdrawalTime"
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
                                to="/withdrawal"
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
        </div>
    );
}