# Meu Pet Club API

Projeto desenvolvido como teste para vaga de Desenvolvedor Back-End Pleno

### Requisitos

#### Cadastro de usuário administrador do sistema

- [x] Deve ser possível cadastrar um usuário do tipo “ADMINISTRADOR” no sistema

#### Cadastro de clientes

- [x] Um usuário “ADMINISTRADOR” será capaz de criar usuários do tipo “CLIENTE” no sistema, dando-lhe credenciais de acesso

#### CRUD de Planos

- [x] Um usuário do tipo “ADMINISTRADOR” será capaz de criar, editar, ler e excluir planos do sistema

- [x] Um usuário do tipo “CLIENTE” é capaz de ler planos

#### CRUD de Pet

- [x] Um usuário do tipo “CLIENTE” será capaz de criar um pet e associá-lo a sua conta
- [x] Um pet deve ter obrigatoriamente um id de plano associado a si
- [x] Um usuário do tipo “CLIENTE” também será capaz de ler, editar e deletar pets associados a sua conta

#### Sistema de autenticação e autorização

- [x] Deve haver um sistema de autenticação utilizando JWT

- [x] Cada tipo usuário deve ter apenas os acessos que lhe foram associados nos requisitos acima

### Instalação

Realize o clone do repositório e acesse a pasta

```bash
  git clone https://github.com/brunompe/meu-pet-club-backend.git
  cd meu-pet-club-backend
```

Realize as instalações das dependências

```bash
  npm install
```

renomeie o arquivo .env.example para .env

```bash
  mv .env.example .env
```

Altere as chaves do .env de acordo com suas variáveis de ambiente.

- Dica: Crie um cluster através do MongoDB Atlas.

Após setar as variáveis de ambiente, precisamos gerar os modelos do banco

```bash
   npx prisma generate
```

Agora é só rodar o projeto

```bash
   npm start
```

Ou se quiser rodar em modo de desenvolvimento

```bash
   npm run start:dev
```

### Postman Collection

Para importar a collection do Postman, basta importar o arquivo "Meu Pet Club API.postman_collection.json" que está na raiz do projeto.

### Documentação

Para acessar a documentação, inicie a aplicação e acesse

```bash
   http:// localhost:3000/api
```

### Autor

#### Bruno Miranda

- [Github](https://www.github.com/brunompe)
- [Linkedin](https://www.linkedin.com/in/brunompe)
- [E-mail](brunompe@gmail.com)
