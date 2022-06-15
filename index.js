const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
/* swagger */
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpect = require('./swagger.config');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");
require("./utils/auth/index");
const app = express();
const indexRouter = require("./routes/index.js");
/* middleware para recibir informacion en formato json */
app.use(express.json());

/* uso del middleware para sesion de express*/
app.use(session({ secret: "secret" }));
/* serializarion y deserilizaion del usuario en passport al iniciar sesion */
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
indexRouter(app);

/* use swagger */
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(swaggerSpect))
);
app.use(ormErrorHandler);

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port 3000");
});
