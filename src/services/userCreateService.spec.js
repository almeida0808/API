const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("verificar se o usuário foi criado", async () => {
    const user = {
      name: "userTest",
      email: "test@mail.com",
      password: "123",
    };

    const userCreated = await userCreateService.execute(user);
    console.log(userCreated);

    expect(userCreated).toHaveProperty("id");
  }),
    it("verificar email já cadastrado", async () => {
      const user1 = {
        name: "teste1",
        email: "teste@email.com",
        password: "123",
      };
      const user2 = {
        name: "teste2",
        email: "teste@email.com",
        password: "456",
      };

      await userCreateService.execute(user1);
      await expect(userCreateService.execute(user2)).rejects.toEqual(
        new AppError("Este email já existe.")
      );
    });
});
