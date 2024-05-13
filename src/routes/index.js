const { Router } = require("express"); // tiramos o Router de dentro do express
const usersRoutes = require("./users.routes"); // importa as funções de rotas de usuarios
const notesRoutes = require("./notes.routes");
const tagsRoutes = require("./tags.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router(); // roda o Router toda vez que usarmos o routes

routes.use("/users", usersRoutes); // quando entrarmos na parte de usuário da nossa API, ele busca dentro do arquivo de rotas que foi criado apenas para conter as rotas relacionadas com usuarios
routes.use("/notes", notesRoutes); // quando for acessado a pagina de notas ele busca quais caminhos/rotas existem dntro do nosso arquivo notes.routes.js
routes.use("/tags", tagsRoutes);
routes.use("/sessions", sessionsRoutes); // quando acessa a rota /sessions ele busca quais funções existem dentro dessa rota

module.exports = routes; // exporta todas nossas rotas pra ser usadas no servidor
