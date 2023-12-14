import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  const [allResults, setAllResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState({});
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/teacher/login");
    }
  }, []);

  useEffect(() => {
    getAllResults();
  }, []);

  useEffect(() => {
    // Update the input fields when selectedResult changes
    if (user.isAuthenticated && selectedResult) {
      document.getElementById("editRollNo").value = selectedResult.rollNo || "";
      document.getElementById("editName").value = selectedResult.name || "";
      // Format the dob value to YYYY-MM-DD
      const formattedDob = selectedResult.dob
        ? new Date(selectedResult.dob).toISOString().split("T")[0]
        : "";

      document.getElementById("editDob").value = formattedDob;
      document.getElementById("editScore").value = selectedResult.score || "";
    }
  }, [selectedResult]);

  const getAllResults = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/student/`);
      if (response.data.status) {
        setAllResults(response.data.data);
      } else {
        setAllResults([]);
      }
    } catch (error) {
      console.error("TeacherDashboard: ", error);
    }
  };

  const openModal = (modalId, result = {}) => {
    setSelectedResult(result);
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = (modalId) => {
    setSelectedResult({});
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.close();
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      // Get the form values
      const rollNo = document.getElementById("rollNo").value;
      const name = document.getElementById("name").value;
      const dob = document.getElementById("dob").value;
      const score = document.getElementById("score").value;

      // Check if any field is empty
      if (!rollNo || !name || !dob || !score) {
        toast.error("Please fill in all fields");
        return;
      }

      // Make the API request to add the result
      const response = await axios.post(`${BACKEND_BASE_URL}/student/`, {
        rollNo,
        name,
        dob,
        score,
      });

      if (response.data.status) {
        // Update the state with the new result
        await getAllResults();
        closeModal("addResultDialog");
        toast.success("Result added successfully");

        // Reset the form values
        document.getElementById("rollNo").value = "";
        document.getElementById("name").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("score").value = "";
      } else {
        closeModal("addResultDialog");
        toast.error("Failed to add result");
      }
    } catch (error) {
      closeModal("addResultDialog");
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      // Get the form values
      const rollNo = document.getElementById("editRollNo").value;
      const name = document.getElementById("editName").value;
      const dob = document.getElementById("editDob").value;
      const score = document.getElementById("editScore").value;

      // Check if any field is empty
      if (!rollNo || !name || !dob || !score) {
        toast.error("Please fill in all fields");
        return;
      }

      // Make the API request to update the result
      const response = await axios.patch(
        `${BACKEND_BASE_URL}/student/${rollNo}`,
        {
          name,
          dob,
          score,
        }
      );

      if (response.data.status) {
        // Update the state with the updated result
        await getAllResults();
        closeModal("editDialog");
        toast.success("Result updated successfully");
      } else {
        closeModal("editDialog");
        toast.error("Failed to update result");
      }
    } catch (error) {
      closeModal("editDialog");
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      const rollNoToDelete = selectedResult.rollNo;

      // Make the API request to delete the result
      const response = await axios.delete(
        `${BACKEND_BASE_URL}/student/${rollNoToDelete}`
      );

      if (response.data.status) {
        // Update the state by removing the deleted result
        await getAllResults();
        closeModal("deleteDialog");
        toast.success("Result deleted successfully");
      } else {
        closeModal("deleteDialog");
        toast.error("Failed to delete result");
      }
    } catch (error) {
      closeModal("deleteDialog");
      toast.error("Internal Server Error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ user: "", isAuthenticated: false });
    navigate("/teacher/login");
  };

  return (
    user.isAuthenticated && (
      <>
        <Header handleLogout={handleLogout} />
        <div className="container">
          <div className="topBar">
            <h2>Total {allResults.length} Students</h2>
            <button
              id="addButton"
              className="btn addBtn"
              onClick={() => openModal("addResultDialog")}
            >
              Add Result
            </button>
          </div>
          {allResults.length === 0 ? (
            <div className="noResultsMessage">
              <p>No Student Results. Please add.</p>
            </div>
          ) : (
            <div className="wrapper">
              <div className="tableFixHead">
                <table className="table">
                  <thead className="tableHead">
                    <tr>
                      <th scope="col">Roll No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Date of Birth</th>
                      <th scope="col">Score</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allResults.map((result) => (
                      <tr key={result.rollNo}>
                        <td>{result.rollNo}</td>
                        <td>{result.name}</td>
                        <td>
                          {new Date(result.dob).toLocaleDateString("en-GB")}
                        </td>
                        <td>{result.score}</td>
                        <td>
                          <div className="actionButton">
                            <button
                              type="button"
                              className="iconBtn edit"
                              onClick={() => openModal("editDialog", result)}
                            >
                              <img
                                src="/assets/edit.png"
                                alt="edit"
                                className="editLogo"
                              />
                            </button>
                            <button
                              type="button"
                              className="iconBtn"
                              onClick={() => openModal("deleteDialog", result)}
                            >
                              <img
                                src="/assets/delete.png"
                                alt="delete"
                                className="deleteLogo"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Add Result Modal */}
        <dialog className="form-body" id="addResultDialog">
          <div className="form-content">
            <div className="form-items">
              <div className="form-top">
                <h3>Add Result</h3>
                <button
                  autoFocus
                  id="closeAddButton"
                  className="iconBtn"
                  onClick={() => closeModal("addResultDialog")}
                >
                  <img
                    src="/assets/close.png"
                    alt="close"
                    className="closeLogo"
                  />
                </button>
              </div>
              <form>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    placeholder="Roll No"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="date"
                    id="dob"
                    name="dob"
                    placeholder="Date of Birth"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="number"
                    id="score"
                    name="score"
                    placeholder="Score"
                    min={0}
                    max={500}
                    required
                  />
                </div>

                <div className="form-button mt-3">
                  <button
                    id="submit"
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>

        {/* Edit Result Modal */}
        <dialog className="form-body" id="editDialog">
          <div className="form-content">
            <div className="form-items">
              <div className="form-top">
                <h3>Update Result</h3>
                <button
                  autoFocus
                  id="closeEditButton"
                  className="iconBtn"
                  onClick={() => closeModal("editDialog")}
                >
                  <img
                    src="/assets/close.png"
                    alt="close"
                    className="closeLogo"
                  />
                </button>
              </div>
              <form>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    id="editRollNo"
                    name="rollNo"
                    placeholder="Roll No"
                    readOnly
                  />
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    id="editName"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="date"
                    id="editDob"
                    name="dob"
                    placeholder="Date of Birth"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="number"
                    id="editScore"
                    name="score"
                    placeholder="Score"
                    min={0}
                    max={500}
                    required
                  />
                </div>

                <div className="form-button mt-3">
                  <button
                    id="submit"
                    type="submit"
                    className="btn updateBtn"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>

        {/* Delete Modal  */}
        <dialog className="form-body" id="deleteDialog">
          <div className="form-content">
            <div className="form-items">
              <div className="form-top">
                <h3>Want to delete this result?</h3>
                <button
                  autoFocus
                  id="closeDeleteButton"
                  className="iconBtn"
                  onClick={() => closeModal("deleteDialog")}
                >
                  <img
                    src="/assets/close.png"
                    alt="close"
                    className="closeLogo"
                  />
                </button>
              </div>
              <button
                id="submit"
                type="submit"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </dialog>
      </>
    )
  );
};

export default TeacherDashboard;
