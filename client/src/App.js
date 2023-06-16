import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginRoute from "./routes/LoginRoute";
import RegisterRoute from "./routes/RegisterRoute";
import TaskListRoute from "./routes/TaskListRoute";
import EditTaskRoute from "./routes/EditTaskRoute";
import TaskItemRoute from "./routes/TaskItemRoute";
import "./App1.css";

function App() {
  return (
    <div data-testid="app" className="App">
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route path="/tasks" element={<TaskListRoute />} />
        <Route path="/editTask/:id" element={<EditTaskRoute />} />
        <Route path="/taskItem" element={<TaskItemRoute />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
