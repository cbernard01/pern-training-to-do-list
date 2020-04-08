const express = require("express");
const app = express();
const cors = require("cors");

const todoRoutes = require("./routes/todo-routes");

// MIDDLEWARE //
app.use(cors());
app.use(express.json()); // req.body

// ROUTES //
app.use("/api",todoRoutes);

app.listen(5000, ()=> {
  console.log("sever has started on port 5000");
});
