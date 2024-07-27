import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUserData(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const userdata = await response.json();
    console.log(response);
    return userdata;
  }

  async getUserRepoList(username: string) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
    );
    const userdata = await response.json();
    console.log(response);
    return userdata;
  }
}
