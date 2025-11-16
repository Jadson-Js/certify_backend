/src
├── domain # 1. Camada mais interna (Entidades)
│ ├── entities # (Ex: User, Product)
│ │ └── user.entity.ts
│ └── repositories # (Contratos/Interfaces)
│ └── user.repository.interface.ts
│
├── application # 2. Camada de Casos de Uso
│ ├── use-cases # (Orquestra as regras de negócio)
│ │ ├── create-user
│ │ │ ├── create-user.use-case.ts
│ │ │ └── create-user.dto.ts
│ │ └── find-user-by-id
│ │ ├── find-user-by-id.use-case.ts
│ │ └── find-user-by-id.dto.ts
│ └── services # (Interfaces de serviços externos, ex: IEmailService)
│
├── infra # 3. Camada mais externa (Frameworks e Drivers)
│ ├── http # (Mecanismo de entrega: API REST, gRPC, etc.)
│ │ ├── controllers # (Recebe requisições HTTP, ex: Express)
│ │ │ └── user.controller.ts
│ │ ├── routes
│ │ │ └── user.routes.ts
│ │ └── server.ts # (Inicia o servidor Node.js/Express)
│ │
│ ├── database # (Implementação do Banco de Dados)
│ │ ├── postgresql # <-- O POSTGRES VIVE AQUI
│ │ │ ├── repositories
│ │ │ │ └── user.repository.postgres.ts # (Implementação REAL da interface)
│ │ │ ├── models # (Se usar ORM como TypeORM ou Prisma)
│ │ │ │ └── user.model.ts
│ │ │ └── connection.ts # (Configuração da conexão com o Postgres)
│ │ └── migrations
│
└── main.ts # Ponto de entrada: Inicializa e injeta dependências
