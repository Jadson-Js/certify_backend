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