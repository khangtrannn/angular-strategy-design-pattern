export interface DiscountStrategy {
  calculate(price: number): number;
}

export class NoDiscountStratergy implements DiscountStrategy {
  calculate(price: number): number {
    return price;
  }
}

export class SeasonalDiscountStrategy implements DiscountStrategy {
  calculate(price: number): number {
    return price - (price * 0.1);
  }
}

export class PersonalDiscountStrategy implements DiscountStrategy {
  calculate(price: number): number {
    // some additional complex logic...
    return price - (price * 0.2);
  }
}