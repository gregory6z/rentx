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
    await this.usersRepository.create({
      name,
      password,
      email,
      drive_license,
    });
  }
}
