import mysql from "mysql";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 6000;
const saltRounds = 10;

console.log("port: ", process.env.PORT);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectionDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "task_manager",
});

//Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Login: ", req.body);

  connectionDB.query(
    "SELECT * FROM account WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        res.send({ message: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (error) {
            res.send(error);
          }
          if (response == true) {
            res.send(response);
          } else {
            res.send({ message: "Wrong email or password combination!" });
          }
        });
      } else {
        res.send({ message: "Unregistered user!" });
      }
    }
  );
});

//Register
app.post("/register", (req, res) => {
  const { fullName, email, password } = req.body;

  console.log("Register: ", req.body);

  connectionDB.query(
    "SELECT email FROM account WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length == 0) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          connectionDB.query(
            "INSERT INTO account (fullName, email, password) VALUES (?, ?, ?)",
            [fullName, email, hash],
            (error, response) => {
              if (err) {
                res.send(err);
              }

              // console.log(response);

              if (response) {
                res.send({ message: "Sign In in successfully!" });
              }
            }
          );
        });
      } else {
        res.send({ message: "This email is already in use!" });
      }
    }
  );
});

//Create task
app.post("/newTask", (req, res) => {
  const values = [
    req.body.taskName,
    req.body.description,
    req.body.dueDate,
    req.body.status,
  ];

  connectionDB.query(
    "INSERT INTO tasks (taskName, description,dueDate, status) VALUES (?,?,?,?)",
    [...values],

    (err, data) => {
      if (err) return res.json(err);
      return res.json("Create successful!");
    }
  );
});

//Get tasks
app.get("/tasks", (req, res) => {
  connectionDB.query("SELECT * FROM tasks ORDER BY id DESC", (err, data) => {
    if (err) {
      return res.json({ error: err.sqlMessage });
    } else {
      return res.json({ data });
    }
  });
});

//Get task id
app.get("/task/:id", (req, res) => {
  const id = req.params.id;
  connectionDB.query("SELECT * FROM tasks WHERE id = ? ", [id], (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});

//Update task
app.patch("/task/:id", (req, res) => {
  const id = req.params.id;

  const values = [
    req.body.taskName,
    req.body.description,
    req.body.dueDate,
    req.body.status,
  ];

  connectionDB.query(
    "UPDATE tasks SET taskName = ?, description = ?, dueDate = ?, status = ? WHERE id = ?",
    [...values, id],
    (err, data) => {
      if (err) return res.json(err);
      return res.json("Update successful!");
    }
  );
});

// Delete task
app.delete("/delete/task/:id", (req, res) => {
  const id = req.params.id;

  connectionDB.query("DELETE FROM tasks WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
