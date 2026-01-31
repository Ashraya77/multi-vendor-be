// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  seller    Seller?
  orders    Order[]
  cartItems CartItem[]
  reviews   Review[]

  @@index([email])
}

model Seller {
  id          String   @id @default(cuid())
  userId      String   @unique
  businessName String?
  phone       String?
  isVerified  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  user  User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  shops Shop[]

  @@index([userId])
}

model Shop {
  id          String   @id @default(cuid())
  sellerId    String
  name        String
  description String?
  logo        String?
  address     String?
  phone       String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  seller   Seller    @relation(fields: [sellerId], references: [id], onDelete: Cascade)
  products Product[]

  @@index([sellerId])
}

model Product {
  id          String   @id @default(cuid())
  shopId      String
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  stock       Int      @default(0)
  images      String[]
  category    String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  shop       Shop         @relation(fields: [shopId], references: [id], onDelete: Cascade)
  cartItems  CartItem[]
  orderItems OrderItem[]
  reviews    Review[]

  @@index([shopId])
  @@index([category])
}

model CartItem {
  id        String   @id @default(cuid())
  userId    String
  productId String
  quantity  Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
  @@index([userId])
  @@index([productId])
}

model Order {
  id          String      @id @default(cuid())
  userId      String
  totalAmount Decimal     @db.Decimal(10, 2)
  status      OrderStatus @default(PENDING)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  // Relations
  user       User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  orderItems OrderItem[]

  @@index([userId])
  @@index([status])
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Decimal @db.Decimal(10, 2)

  // Relations
  order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Restrict)

  @@index([orderId])
  @@index([productId])
}

model Review {
  id        String   @id @default(cuid())
  userId    String
  productId String
  rating    Int
  comment   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
  @@index([productId])
}

enum Role {
  USER
  SELLER
  ADMIN
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}