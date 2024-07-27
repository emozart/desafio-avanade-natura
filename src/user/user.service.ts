import { Injectable } from '@nestjs/common';
import { UserRepoListResponseDto } from './dto/user-repo-list-response.dto';
import { UserDataResponseDto } from './dto/user-data-response.dto';

@Injectable()
export class UserService {
  async getUserData(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (response.status !== 200) return data;

    const userdata: UserDataResponseDto = {
      name: data.name,
      avatar_url: data.avatar_url,
      email: data.email,
      bio: data.bio,
      followers: data.followers,
      public_repos: data.public_repos,
    };

    return userdata;
  }

  async getUserRepoList(username: string) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
    );
    const data = await response.json();

    if (response.status !== 200) return data;

    return this.generateRepoList(data);
  }

  private generateRepoList(data: any) {
    const repoList = data.map((repo: UserRepoListResponseDto) => {
      return {
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
      };
    });

    return repoList;
  }
}
