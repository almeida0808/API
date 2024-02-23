const express = require("express"); // adiciona todas funcionalidades do express

const app = express(); // inicia o express

const PORT = 3333; // definimos o ndereço da porta
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// listen fica observando o endereço da nossa porta e assim que for iniciado coloca essa mensagem no console.log


