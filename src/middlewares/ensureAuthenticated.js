const { verify } = require("jsonwebtoken"); // basicamente serve pra verificar tokens, ele decodifica o token original para ser comparado com o token inbformado, para ver se é o mesmo
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization; // pega o cabeçalho de autorização , que contem o token JWT

  if (!authHeader) {
    // caso ão encontre o cabeçalho com o token retorne um erro
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" "); // caso tenha encontrado o cabeçalho ele desestrutura e separa a parte "inutil" do token usando o split, e atribui o nome token nessa parte util que no caso é o token

  try {
    // tenta fazer esse bloco de código abaixo

    const { sub: user_id } = verify(token, authConfig.jwt.secret); // verifica se o token informado é igual ao token oficial e se for ele retorna pra gente a propiedade sub(colocamos o nome dela pra user_id), e essa propiedade é o conteudo que o nosso token carrega, no cado o user_id

    // caso tenha dado tudo certo nos atribuimos cria o objeto request.user e dentro dele criamos a propiedade e atribuimos valor a ppropiedade id

    request.user = {
      id: Number(user_id), // transformamos o id em number novamente pois anteriormente nos tinhamos colocado ele como string
    };

    // depois de atribuir o id ao request.user ele prossegue para a prxima função
    return next();
  } catch {
    // agora  caso tenha ocorrido algo de errado ele cai dentro do cath que retorna um erro
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;
