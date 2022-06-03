const express = require("express");
const cors = require("cors");

const app = express();
const indexRouter = require("./routes/index.js");
/* middleware para recibir informacion en formato json */
app.use(express.json());

app.use(cors());
indexRouter(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port 3000");
});
