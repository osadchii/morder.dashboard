import axios from 'axios';
import { ProductGetPageModel } from './product.getpage.model';
import { ApiService } from '../api.service';
import { ProductPageModel } from './product.page.model';

export class ProductService {
  private static readonly getProductPageUrl = `${process.env.REACT_APP_API_BASE_URL}/product/getpage`;

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

}
