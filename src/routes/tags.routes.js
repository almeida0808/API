const { Router } = require("express");
const TagsController = require("../controllers/tagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRouter = Router();

const tagsController = new TagsController();
tagsRouter.get("/:user_id", ensureAuthenticated, tagsController.index);

module.exports = tagsRouter;
