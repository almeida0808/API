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
` // cria um database com a tabela users ja configurada
module.exports = createUsers