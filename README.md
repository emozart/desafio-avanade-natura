## Description

Esta é uma API desenvolvida para processo seletivo da Avanade para uma vaga no cliente Natura.

A API obtem dados de um usuário do github e seus repositórios.

Você pode acessar a documentação e testar a api acessando o link abaixo:

[http://ec2-54-84-123-173.compute-1.amazonaws.com/docs](http://ec2-54-84-123-173.compute-1.amazonaws.com/docs)

## Endpoints

| Path | Descrição |
|---|---|
| `/user/{username}` | Retorna os dados do usuário.|
| `/user/{username}/repos` | Retorna a lista de repositórios públicos no usuário.|

## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|
| `404` | Usuário pesquisado não encontrado (Not found).|

## Clone repo
Caso queira executar o projeto de forma local execute o clone do projeto com o comando abaixo e siga as instruções seguintes.

```bash
$ git clone https://github.com/emozart/desafio-avanade-natura.git
```

## Instalação

```bash
$ npm install
```

## Executar o projeto

```bash
# desenvolvimento
$ npm run start

# watch mode
$ npm run start:dev

# produção
$ npm run start:prod
```

## Teste unitário e e2e

```bash
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e
```

## Contato

- Author - [Elton Mozart](https://www.linkedin.com/in/eltonmozart)

