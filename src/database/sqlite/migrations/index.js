const sqliteConnection = require("../../sqlite/index"); // importa a função de conexão com o sql
const createUsers = require("./createUsers"); // importa o nosso texto qu tem como função verificar se ja existe um banco de dados, caso não exista ele cria(ja com a tabela de users)

async function migrationsRun() {
  // essa parte são como se fosse nossas tabelas, e aqui dentro infomamos quais tabelas desejamos criar, caso tenha mais de uma, nesse caso só tem a de usuários 
  const schemas = [
    createUsers // adiciona o texto que cria a tabela de usuários
  ].join('');// o join serve pra dar um espaço entre o código das tabelas caso tenha mais de uma

  sqliteConnection() // chama nossa função de se conectar com sqlite/criar um banco de dados
  .then(db => db.exec(schemas)) // executa os meus esquemas 
  .catch(error => console.error()) // caso dê algum erro vai ser avisado no console.log
}


module.exports = migrationsRun