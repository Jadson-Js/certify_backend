src/
├── application/
│   └── useCases/
│       └── user/
│           └── create/
│               ├── CreateUserUseCase.ts
│               ├── ICreateUserUseCase.ts 
│               └── UserMapper.ts
│
├── domain/
│   ├── entities/
│   │   └── User.ts
│   └── repositories/
│       └── IUserRepository.ts            
│
├── infra/
│   ├── database/
│   │   └── postgres/
│   │       └── user.repository.postgres.ts                
│   │
│   └── http/
│       ├── controllers/
│       │   └── CreateUserController.ts

│       ├── routes/
│       │   └── user.routes.ts
│       └── app.ts                         <-- Config do Express (server)
│
├── shared/                                <-- Novo agrupamento
│   ├── errors/
│   │   └── AppError.ts
│   └── env/
│       └── index.ts
│
└── main.ts                                <-- Entry Point (Starta tudo)





### Fluxo Otimizado (Best Practices)

1.  **Client:** Envia `email` e `senha` + **Device Info** (User-Agent/Fingerprint).
2.  **Server (Validação de Entrada):** Valida formato do email e tamanho da senha (usando Zod/Joi) *antes* de bater no banco.
3.  **Server (Busca User):** Busca usuário pelo email.
      * *Check:* Usuário existe?
      * *Check:* Usuário está ativo/verificado? (Evita login de contas banidas).
4.  **Server (Validação de Senha):** Compara hash da senha (Bcrypt/Argon2).
5.  **Server (Otimização - Geração em Memória):**
      * Em vez de salvar e depois atualizar, **gere o UUID da sessão no código (Node.js)**.
      * Com esse UUID, gere o **Refresh Token** (JWT).
      * Gere o **Hash do Refresh Token** (SHA256 ou Bcrypt).
      * *Motivo:* Isso permite fazer apenas **1 insert** no banco em vez de "Create + Update".
6.  **Server (Persistência Blindada):** Salva na tabela `user_sessions`:
      * `id`: O UUID gerado no passo 5.
      * `userId`: ID do usuário.
      * `tokenHash`: O hash do refresh token (Se o banco vazar, ninguém rouba as sessões).
      * `clientInfo`: IP e User-Agent (Para o usuário saber "Logado no Firefox - Windows").
7.  **Server (Access Token):** Gera o `accessToken` com ID e Role.
8.  **Server (Resposta Segura):**
      * Envia `accessToken` no **Corpo (JSON)**.
      * Envia `refreshToken` via **HttpOnly Cookie** (Proteção contra roubo via XSS no front-end).

-----


### Entrada
O **Client** faz uma requisição para a API enviando apenas o **Refresh Token** (idealmente via Cookie HttpOnly, mas pode ser via Body/Header).

### Processamento no Servidor

1.  **Validação Criptográfica (JWT)**
    * O servidor verifica se a assinatura do Refresh Token é válida usando o `REFRESH_SECRET`.
    * Verifica se o token não está expirado (data de validade do próprio token).
    * *Se falhar:* Retorna erro 401 (Não autorizado) e força logout no front.

2.  **Extração de Dados**
    * O servidor decodifica o payload do token para pegar o `sessionId` (ID da sessão) e o `userId`.

3.  **Busca e Validação no Banco de Dados**
    * O servidor busca na tabela `user_sessions` pelo `id` igual ao `sessionId` extraído.
    * **Check 1:** A sessão existe?
    * **Check 2:** A data `expiresAt` no banco ainda é válida?
    * **Check 3 (Crucial):** O servidor compara se o Refresh Token recebido bate com o `tokenHash` salvo no banco.
        * *Por que isso?* Se o hash não bater, significa que alguém pode estar tentando usar um token antigo ou roubado (Reuso de Token). Nesse caso, por segurança, você deve **invalidar a sessão imediatamente**.

4.  **Rotação de Token (Refresh Token Rotation) - *Recomendado***
    * Em vez de apenas entregar um novo Access Token, o servidor decide trocar **tudo**.
    * Gera um **novo** Access Token.
    * Gera um **novo** Refresh Token (com novo tempo de vida).
    * Gera o hash desse novo Refresh Token.

5.  **Atualização no Banco**
    * Atualiza a sessão encontrada com o novo `tokenHash`.
    * (Opcional) Atualiza a data de expiração da sessão, estendendo o login do usuário.

### Saída (Resposta)

6.  **Retorno ao Client**
    * Envia o **novo Access Token** (JSON).
    * Envia o **novo Refresh Token** (Cookie/JSON).

