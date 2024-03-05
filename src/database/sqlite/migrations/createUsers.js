const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
` //ESSA TABELA SÓ VAI SER CRIADO CASO ELA NÃO EXISTA 
module.exports = createUsers