import { ProductType } from '../product/product.model';

export interface OzonModel {

  _id: string;
  name: string;
  active: boolean;
  nullifyStocks: boolean;
  specialPriceName?: string;
  minimalPrice: number;
  warehouseName: string;
  updateStocksByAPI: boolean;
  updatePricesByAPI: boolean;
  feedGenerationInterval: number;
  lastFeedGeneration?: Date;
  productTypes: ProductType[];

}
