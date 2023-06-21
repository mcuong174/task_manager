import mysql from "mysql2";

const connectionDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connectionDB.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database: " + error.stack);
    return;
  }

  console.log(
    "Connected to MySQL database with threadId: " + connectionDB.threadId
  );
});

export default connectionDB;
