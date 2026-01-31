multer-vendor-be/
│
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── vendor.entity.ts
│   │   │   ├── product.entity.ts
│   │   │   └── user.entity.ts
│   │   │
│   │   └── repositories/
│   │       ├── vendor.repository.ts
│   │       └── product.repository.ts
│   │
│   ├── application/
│   │   ├── vendor/
│   │   │   └── vendor.service.ts
│   │   ├── product/
│   │   │   └── product.service.ts
│   │   └── file/
│   │       └── file.service.ts
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── entities/
│   │   │   │   ├── vendor.entity.ts
│   │   │   │   └── product.entity.ts
│   │   │   │
│   │   │   ├── repositories/
│   │   │   │   ├── vendor.repository.ts
│   │   │   │   └── product.repository.ts
│   │   │   │
│   │   │   └── migrations/
│   │   │
│   │   └── storage/
│   │       ├── multer.config.ts
│   │       └── storage.service.ts
│   │
│   ├── presentation/
│   │   ├── vendor/
│   │   │   ├── vendor.controller.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-vendor.dto.ts
│   │   │   │   └── update-vendor.dto.ts
│   │   │   └── vendor.module.ts
│   │   │
│   │   └── product/
│   │       ├── product.controller.ts
│   │       ├── dto/
│   │       │   ├── create-product.dto.ts
│   │       │   └── update-product.dto.ts
│   │       └── product.module.ts
│   │
│   ├── common/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── filters/
│   │   ├── decorators/
│   │   └── pipes/
│   │
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── storage.config.ts
│   │   └── app.config.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── test/
│   ├── vendor.e2e-spec.ts
│   └── product.e2e-spec.ts
│
├── uploads/
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── tsconfig.json

Layer Responsibilities
domain/ - Business entities and repository interfaces
application/ - Business logic services
infrastructure/ - Database, file storage, external services
presentation/ - Controllers, DTOs, modules
common/ - Shared guards, pipes, filters, interceptors
config/ - Configuration files