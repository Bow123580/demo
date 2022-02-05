import React,{ useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Signin";
import Withdrawals from "./components/Withdrawal";
import WithdrawalCreate from "./components/WithdrawalCreate";
import AddCourses from "./components/AddCourses";
import AddCourseCreate from "./components/AddCourseCreate";
import ExamScheduleCreate from "./components/ExamScheduleCreate";
import ExamSchedules from "./components/ExamSchedule";
import RequestExams from "./components/RequestExams";
import RequestExamCreate from "./components/RequestExamCreate";
import RecordPetition from "./components/RecordPetition";
import IncreaseGrades from "./components/IncreaseGrades";
import IncreaseGradesCreate from "./components/IncreaseGradesCreate";

function App() {

  const [token, setToken] = React.useState<String>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }
  return (
    <Router>
      <div>
        <Routes>
              <Route  path="/" element={<Home />} />
              <Route  path="/withdrawal" element={<Withdrawals />} />
              <Route  path="/withdrawal/create" element={<WithdrawalCreate />} />
              <Route  path="/addcourse" element={<AddCourses />} />
              <Route  path="/addcourse/create" element={<AddCourseCreate />} />
              <Route  path="/examschedule" element={<ExamSchedules />} />
              <Route  path="/examschedule/create" element={<ExamScheduleCreate />} />
              <Route  path="/request_exams" element={<RequestExams/>} />
              <Route  path="/request_exam/create" element={<RequestExamCreate />}/>
              <Route  path="/RecordPetition" element={<RecordPetition />} />
              <Route  path="/Increasegrade" element={<IncreaseGrades />} />
              <Route  path="/Increasegrade/create" element={<IncreaseGradesCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
