/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../layout/Loading";
import NewTask from "../task/NewTask";
import Modal from "../modal/Modal";
import TaskItem from "./TaskItem";
import "./TaskListStyle.scss";

export default function TaskList() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL_POSTS,
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const [allTask, setAllTask] = useState([]);
  const [newTask, setNewTask] = useState(false);
  const [delTask, setDelTask] = useState(false);
  const [message, setMessage] = useState(false);
  const [getCurr, setGetCurr] = useState({});

  const [selectStatus, setSelectStatus] = useState("");
  const [filterResult, setFilterResult] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");

  const toggleNewTask = () => {
    setNewTask(!newTask);
  };

  const [sortResult, setSortData] = useState([]);
  const [selectSort, setSelectSort] = useState("");

  const handleGetAllTask = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      const setDataUrl = res.data.data;
      setAllTask(setDataUrl);
      setFilterResult(setDataUrl);
      setSearchResult(setDataUrl);
      setSortData(setDataUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleDeleteTask = async (task) => {
      try {
        await axiosInstance.delete(`/delete/task/${task.id}`);
        handleGetAllTask();
        setDelTask(false);
        setMessage(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (delTask) {
      if (getCurr) {
        handleDeleteTask(getCurr);
      }
    }
  }, [delTask]);

  useEffect(() => {
    handleGetAllTask();
  }, [newTask]);

  const handleSearch = (e) => {
    const getSearch = e.target.value;

    if (getSearch) {
      const searchData = filterResult.filter((item) =>
        item.taskName.toLowerCase().includes(getSearch)
      );

      setFilterResult(searchData);
    } else {
      setFilterResult(allTask);
    }
    setQuery(getSearch);
  };

  const handleFilterResult = (e) => {
    setSelectStatus(e.target.value);
  };

  useEffect(() => {
    if (selectStatus) {
      const filterData = allTask.filter((item) =>
        item.status.toLowerCase().includes(selectStatus.toLowerCase())
      );
      setFilterResult(filterData);
    } else {
      setFilterResult(allTask);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectStatus, searchResult]);

  const sortTask = (e) => {
    setSelectSort(e.target.value);
  };

  useMemo(() => {
    if (selectSort && selectSort === "sortName") {
      const sortDataName = sortResult.sort((item1, item2) => {
        let a = item1.taskName.toLowerCase();
        let b = item2.taskName.toLowerCase();
        return a === b ? 0 : a > b ? 1 : -1;
      });
      setFilterResult(sortDataName);
    } else if (selectSort && selectSort === "sortDate") {
      const sortDataDate = sortResult.sort((item1, item2) => {
        let a = item1.dueDate.toLowerCase();
        let b = item2.dueDate.toLowerCase();
        return a === b ? 0 : a > b ? 1 : -1;
      });
      setFilterResult(sortDataDate);
    } else {
      setFilterResult(allTask);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectSort]);

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="task-list">
          <div className="list-background">
            {message && (
              <Modal
                setMessage={setMessage}
                message={message}
                setDelTask={setDelTask}
                delTask={delTask}
              />
            )}
            {newTask && <NewTask setNewTask={setNewTask} newTask={newTask} />}
            <div className="list-header">
              <div className="sort-data">
                <select
                  id="sort"
                  name="sort"
                  value={selectSort}
                  onChange={(e) => sortTask(e)}
                >
                  <option value="">-- Select Sort --</option>
                  <option value="sortName">Sort Name</option>
                  <option value="sortDate">Sort Date</option>
                </select>
              </div>

              <div className="option-filter">
                <div className="search">
                  <input
                    className="input-search"
                    id="name"
                    name="name"
                    value={query}
                    onChange={(e) => handleSearch(e)}
                    type="text"
                    placeholder="Search..."
                  />
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="filter-add">
                  <div className="filter-data">
                    <select
                      id="status"
                      name="status"
                      value={selectStatus}
                      onChange={handleFilterResult}
                    >
                      <option value="">-- Select status --</option>
                      <option value="Complete">Complete</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="In Process">In Process</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </div>

                  <div className="btn-addUser">
                    <button
                      onClick={() => {
                        toggleNewTask();
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      New Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="list-container">
              {(filterResult ? filterResult : allTask).slice(0).map((data) => (
                <TaskItem
                  props={data}
                  key={data.id}
                  setGetCurr={setGetCurr}
                  message={message}
                  setMessage={setMessage}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
