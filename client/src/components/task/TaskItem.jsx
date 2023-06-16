import React from "react";
import "./TaskItemStyle.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";

export default function TaskItem({ props, message, setMessage, setGetCurr }) {
  const formattedDate = moment(props.dueDate).format("DD/MM/YYYY");

  const toggleMessDel = () => {
    setMessage(!message);
  };

  return (
    <>
      <div className="task-item">
        <div className="task-item__background">
          <div className="task-item__name">
            <h4>{props.taskName}</h4>
          </div>
          <div className="task-item__container">
            <p className="task-item__des">{props.description}</p>
            <div className="task-item__due">
              <FontAwesomeIcon icon={faCalendar} />
              {formattedDate}
            </div>
            <div className="task-item__status">
              <div className="item__status" data-status={props.status}>
                {props.status}
              </div>
            </div>
          </div>
          <div className="task-item__action">
            <Link to={`/editTask/${props.id}`}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>

            <button
              onClick={() => {
                setGetCurr(props);
                toggleMessDel();
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
