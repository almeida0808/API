const { Router } = require("express"); // importa a função de rotas do express
 
const NotesController = require("../controllers/notesController"); // importa nossos controles/ações relacionadas as notas

const notesRouter = Router(); // executa a função de rotas do express

const notesController = new NotesController(); // possibilita que rodamos as funções que estão dentro da class de controles das notas

notesRouter.post("/:user_id", notesController.create); // caso seja acessado a rota de criar notas ele realiza a função create, que em do controle de notas
notesRouter.get("/:id", notesController.show)

notesRouter.delete("/:id", notesController.delete)

module.exports = notesRouter; 
