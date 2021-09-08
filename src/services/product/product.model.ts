export type ProductType = 'Piece' | 'Tobacco' | 'Alcohol' | 'Weight'

export interface ProductModel {
  _id: string;
  erpCode: string;
  name: string;
  productType: ProductType;
  barcode: string;
  articul: string;
  brand?: string;
  price: number;
  stock: number;
  marketplaceSettings?: {
    marketplaceId: string;
    nullifyStock: boolean;
    ignoreRestrictions: boolean;
  }[];
}
