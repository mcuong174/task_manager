import connectionDB from "../database/index.js";

const postsController = {
  getAll: async (req, res) => {
    try {
      connectionDB.query(
        "SELECT * FROM tasks ORDER BY id DESC",
        (err, data) => {
          if (err) {
            return res.json({ error: err.sqlMessage });
          } else {
            return res.json({ data });
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      connectionDB.query(
        "SELECT * FROM tasks WHERE id = ? ",
        [id],
        (err, data) => {
          if (err) return res.json({ error: err.sqlMessage });
          else return res.json({ data });
        }
      );
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  create: async (req, res) => {
    try {
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
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  update: async (req, res) => {
    try {
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
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      connectionDB.query(
        "DELETE FROM tasks WHERE id = ?",
        id,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            return res.json(result);
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
};

export default postsController;
