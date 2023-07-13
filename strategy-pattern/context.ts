import { DiscountStrategy } from "./strategies";

export class Product {
  constructor(
    public name = '',
    public price = 0,
    public discount: DiscountStrategy
  ) {}

  // Allowing to switch discount strategy on the fly
  setStrategy(discountStrategy: DiscountStrategy): void {
    this.discount = discountStrategy;
  }

  getDiscountedPrice(): number {
    if (!this.discount) {
      return this.price;
    }

    return this.discount.calculate(this.price);
  }
}