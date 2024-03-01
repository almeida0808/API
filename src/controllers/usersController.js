class usersController {

  create(request, response) {
    const { name, email, senha } = request.body;

    response.status(201).json({ name, email, senha });
  }

}

module.exports = usersController;
