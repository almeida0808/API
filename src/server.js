require("express-async-errors"); // importa a biblioteca de erros do node

const migrationsRun = require("./database/sqlite/migrations"); // importa o banco de dados

const AppError = require("./utils/AppError"); // importa as funções de erros/coisas inesperadas

const express = require("express"); // adiciona todas funcionalidades do express
const routes = require("./routes"); // importa nosso arquivo de controle de rotas pro servidor
const cors = require("cors");

const uploadConfig = require("./configs/upload");

migrationsRun(); // cria nosso banco de dados caso não tenha nenhum criado

const app = express(); // inicia o express

app.use(express.json()); // indica pra nossa aplicação que os dados que estão sendo capturados são no formato json.
app.use(cors());

app.use(routes); // roda o nosso arquivo de rota a cada nova solicitação feita pelo usuário
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
  // toda vez que for requisitado algo, ele faz a função abaixo
  if (error instanceof AppError) {
    // se o tipo de erro da aplicação for um erro do cliente , retorne a seguinte mensagem:
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  return response.status(500).json({
    // caso não seja um erro do cliente emita uma mensagem dizendo q o erro é interno do server
    status: "error",
    message: "Internal server error",
  });
});

const PORT = 3333; // definimos o ndereço da porta
app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
); /* LISTEN fica observando o endereço da nossa porta e assim que for iniciado coloca essa mensagem no console.log*/
