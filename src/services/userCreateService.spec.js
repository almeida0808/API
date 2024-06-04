const { except } = require("../database/knex");
const UserCreateService = require("./UserCreateService");
const UserRepository = require("../repositories/UserRepository");

it("verificar se o usuário foi criado", () => {
  const user = {
    name: "userTest",
    email: "test@mail.com",
    password: "123",
  };

  const userRepository = new UserRepository();
  const userCreateService = new UserCreateService(userRepository);
  const userCreated = userCreateService.execute(user);

  except(userCreated).toHaveProperty("id");
});
