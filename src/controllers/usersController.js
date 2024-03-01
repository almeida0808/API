const AppError = require('../utils/AppError')

class usersController {

  create(request, response) {
    const { name, email, senha } = request.body;

    if (!name) {
      throw new AppError('Nome é obrigatório')
    }

    response.status(201).json({ name, email, senha });
  }

}

module.exports = usersController;
