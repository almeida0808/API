require('express-async-errors')
const AppError = require('./utils/AppError')
const express = require("express"); // adiciona todas funcionalidades do express

const routes = require("./routes") // importa nosso arquivo de controle de rotas pro servidor

const app = express(); // inicia o express
app.use(express.json()); // indica pra nossa aplicação que os dados que estão sendo capturados são no formato json.

app.use(routes) // roda o nosso arquivo de rota a cada nova solicitação feita pelo usuário

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }
  
    console.error(error)
  
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  })


const PORT = 3333; // definimos o ndereço da porta
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); /* LISTEN fica observando o endereço da nossa porta e assim que for iniciado coloca essa mensagem no console.log*/
