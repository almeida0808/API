const sqliteConnection = require("../../sqlite/index"); // importa a função de conexão com o banco de dados
const createUsers = require("./createUsers"); // importa o nosso texto que tem como função verificar se ja existe um banco de dados, caso não exista ele cria(ja com a tabela de users)

async function migrationsRun() {
  const schemas = [  // essa parte são como se fosse nossas tabelas, e aqui dentro infomamos quais tabelas desejamos criar, caso tenha mais de uma, nesse caso só tem a de usuários 
    createUsers // adiciona o texto que cria a tabela de usuários
  ].join('');// o join serve pra dar um espaço entre o código das tabelas caso tenha mais de uma

  sqliteConnection() // se conecta com nosso database
  .then(db => db.exec(schemas)) // faz com que aquele código passado dentro do "schema" seja executado, fazendo assim que o nosso banco de dados inicie ja com a tabela configurada
  .catch(error => console.error()) // captura qualquer erro e nos avisa, caso tenha algum
}

module.exports = migrationsRun