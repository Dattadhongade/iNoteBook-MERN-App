const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const router = express.Router();

const app = express();
const port = 3000;

app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Hello Datta");
// });

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
