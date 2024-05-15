const knex = require("../database/knex"); // importa a conexão com database
const DiskStorage = require("../providers/diskStorage"); // funcionalidades de upload de imagem
const AppError = require("../utils/AppError"); // controlador dos erros da aplicação

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id; // pega o id do usuário
    const avatarFilename = request.file.filename; // pega o nome da imagem que foi enviada pelo user

    const diskStorage = new DiskStorage(); // importa as funções do diskStorage

    const user = await knex("users").where({ id: user_id }).first(); // cria uma const com o user buscando com o where filtrando pelo id do usuário

    if (!user) {
      // se o user não existir ele manda um erro
      throw new AppError("Este usuário não existe", 401);
    }

    if (user.avatar) {
      // caso ja tenha imagem ele deleta a imagem que ja tinha
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename); // quando o user envia uma imagem ela vai pra pasta temp, nessa linha nos criamos uma const que guarda o nome da nova imagem que foi enviada e tambem pega a nova imagem e tira da pasta tmp e guarda na pasta upload usando a function saveFile

    user.avatar = filename; // alera no banco de dados o antigo nome da imgmagem para o novo nome

    await knex("users").update(user).where({ id: user_id }); // dentro da tabela users ele atualiza os dados do usuário atingo pros novos dados , filtrando pelo id para não ter risco de atualizar o user errado.
    return response.json(user); // retorna os dados do user
  }
}

module.exports = UserAvatarController;
