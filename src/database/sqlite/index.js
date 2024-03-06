const sqlite3 = require("sqlite3"); // driver da versão do sql que vamos usar
const sqlite = require("sqlite"); // driver que faz conectar com o banco de dados
const path = require("path"); // biblioteca que corrige o problema relacionado com o local de armazenamento do nosso database

async function sqliteConection() { // cria uma função assincorona
  const database = await sqlite.open({  // abre nosso 
    filename: path.resolve(__dirname, "..", "database.db"),  // indica o local do arquivo do banco de dados usando o path
    driver: sqlite3.Database, // indica qual driver estamos usando
  });
  return database; // retorna o banco de dados
}
module.exports = sqliteConection // exporta a conexão com o banco de dados para o nosso server
