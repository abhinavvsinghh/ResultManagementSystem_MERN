import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";

const StudentResult = () => {
  const location = useLocation();
  const [result, setResult] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Access the state passed from the previous component
    const { state } = location;
    if (state && state.result) {
      console.log(state);
      // Set the result in the state
      setResult(state.result);
    } else {
      setResult({});
      navigate("/student/login");
    }
  }, [location]);

  const handleLogout = () => {
    // Clear the result state when logging out
    setResult({});
    navigate("/student/login");
  };

  return (
    <>
      <Header handleLogout={handleLogout} />
      <div className="container">
        <div className="topBarStudent">
          <h2>Result</h2>
        </div>

        <div className="wrapper form-body">
          <div className="tableResult">
            <div className="tableRow">
              <label className="tableHeading">Roll No</label>
              <label className="tableHeading">Name</label>
              <label className="tableHeading">Date of Birth</label>
              <label className="tableHeading">Score</label>
            </div>
            <div className="tableRow">
              <label className="tableData">:</label>
              <label className="tableData">:</label>
              <label className="tableData">:</label>
              <label className="tableData">:</label>
            </div>
            <div className="tableRow">
              {/* Access the data from the result state */}
              <label className="tableData">{result.rollNo}</label>
              <label className="tableData">{result.name}</label>
              <label className="tableData">
                {new Date(result.dob).toLocaleDateString("en-GB")}
              </label>
              <label className="tableData">{result.score}</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentResult;
