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
import { IncreaseGradesInterface } from "../models/IIncreaseGrades";
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

function IncreaseGrades() {
    const classes = useStyles();
    const [increasegrades, setIncreaseGrades] = useState<IncreaseGradesInterface[]>([]);

    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const getIncreaseGrades= async () => {
        fetch(`${apiUrl}/increasegrades`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setIncreaseGrades(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getIncreaseGrades();
    }, []);

    return (
        <div>
            <Container className={classes.container} maxWidth="lg">
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            ข้อมูลผลการเรียน
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/increasegrade/create"
                            variant="contained"
                            color="primary"
                        >
                            เพิ่มผลการเรียน
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
                                <TableCell align="center" width="5%">
                                    รายวิชา
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    หน่วยกิต
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    ผลการเรียน
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    หมายเหตุ
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    วันที่และเวลา
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {increasegrades.map((item: IncreaseGradesInterface) => (
                                <TableRow key={item.ID}>
                                    <TableCell align="center">{item.Student.ID_student}</TableCell>
                                    <TableCell align="center">{item.Course.Coursename}</TableCell>
                                    <TableCell align="center">{item.Credit}</TableCell>
                                    <TableCell align="center">{item.Grades.Grade}</TableCell>
                                    <TableCell align="center">{item.Description}</TableCell>
                                    <TableCell align="center">{format((new Date(item.Date)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}

export default IncreaseGrades;