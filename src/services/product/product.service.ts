import axios from 'axios';
import { ProductGetPageModel } from './product.getpage.model';
import { ApiService } from '../api.service';
import { ProductPageModel } from './product.page.model';

export class ProductService {
  private static readonly getProductPageUrl = `${process.env.REACT_APP_API_BASE_URL}/product/getpage`;
  private static readonly setProductMarketplaceSettingsUrl = `${process.env.REACT_APP_API_BASE_URL}/product/setMarketplaceSettings`;
  private static readonly getPriceNamesUrl = `${process.env.REACT_APP_API_BASE_URL}/product/getSpecialPriceNames`;

  static async getProductPage(page: number, perPage: number, categoryCode?: string, searchString?: string): Promise<ProductPageModel> {
    const body: ProductGetPageModel = {
      limit: perPage,
      offset: (page - 1) * perPage,
    };

    if (typeof categoryCode !== 'undefined') {
      body.categoryCode = categoryCode;
    }

    if (typeof searchString !== 'undefined') {
      body.text = searchString;
    }

    const response = await axios.post(this.getProductPageUrl, body, {
      headers: {
        ...ApiService.AuthorizationHeaders(),
      },
    });
    return response.data as typeof response.data & ProductPageModel;
  }

  static async setProductNullifyStockFlag(erpCode: string, marketplaceId: string, nullifyStock: boolean): Promise<void> {
    await axios.post(this.setProductMarketplaceSettingsUrl, {
        erpCode: erpCode,
        marketplaceId: marketplaceId,
        nullifyStock: nullifyStock,
      },
      {
        headers: {
          ...ApiService.AuthorizationHeaders(),
        },
      },
    );
  }

  static async setProductIgnoreRestrictionsFlag(erpCode: string, marketplaceId: string, ignoreRestrictions: boolean): Promise<void> {
    await axios.post(this.setProductMarketplaceSettingsUrl, {
        erpCode: erpCode,
        marketplaceId: marketplaceId,
        ignoreRestrictions: ignoreRestrictions,
      },
      {
        headers: {
          ...ApiService.AuthorizationHeaders(),
        },
      },
    );
  }

  static async getPriceNames(): Promise<string[]> {
    const response = await axios.get(this.getPriceNamesUrl, {
      headers: {
        ...ApiService.AuthorizationHeaders(),
      },
    });

    return response.data as typeof response.data & string[];
  }

}
