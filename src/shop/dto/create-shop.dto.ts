// shop.dto.ts
export class CreateShopDto {
  sellerId: string;
  businessName: string;
  description?: string;
  logo?: string;
  address?: string;
  phone?: string;
}

export class UpdateShopDto {
  name?: string;
  description?: string;
  logo?: string;
  address?: string;
  phone?: string;
}

export class ShopResponseDto {
  id: string;
  sellerId: string;
  name: string;
  description: string | null;
  logo: string | null;
  address: string | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}