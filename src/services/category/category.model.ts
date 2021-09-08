export interface CategoryModel {
  _id: string;
  name: string;
  erpCode: string;
  parentCode?: string;
  marketplaceSettings?: {
    marketplaceId: string;
    blocked: boolean;
  }[];
}
