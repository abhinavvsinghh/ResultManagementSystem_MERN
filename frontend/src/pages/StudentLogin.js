import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const StudentLogin = () => {
  const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!rollNo || !dob) {
      toast.error("Roll No & D.O.B. is required!");
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/student/${rollNo}/${dob}`
      );
      if (response.data.status) {
        // Redirect to StudentResult
        navigate("/student/result", {
          state: {
            result: response.data.data,
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleClear = () => {
    setRollNo("");
    setDob("");
  };

  return (
    <>
      <Header />
      <div className="login">
        <div className="loginWrapper">
          <div className="formWrapper">
            <img
              src="/assets/student.png"
              alt="student-logo"
              className="loginLogo"
            />
            <h4 className="mainLabel">Find Result</h4>
            <form className="inputGroup">
              <input
                type="number"
                required
                id="rollNo"
                name="rollNo"
                value={rollNo}
                className="inputBox"
                placeholder="Roll Number"
                onChange={(e) => setRollNo(e.target.value)}
              />
              <input
                type="date"
                required
                id="dob"
                name="dob"
                value={dob}
                className="inputBox"
                placeholder="Date of Birth"
                onChange={(e) => setDob(e.target.value)}
              />
              <div className="btnGroup">
                <button
                  type="submit"
                  className="btn primaryBtn"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button
                  className="btn clearBtn"
                  type="reset"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
