const { Router } = require("express"); // tiramos o Router de dentro do express 

const usersRouter = Router(); // Roda o Router toda vez que usarmos o usersRouter

usersRouter.post("/", ); // executa a função toda vez que fiermos alguma solicitação relacionado com a parte de usuários 

module.exports = usersRouter; // exporta todo o arquivo para conectarmos com o index.js
