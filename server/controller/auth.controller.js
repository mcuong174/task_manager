import connectionDB from "../database/index.js";
import bcrypt from "bcryptjs";
const saltRounds = 10;

const authController = {
  register: async (req, res) => {
    try {
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
    } catch (error) {
      console.log(error);
      res.json({
        error: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
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
    } catch (error) {
      console.log(error);
      res.json({
        error: error.message,
      });
    }
  },
};

export default authController;
