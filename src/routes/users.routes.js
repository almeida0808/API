const { Router } = require("express");

const usersRouter = Router();
// tiramos o Router de dentro do express em forma de const pra usarmos a seguir

usersRouter.post("/", (request, response) => {
  const { email, senha, name } = request.body;

  response.json({ email, senha, name });
});

module.exports = usersRouter; // exporta todo o arquivo pra ser usado em outro lugar.
