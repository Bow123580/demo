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
import { WithdrawalsInterface } from "../models/IWithdrawal";
import { format } from 'date-fns'
import NavBar from "./Navbar";


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

export default function Withdrawals() {
    const classes = useStyles();
    const [withdrawals, setWithdrawals] = useState<WithdrawalsInterface[]>([]);

    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const getWithdrawals= async () => {
        let uid = localStorage.getItem("uid");
        fetch(`${apiUrl}/withdrawals/${uid}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setWithdrawals(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getWithdrawals();
    }, []);

    return (
        <div>
            <NavBar />
            <Container className={classes.container} maxWidth="lg">
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            ข้อมูลการถอนรายวิชา
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/withdrawal/create"
                            variant="contained"
                            color="primary"
                        >
                            ขอถอนรายวิชา
                        </Button>
                    </Box>
                </Box>
                <TableContainer component={Paper} className={classes.tableSpace}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="2%">
                                    นักศึกษา
                                </TableCell>
                                <TableCell align="center" width="10%">
                                    รายวิชา
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    อาจารย์ผู้สอน
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    ภาคการศึกษา
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    ปีการศึกษา
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    หน่วยกิตคงเหลือ
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    เหตุผล
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    วันที่และเวลา
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {withdrawals.map((wd: WithdrawalsInterface) => (
                                <TableRow key={wd.ID}>
                                    <TableCell align="center">{wd.Student.ID_student}</TableCell>
                                    <TableCell align="center">{wd.RegisCourse.Course.Coursenumber} {wd.RegisCourse.Course.Coursename} </TableCell>
                                    <TableCell align="center">{wd.Teacher.Name}</TableCell>
                                    <TableCell align="center">{wd.Semester.Semester}</TableCell>
                                    <TableCell align="center">{wd.YearTime}</TableCell>
                                    <TableCell align="center">{wd.RemainCredit}</TableCell>
                                    <TableCell align="center">{wd.Reason}</TableCell>
                                    <TableCell align="center">{format((new Date(wd.WithdrawalTime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}
