export interface CatalogBlockMenuProps {
  marketplaceId: string,
  erpCode: string;
  value: boolean;
  menuType: 'blockProduct' | 'ignoreRestrictionsProduct' | 'blockCategory'
}
