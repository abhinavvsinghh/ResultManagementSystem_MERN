import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import StudentResult from "./pages/StudentResult";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherSignup from "./pages/TeacherSignup";
import TeacherDashboard from "./pages/TeacherDashboard";
import UserState from "./context/UserState";

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{ success: { theme: { primary: "#4aed88" } } }}
        ></Toaster>
      </div>
      <UserState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/result" element={<StudentResult />} />
            <Route path="/teacher/login" element={<TeacherLogin />} />
            <Route path="/teacher/signup" element={<TeacherSignup />} />
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            {/* Catch-all route for invalid paths */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </UserState>
    </>
  );
}

export default App;
