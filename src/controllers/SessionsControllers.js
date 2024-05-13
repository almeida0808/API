const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");

const authConfig = require("../configs/auth"); // nossa config
const { sign } = require("jsonwebtoken"); // função da nossa bibliteca que cria um token assinado pela chave secreta

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body; // pega as informações forncidas pelo usuario, ou seja oq ele escrever nos campos de email e senha

    const user = await knex("users").where({ email }).first(); // faz uma busca com o email informado pelo usuario

    if (!user) {
      // caso a busca acima não encontr nenhum usuário, retorne um erro
      throw new AppError("E-mail e/ou senha Inválidos", 401);
    }

    // pega a senha informada pelo usuario , e compara com a senha criptografada do banco de dados
    const passwordIsCorrect = await compare(password, user.password);

    // caso as senhas não sejam igual a const vai ser false, e caso for false envia um erro
    if (!passwordIsCorrect) {
      throw new AppError("E-mail e/ou senha Inválidos", 401);
    }

    const { expiresIn, secret } = authConfig.jwt; // desestrutura os dados que foram passados nas nossas configs

    // sign usa como parametro um objeto vazio, a chave secreta(secret) e o conteudo
    const token = sign(
      {}, // objeto vazio
      secret, // chave secreta
      {
        //informar o conteudo que vai conter no token
        subject: String(user.id), //  o id do usuario transsformado em string
        expiresIn, // tempo de expiração
      }
    );

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
