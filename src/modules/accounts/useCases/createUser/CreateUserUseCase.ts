import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreteUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    password,
    email,
    drive_license,
  }: ICreteUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      drive_license,
    });
  }
}