const { Router } = require("express"); // tiramos o Router de dentro do express
const UsersController = require("../controllers/usersController");  // // importa todas funçoes de controles dos usuários (criar, atulaizar, deletar)
const usersRouter = Router(); // Roda o Router toda vez que usarmos o usersRouter


const usersController = new UsersController(); // importa as funções de dentro do users contollers

usersRouter.post("/", usersController.create); // executa a função toda vez que fiermos alguma solicitação relacionado com a parte de usuários

module.exports = usersRouter; // exporta todo o arquivo para conectarmos com o index.js
