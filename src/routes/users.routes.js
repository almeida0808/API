const { Router } = require("express"); // tiramos o Router de dentro do express

const UsersController = require("../controllers/usersController"); // // importa todas funçoes de controles dos usuários (criar, atulaizar, deletar)
const usersController = new UsersController(); // importa as funções de dentro do users contollers

const UserAvatarController = require("../controllers/UserAvatarController");
const userAvatarController = new UserAvatarController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const usersRouter = Router(); // Roda o Router toda vez que usarmos o usersRouter

usersRouter.post("/", usersController.create); // executa a função toda vez que fiermos alguma solicitação relacionado com a parte de usuários
usersRouter.put("/", ensureAuthenticated, usersController.update); // toda vez que colocarmos um id como parametro automaticamente ele entende que estamos querendo atualizar o usuário
usersRouter.patch(
  "/avatar", // indica a rota
  ensureAuthenticated, // faz a verificação se o user esta autenticado
  upload.single("avatar"), // informa que ira atualizar somente o avatar
  userAvatarController.update // faz a função update
);

module.exports = usersRouter; // exporta todo o arquivo para conectarmos com o index.js
