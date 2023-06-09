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

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(cors(options));
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
app.get("/", (req, res) => {
  res.send(`
    <h1><b>Bienvenidos al clon de Pinterest, para saber como funciona la API y poder probarlo ve a 👇:</b></h1>
    <h2>
      <a href="https://pinterestclon-production.up.railway.app/api/docs" style="text-decoration:none;">
        https://pinterestclon-production.up.railway.app/api/docs
      </a>
    </h2>
    <br>
    <h3><b>Si quieres conocerme, estas son mis redes👇:</b></h3>
        <h4><a href="https://www.linkedin.com/in/wiliamsixcoy/" style="text-decoration:none;">Mi perfil de linkedIn 💙</a> </h4>
        <h4><a href="https://twitter.com/wil_ixcoy" style="text-decoration:none;">Mi Perfil de Twitter 💚</a> </h4>
        <h4><a href="https://github.com/wil-ixcoy/Pinterest_Clon" style="text-decoration:none;">Link del proyecto en GitHub 🖤</a> </h4>
        <br>
    <h3><b>Escribeme :)</b></h3>
        `);

})
app.listen(port, () => {
  console.log("listening on port 3000");
});
