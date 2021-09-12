import { Control } from 'react-hook-form';
import { YandexMarketModel } from '../../services/yandexmarket/yandexmarket.model';
import { ProductType } from '../../services/product/product.model';

export interface ProductTypeBoxProps {
  control: Control<YandexMarketModel>,
  setValue: (field: 'productTypes', value: ProductType[]) => void
}
