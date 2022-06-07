const express = require("express");
const cors = require("cors");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");
const app = express();
const indexRouter = require("./routes/index.js");
/* middleware para recibir informacion en formato json */
app.use(express.json());

app.use(cors());
indexRouter(app);

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port 3000");
});
