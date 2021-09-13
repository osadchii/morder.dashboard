import { ProductType } from '../product/product.model';

export interface SberMegaMarketModel {

  _id: string;
  name: string;
  active: boolean;
  nullifyStocks: boolean;
  specialPriceName?: string;
  minimalPrice: number;
  feedGenerationInterval: number;
  lastFeedGeneration?: Date;
  outletId: number;
  orderBefore: number;
  shippingDays: number;
  productTypes: ProductType[];
}
