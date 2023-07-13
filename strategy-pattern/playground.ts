import { Product } from "./context";
import { PersonalDiscountStrategy, SeasonalDiscountStrategy } from "./strategies";

// We can determine any discount strategy here
const product = new Product('MacBook', 2000, new PersonalDiscountStrategy());
console.log(product.getDiscountedPrice());

product.setStrategy(new SeasonalDiscountStrategy());