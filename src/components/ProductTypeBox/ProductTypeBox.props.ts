import { Control } from 'react-hook-form';
import { ProductType } from '../../services/product/product.model';
import { YandexMarketModel } from '../../services/yandexmarket/yandexmarket.model';
import { SberMegaMarketModel } from '../../services/sbermegamarket/sbermegamarket.model';

export interface ProductTypeBoxProps {
  controller: Control<YandexMarketModel> | Control<SberMegaMarketModel>,
  setValue: (field: 'productTypes', value: ProductType[]) => void
}
