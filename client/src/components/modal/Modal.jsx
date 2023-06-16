import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Modal.scss";

export default function Modal({ setMessage, message, setDelTask }) {
  const showToastMessage = () => {
    toast.success("Success Delete Task!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
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
                setDelTask(true);
                showToastMessage();
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setMessage(!message);
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
