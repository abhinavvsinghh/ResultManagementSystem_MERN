import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const TeacherSignup = () => {
  const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/teacher/signup`, {
        name,
        email,
        password,
      });
      if (response.data.status) {
        // Redirect to TeacherLogin
        navigate("/teacher/login");
        toast.success('Successfully Signed Up. Please Login!');
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
            <h4 className="mainLabel">Teacher Portal - Create Account</h4>
            <form className="inputGroup">
              <input
                type="text"
                required
                name="name"
                value={name}
                className="inputBox"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
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
                  onClick={handleSignup}
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherSignup;
