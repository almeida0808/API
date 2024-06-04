const { hash } = require("bcryptjs"); // importa uma função(compare) da biblioteca bcrypts que permie que a gente compare uma senha normal com uma criptografada
const AppError = require("../utils/AppError"); // importa o nosso capturador de erros

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    // verifica se o email existe
    const checkUserExists = await this.userRepository.findByEmail(email);
    if (checkUserExists) {
      // caso o email exista ele envia um novo erro
      throw new AppError("Este email já existe.");
    }

    // primeiro informamos o q queremos criptografar, depois onivel de criptografia que desejamos
    const passwordCrypted = await hash(password, 8); // atravez da bibliocteca bcrypts usamos a função hash e conseguimos cryptografar nossa senha,
    if (!passwordCrypted) {
      throw new AppError("Por favor digite uma senha válida!");
    }

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: passwordCrypted,
    });

    return userCreated;
  }
}
module.exports = UserCreateService;
