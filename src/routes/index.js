const { Router } = require("express");  // tiramos o Router de dentro do express 
const usersRoutes = require('./users.routes') // importa as funções de rotas de usuarios

const routes = Router() // roda o Router toda vez que usarmos o routes




routes.use("/users", usersRoutes) // quando entrarmos na parte de usuário da nossa API, ele busca dentro do arquivo de rotas que foi criado apenas para conter as rotas relacionadas com usuarios

module.exports = routes // exporta todas nossas rotas pra ser usadas no servidor