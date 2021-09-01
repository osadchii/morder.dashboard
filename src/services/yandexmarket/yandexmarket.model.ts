import { ProductType } from '../product/product.model';

export interface YandexMarketModel {

  _id: string;
  name: string;
  active: boolean;
  nullifyStocks: boolean;
  specialPriceName?: string;
  feedGenerationInterval: number;
  updatePricesByApi: boolean;
  updateMarketSkus: boolean;
  updateMarketSkusInterval: number;
  minimalPrice: number;
  defaultHeight?: number;
  defaultLength?: number;
  defaultWidth?: number;
  defaultWeight?: number;
  defaultVendorCode?: string;
  productTypes: ProductType[];
  lastFeedGeneration: Date;
  campaignId: string;
  authToken: string;
  clientId: string;

}
