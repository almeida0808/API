const { Router } = require("express");

const SessionsController = require("../controllers/SessionsControllers");
const sessionsController = new SessionsController();

const sessionsRoutes = Router();
sessionsController.post("/", sessionsController.create);

module.exports = sessionsRoutes;
