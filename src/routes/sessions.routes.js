const { Router } = require("express");

const SessionsController = require("../controllers/SessionsControllers");
const sessionsController = new SessionsController();

const sessionsRoutes = Router();
sessionsRoutes.post("/", sessionsController.create); // caso seja acessado /sessions sem nem um otro caminho ele realiza o metodo post e executa a função create que esta dentro do SessionsController

module.exports = sessionsRoutes;
