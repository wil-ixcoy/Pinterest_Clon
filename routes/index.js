const express = require("express");
const userRouter = require("./user.router");
const imageRouter = require("./image.router");
const AuthRouter = require("./auth.router");

function indexRouter(app) {
  const router = express.Router();
  app.use("/", (req, res) => {
    res.send(`
    <h1><b>Bienvenidos al clon de Pinterest, para saber como funciona la API y poder probarlo ve a 👇:</b></h1>
    <h2>
      <a href="https://infinite-meadow-99672.herokuapp.com/api/docs" style="text-decoration:none;">
        https://infinite-meadow-99672.herokuapp.com/api/docs
      </a>
    </h2>
    <br>
    <h3><b>Si quieres conocerme, estas son mis redes👇:</b></h3>
        <h4><a href="https://www.linkedin.com/in/wiliams-ixcoy-656074229/" style="text-decoration:none;">Mi perfil de linkedIn 💙</a> </h4>
        <h4><a href="https://twitter.com/wiliamsTI" style="text-decoration:none;">Mi Perfil de Twitter 💚</a> </h4>
        <h4><a href="https://github.com/wiliamsTI/Clon_Pinterest" style="text-decoration:none;">Link del proyecto en GitHub 🖤</a> </h4>
        <br>
    <h3><b>Escribeme :)</b></h3>
        `);
  });
  app.use("/api", router);
  router.use("/users", userRouter);
  router.use("/images", imageRouter)
  router.use("/auth", AuthRouter);
}

module.exports = indexRouter;
