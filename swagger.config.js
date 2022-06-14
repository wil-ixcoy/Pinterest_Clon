


const swaggerSpect = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API BLOG',
        version: '1.0.0',
        description: `<h1><b>Documentación de la API para un blog, hecha con NodeJS, Express, Postgres, Sequelize, Docker, Passport.js y Swagger</b></h1> <br>
          Como parte de la práctica de desarrollo de aplicaciones web, se ha desarrollado una API RESTful para un blog que contiene los siguientes servicios:
          <ul>
            <li>Autenticación de usuarios y administradores</li>
            <li>CRUD de usuarios</li>
            <li>CRUD de Administrdores</li>
            <li>CRUD de Categorías</li>
            <li>CRUD de Posts</li>
            <li>CRUD de Comentarios</li>
          </ul>
          <h2>Funciones de los administradores</h2>
          <ul>
            <li>Crear una nueva categoría</li>
            <li>Actualizar una categoría</li>
            <li>Eliminar una categoría</li>
            <li>Obtener un administrador</li>
            <li>Obtener todos los administradores</li>
            <li>Obtener uno o todos los usuarios</li>
            <li>Todas las funciones de administrador requiere el token y el rol de admin(el rol es creado de manera automática)</li>
            <li>No pueden crear, actualizaro eliminar post y comentarios</li>
          </ul>
          <h2>Funciones de los usuarios</h2>
          <ul>
            <li>Crear un post o comentario propio</li>
            <li>Actualizar un post o comentario propio</li>
            <li>Eliminar un post o comentario propio</li>
            <li>Obtener uno o todos los usuarios</li>
            <li>Todas las funciones de administrador requiere el token y el rol de user(el rol es creado de manera automática)</li>
          </ul>
          <h2>Usuarios, administradores y personas no registradas pueden: </h2>
          <ul>
            <li>Obtener una o todas la categorías</li>
            <li>Obtener uno o todos los posts</li>
            <li>Obtener uno o todos los comentarios</li>
          </ul>
          <h3>Todos las funciones de crear, actualizar y eliminar, requieren token, este es de tipo Barer</h3>
          <a href="https://www.linkedin.com/in/wiliams-ixcoy-656074229/">Perfil de linkedIn 💙</a> <br>
          <a href="https://github.com/Wiliams-wq/API_Blog">Link del repositorio en GitHub 🖤</a> <br>
          <a href="https://twitter.com/wiliCode">Perfil de Twitter 💚</a>
          <br>
          <br>
          <h4>Wiliams Alexander Tzoc Ixcoy, 15 de mayo de 2,022</h4>
          `,
      },
      servers: [
        {
          url: 'http://localhost:3000/',
          description: 'Localhost',
        },
        {
          url: 'https://arcane-castle-52549.herokuapp.com/api/v1',
          description: 'Heroku',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };
  
  module.exports = swaggerSpect;