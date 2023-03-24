


const swaggerSpect = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clon de Pinterest',
      version: '1.0.0',
      description: `<h1><b>
      Clon de Pinterest, realiza con NodeJS, Express, Postgres, Sequelize, Docker, Passport.js, Swagger y Heroku
      </b></h1>
      <br>
      Proyecto realizado con el objetivo de mejorar mis habilidades en el desarrollo de aplicaciones web del lado del servidor, de la misma manera
      a utilizar nuevos paquetes de node.js como multer y el uso de terceros como Google y Facebook para iniciar sesión.
      <h2>Secciones</h2>
      <h3>1. Autenticación</h3>
      <p>En esta sección se puede iniciar sesión por parte del usuario ya registrado, esto se logra mediante email y contraseña, Google y Twitter.</p>
      <p>Al iniciar sesión mediante cualquier método, obtienes el token.</p>
      <br>
      <h3>2. Usuarios</h3>
      <p>En la sección de usuarios, se puede registrar, obtener todos los usuarios, obtener un usuario, actualizar y eliminar.</p>
      <p>Para la parte de obtener un solo usuario, actualizar y eliminar requiere de un token de tipo Bearer.</p>
      <br>
      <h3>3. Imágenes</h3>
      <p>En la sección de imágenes, se puede subir una imagen con titulo y descripción, obtener todas las imágenes, obtener una imagen, actualizar el titulo o descripción y eliminar.</p>
      <p>Todas las acciones requiren del token.</p>
      <p>Además, las imagenes son redimensionadas para no perder el tamaño y tener uniformidad en el frontend</p>
      <br>
          <a href="https://www.linkedin.com/in/wiliamsixcoy/">Perfil de linkedIn 💙</a> <br>
          <a href="https://github.com/wil-ixcoy/Clon_Pinterest">Link del repositorio en GitHub 🖤</a> <br>
          <a href="https://twitter.com/wil_ixcoy">Perfil de Twitter 💚</a>
          <br>
          <br>
          <h4>Wiliams Alexander Tzoc Ixcoy, 15 de Junio de 2,022</h4>
          `,
    },
    /* create configuration for auth bearer */
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          name: 'Authorization',
          description: 'Inicia sesión o registrate, obtén el token y escribelo en el campo de autorización',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Localhost',
      },
      {
        url: 'https://pinterestclon-production.up.railway.app/',
        description: 'Heroku',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerSpect;