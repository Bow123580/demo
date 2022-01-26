import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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

import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Home from "./components/Home";
import SignIn from "./components/Signin";
import Students from "./components/Student";
import Registrars from "./components/Registrar";
import Withdrawals from "./components/Withdrawal";
import WithdrawalCreate from "./components/WithdrawalCreate";
import AddCourses from "./components/AddCourses";
import AddCourseCreate from "./components/AddCourseCreate";
import EventNoteIcon from '@mui/icons-material/EventNote';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ExamScheduleCreate from "./components/ExamScheduleCreate";
import ExamSchedules from "./components/ExamSchedule";
import SaveIcon from "@material-ui/icons/Save";
import RequestExams from "./components/RequestExams";
import RequestExamCreate from "./components/RequestExamCreate";


const drawerWidth = 240; 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    a: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState<String>("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menu = [
    { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },
    { name: "นักศึกษา", icon: <AccountCircleIcon />, path: "/students" },
    { name: "ขอถอนรายวิชา", icon: <AccountCircleIcon />, path: "/withdrawal" },
    { name: "เพิ่มตารางสอบ", icon: <EventNoteIcon />, path: "/examschedule/create" },
    { name: "เพิ่มรายวิชา", icon: <AutoStoriesIcon />, path: "/addcourse" },
    { name: "เพิ่มคำร้องขอสอบซ้ำซ้อน", icon: <SaveIcon />, path: "/request_exams" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        {token && (
          <>
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
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  ระบบลงทะเบียนเรียน
                </Typography>

                <Button color="inherit" onClick={signout}>
                  ออกจากระบบ
                </Button>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                }),
              }}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </div>
              <Divider />

              <List>
                {menu.map((item, index) => (
                  <Link to={item.path} key={item.name} className={classes.a}>
                    <ListItem button>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Drawer>
          </>
        )}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/students" component={Students} />
              <Route exact path="/registrars" component={Registrars} />
              <Route exact path="/withdrawal" component={Withdrawals} />
              <Route exact path="/withdrawal/create" component={WithdrawalCreate} />
              <Route exact path="/addcourse" component={AddCourses} />
              <Route exact path="/addcourse/create" component={AddCourseCreate} />
              <Route exact path="/examschedule" component={ExamSchedules} />
              <Route exact path="/examschedule/create" component={ExamScheduleCreate} />
              <Route exact path="/request_exams" component={RequestExams} />
              <Route exact path="/request_exam/create" component={RequestExamCreate}/>
            </Switch>
          </div>
        </main>
      </Router>
    </div>
  );
}