import React from "react";
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  function redirectTo(url){
    navigate(url);
  }

  return (
    <div className="mainHomePage">
        <h1 className="homeHeading">
          Result Management System for Teachers and Students
        </h1>
      <h2 className="homeSubHeading1">Student Portal</h2>
      <button className="studentBtn homeBtn" onClick={() => redirectTo('/student/login')}>
        Student Login
      </button>
      <h2 className="homeSubHeading2">Teacher Portal</h2>
      <button className="teacherBtn homeBtn" onClick={() => redirectTo('/teacher/login')}>
        Login
      </button>
      <div className="orSeperator">
        <span className="leftSeperator"></span>
        <span>or</span>
        <span className="rightSeperator"></span>
      </div>
      <button className="createBtn homeBtn" onClick={() => redirectTo('/teacher/signup')}>
        Create Account
      </button>
      <Footer/>
    </div>
  );
};

export default Home;
