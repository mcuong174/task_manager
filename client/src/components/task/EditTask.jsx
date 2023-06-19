import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../layout/Loading";
import "./EditTaskStyle.scss";

export default function TaskItem() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getTaskById();
  }, []);

  const updateTask = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.patch(`/task/${id}`, {
        taskName,
        description,
        dueDate,
        status,
      });
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskById = async (e) => {
    try {
      const res = await axiosInstance.get(`/task/${id}`);

      setTaskName(res.data.data[0].taskName);
      setDescription(res.data.data[0].description);
      setDueDate(moment(res.data.data[0].dueDate).format("YYYY-MM-DD"));
      setStatus(res.data.data[0].status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate("/tasks");
  };

  const showToastMessage = () => {
    if (!taskName || !dueDate || !status) {
      toast.error("Please do not leave the data field blank!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.success("Success Edit Task!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="task-edit">
          <div className="task-edit__background">
            <div className="task-edit__header">
              <label>Edit Task</label>
            </div>

            <div className="task-edit__container">
              <form className="task-edit__form" onSubmit={updateTask}>
                <div className="task-edit__input">
                  <label>Task Name</label>
                  <input
                    id="taskName"
                    name="taskName"
                    type="text"
                    required
                    onChange={(e) => setTaskName(e.target.value)}
                    value={taskName}
                  />
                </div>

                <div className="task-edit__input">
                  <label>Description</label>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>

                <div className="task-edit__input">
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    id="dueDate"
                    name="dueDate"
                    required
                    type="date"
                    onChange={(e) => setDueDate(e.target.value)}
                    value={dueDate}
                  />
                </div>

                <div className="task-edit__input">
                  <label>Status</label>

                  <select
                    id="status"
                    name="status"
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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
                    className="btn-task-edit"
                  >
                    Submit
                  </button>

                  <button
                    type=""
                    onClick={handleBack}
                    className="btn-task-edit"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
