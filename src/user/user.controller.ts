import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async findUser(@Param('username') username: string) {
    return await this.userService.getUserData(username);
  }

  @Get(':username/repos')
  async listRepos(@Param('username') username: string) {
    return await this.userService.getUserRepoList(username);
  }
}
