const express = require("express"); // adiciona todas funcionalidades do express

const routes = require("./routes")

const app = express(); // inicia o express

app.use(express.json()); // indica pra nossa aplicação que os dados que estão sendo capturados são no formato json.

app.use(routes)

const PORT = 3333; // definimos o ndereço da porta
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
/* LISTEN
 fica observando o endereço da nossa porta e assim que for iniciado coloca essa mensagem no console.log*/

/* ROUTE PARAMS
app.get('/message/:id/:user', (request, response) => {
    const {id, user} = request.params

    response.send(`
    o id da menssagem é: ${id}
    para o usuário: ${user}`)
})*/

/* QUERY PARAMS
app.get('/users' , (request, response) => {
    const {page, categoria} = request.query

    response.send(`você está na pag:${page}.
    e na categoria:${categoria}.`)
})*/
