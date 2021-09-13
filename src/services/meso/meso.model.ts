import { ProductType } from '../product/product.model';

export interface MesoModel {

  _id: string;
  name: string;
  active: boolean;
  nullifyStocks: boolean;
  specialPriceName?: string;
  minimalPrice: number;
  login: string;
  password: string;
  productTypes: ProductType[];
  catalogSendInterval: number;
  lastCatalogSend?: Date;
}
