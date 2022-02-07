import React, { useEffect } from "react";
import clsx from "clsx";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { createStyles, makeStyles, useTheme, Theme, } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import EventRepeatTwoToneIcon from '@mui/icons-material/EventRepeatTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import BookmarkRemoveTwoToneIcon from '@mui/icons-material/BookmarkRemoveTwoTone';
import CreditScoreTwoToneIcon from '@mui/icons-material/CreditScoreTwoTone';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import SubjectTwoToneIcon from '@mui/icons-material/SubjectTwoTone';
import SignIn from "./Signin";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        center: {
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',

        },
        iconcenter: {
            justifyContent: "center",
            alignItems: 'center',
            margin: theme.spacing(2)
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: "none",
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        a: {
            textDecoration: "none",
            color: "inherit",
        },
    }),
);

export default function NavBar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [token, setToken] = React.useState<String>("");
    const [role, setRole] = React.useState<String>("");

    const student_menu = [
        { name: "หน้าแรก", icon: <HomeTwoToneIcon color="primary" />, path: "/" },
        { name: "คำร้องขอลงทะเบียนเรียนเกินต่ำกว่าหน่วยกิตที่กำหนด", icon: <SubjectTwoToneIcon color="primary" />, path: "/RecordPetition" },
        { name: "เพิ่มคำร้องขอสอบซ้ำซ้อน", icon: <EventRepeatTwoToneIcon color="primary" />, path: "/request_exams" },
        { name: "ขอถอนรายวิชา", icon: <BookmarkRemoveTwoToneIcon color="primary" />, path: "/withdrawal" },
    ];

    const registrar_menu = [
        { name: "หน้าแรก", icon: <HomeTwoToneIcon color="primary" />, path: "/" },
        { name: "เพิ่มรายวิชา", icon: <AutoStoriesTwoToneIcon color="primary" />, path: "/addcourse" },
        { name: "เพิ่มตารางสอบ", icon: <EventNoteTwoToneIcon color="primary" />, path: "/examschedule" },
        { name: "เพิ่มผลการเรียนนักศึกษา", icon: <CreditScoreTwoToneIcon color="primary" />, path: "/Increasegrade" },
    ];

    useEffect(() => {
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");
        if (token && role) {
            setToken(token);
            setRole(role);
        }

    }, []);

    if (!token) {
        return <SignIn />;
    }

    const signout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (role === "student") {
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap style={{ flexGrow: 1 }} >
                            ระบบลงทะเบียนเรียน
                        </Typography>
                        <Button color="inherit" onClick={signout}>
                            ออกจากระบบ
                        </Button>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                         นักศึกษา
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {student_menu.map((item) => (
                            <Link to={item.path} key={item.name} className={classes.a}>
                                <ListItem button key={item.name}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            </div>
        );
    }

    if (role === "registrar") {
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap style={{ flexGrow: 1 }} >
                            ระบบลงทะเบียนเรียน
                        </Typography>
                        <Button color="inherit" onClick={signout}>
                            ออกจากระบบ
                        </Button>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                         นายทะเบียน
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {registrar_menu.map((item) => (
                            <Link to={item.path} key={item.name} className={classes.a}>
                                <ListItem button key={item.name}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            </div>
        );
    }
    return <SignIn />;
}
