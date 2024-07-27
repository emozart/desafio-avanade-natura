import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserDataResponseDto } from './dto/user-data-response.dto';
import { UserRepoListResponseDto } from './dto/user-repo-list-response.dto';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserData', () => {
    it('should return user data', async () => {
      const username = 'joaosilva';
      const response = {
        status: 200,
        json: jest.fn().mockResolvedValue({
          name: 'João da Silva',
          avatar_url: 'https://avatars.urlfake.com',
          email: 'joao.silva@gmail.com',
          bio: 'Mestre da programação',
          followers: 30,
          public_repos: 8,
        }),
      };
      global.fetch = jest.fn().mockResolvedValue(response as any);

      const userData: UserDataResponseDto = await service.getUserData(username);

      expect(userData).toEqual({
        name: 'João da Silva',
        avatar_url: 'https://avatars.urlfake.com',
        email: 'joao.silva@gmail.com',
        bio: 'Mestre da programação',
        followers: 30,
        public_repos: 8,
      });
    });

    it('should return a error message when the response status is not 200', async () => {
      const username = 'usuario-não-existe';
      const response = {
        status: 404,
        json: jest.fn().mockResolvedValue({
          message: 'Not Found',
          status: 404,
        }),
      };
      global.fetch = jest.fn().mockResolvedValue(response as any);

      const result = await service.getUserData(username);

      expect(result).toEqual({
        message: 'Not Found',
        status: 404,
      });
    });
  });

  describe('getUserRepoList', () => {
    it('should return user repo list', async () => {
      const username = 'joaosilva';
      const response = {
        status: 200,
        json: jest.fn().mockResolvedValue([
          {
            name: 'helloworld',
            full_name: 'joaosilva/helloworld',
            html_url: 'https://github.com/joaosilva/helloworld',
          },
        ]),
      };
      global.fetch = jest.fn().mockResolvedValue(response as any);

      const repoList: UserRepoListResponseDto[] =
        await service.getUserRepoList(username);

      expect(repoList).toEqual([
        {
          name: 'helloworld',
          full_name: 'joaosilva/helloworld',
          html_url: 'https://github.com/joaosilva/helloworld',
        },
      ]);
    });

    it('should return error message when the response status is not 200', async () => {
      const username = 'joaosilva';
      const response = {
        status: 404,
        json: jest.fn().mockResolvedValue({
          message: 'Not Found',
          status: 404,
        }),
      };
      global.fetch = jest.fn().mockResolvedValue(response as any);

      const result = await service.getUserRepoList(username);

      expect(result).toEqual({
        message: 'Not Found',
        status: 404,
      });
    });
  });
});
