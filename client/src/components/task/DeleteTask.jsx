import React from "react";
import axios from "axios";

import "./DeleteTaskStyle.scss";

export default function DeleteTask({ setDelTask, delTask, id }) {
  const axiosInstance = axios.create({
    baseURL: "http://task-manager-server-liart.vercel.app/api/v1/posts",
  });

  const handleDeleteTask = async () => {
    setDelTask(!delTask);

    if (delTask === true) {
      await axiosInstance.delete(`/delete/task/${id}`);
    }
  };
  return (
    <>
      <div className="background-modal">
        <div className="modal">
          <div className="modal_header">
            <h2>Message</h2>
          </div>

          <div className="modal__content">
            <p>You want to delete this task?</p>
          </div>
          <div className="modal__btn">
            <button
              onClick={() => {
                handleDeleteTask();
                setDelTask(!delTask);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setDelTask(!delTask);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
