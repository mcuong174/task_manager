import mysql from "mysql";

const connectionDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connectionDB.getConnection((err, conn) => {
  if (err) console.log(err);
  console.log("Connected successfully");
});

export default connectionDB.promise();
