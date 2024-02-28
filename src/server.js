const express = require("express"); // adiciona todas funcionalidades do express

const app = express(); // inicia o express

app.get('/message/:id/:user', (request, response) => {
    const {id, user} = request.params

    response.send(`
    o id da menssagem é: ${id}
    para o usuário: ${user}`)
})

app.get('/users' , (request, response) => {
    const {page, categoria} = request.query

    response.send(`você está na pag:${page}.
    e na categoria:${categoria}.`)
})

app.post('/funcionarios' , (request, response) => {
 response.send('Você chegou no método POST')
})
const PORT = 3333; // definimos o ndereço da porta
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// listen fica observando o endereço da nossa porta e assim que for iniciado coloca essa mensagem no console.log


