export class CreateProductDto {
  constructor(
    public shopId: string,
    public name: string,
    public price: number,
    public description?: string,
    public stock?: number,
    public images?: string[],
    public category?: string,
    public isActive?: boolean,
  ) {}
}
