import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./NewTaskStyle.scss";

const initialState = {
  taskName: "",
  description: "",
  dueDate: "",
  status: "Complete",
};

export default function NewTask({ setNewTask, newTask }) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const [state, setState] = useState(initialState);

  const { taskName, description, dueDate, status } = state;

  const addTask = async (data) => {
    try {
      const apiAddTask = await axiosInstance.post(`/posts/newTask`, data);
      if (apiAddTask.status === 200) {
        setNewTask(!newTask);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleBack();
    addTask(state);
  };

  const handleBack = () => {
    setNewTask(!newTask);
  };

  const showToastMessage = () => {
    if (!taskName || !dueDate || !status) {
      toast.error("Please do not leave the data field blank!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.success("Success New Task!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="task-new-item">
        <div className="task-new-item__background">
          <div className="task-new-item__container">
            <form onSubmit={handleSubmit} className="task-new-item__form">
              <div className="task-new__input">
                <label htmlFor="taskName">Task Name</label>
                <input
                  id="taskName"
                  name="taskName"
                  type="text"
                  placeholder="Enter Task Name..."
                  required
                  onChange={handInputChange}
                  value={taskName}
                />
              </div>

              <div className="task-new__input">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter Description..."
                  onChange={handInputChange}
                  value={description || ""}
                />
              </div>

              <div className="task-new__input">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  id="dueDate"
                  name="dueDate"
                  required
                  type="date"
                  onChange={handInputChange}
                  value={dueDate}
                />
              </div>

              <div className="task-new__input">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  required
                  value={status}
                  onChange={handInputChange}
                >
                  <option value="">--Select Status--</option>

                  <option value="Complete">Complete</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="In Process">In Process</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>

              <div className="btn-edit">
                <button
                  type="submit"
                  onClick={showToastMessage}
                  className="btn-task-new-item"
                >
                  Submit
                </button>

                <button
                  type=""
                  onClick={handleBack}
                  className="btn-task-new-item"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
