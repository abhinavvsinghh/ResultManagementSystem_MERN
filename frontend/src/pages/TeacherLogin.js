import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";

const TeacherLogin = () => {
  const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Email & Password is required!");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/teacher/login`, {
        email,
        password,
      });
      if (response.data.status) {
        // Set token to local storage
        localStorage.setItem("token", response.data.data.token);
        setUser({ user: response.data.data.teacher, isAuthenticated: true });
        // Redirect to TeacherDashboard
        navigate("/teacher/dashboard");
        toast.success('Login Successfull!');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="login">
        <div className="loginWrapper">
          <div className="formWrapper">
            <img
              src="/assets/teacher.png"
              alt="teacher-logo"
              className="loginLogo"
            />
            <h4 className="mainLabel">Teacher Portal - Login</h4>
            <form className="inputGroup">
              <input
                type="email"
                required
                name="email"
                value={email}
                className="inputBox"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                required
                name="password"
                value={password}
                className="inputBox"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="btnGroup">
                <button
                  type="submit"
                  className="btn primaryBtn"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherLogin;
