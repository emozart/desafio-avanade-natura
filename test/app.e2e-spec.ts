import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { REPOLIST } from './testData';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(GET) SUCCESS - /user/:username', () => {
    return request(app.getHttpServer())
      .get('/user/emozart')
      .expect(200)
      .expect({
        name: 'Elton Mozart',
        avatar_url: 'https://avatars.githubusercontent.com/u/13687770?v=4',
        email: null,
        bio: 'Desenvolvedor fullstack que brinca nos dev mundos da Web, Mobile e Desktop.\r\nSempre em busca de novos conhecimentos. #EvoluindoSempre',
        followers: 10,
        public_repos: 59,
      });
  });

  it('(GET) FAIL - /user/:username', () => {
    return request(app.getHttpServer())
      .get('/user/usuario-nao-existe')
      .expect(404)
      .expect({
        message: 'Not Found',
        statusCode: 404,
      });
  });

  it('(GET) FAIL - /user', () => {
    return request(app.getHttpServer()).get('/user').expect(404).expect({
      message: 'Cannot GET /user',
      error: 'Not Found',
      statusCode: 404,
    });
  });

  it('(GET) SUCCESS - /user/:username/repos', () => {
    return request(app.getHttpServer())
      .get('/user/emozart/repos')
      .expect(200)
      .expect(REPOLIST);
  });

  it('(GET) FAIL - /user/:username/repos', () => {
    return request(app.getHttpServer())
      .get('/user/usuario-nao-existe/repos')
      .expect(404)
      .expect({
        message: 'Not Found',
        statusCode: 404,
      });
  });
});
