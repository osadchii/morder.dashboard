import axios from 'axios';
import { ProductGetPageModel } from './product.getpage.model';
import { ApiService } from '../api.service';
import { ProductPageModel } from './product.page.model';
import { AuthService } from '../auth/auth.service';

export class ProductService {
    private static readonly getProductPageUrl = `${process.env.REACT_APP_API_BASE_URL}/product/getpage`;

    static async getProductPage(page: number, perPage: number): Promise<ProductPageModel> {
        const body: ProductGetPageModel = {
            limit: perPage,
            offset: (page - 1) * perPage,
        };

        const response = await axios.post(this.getProductPageUrl, body, {
            headers: {
                ...ApiService.AuthorizationHeaders(AuthService.getTokenFromStorage()),
            },
        });
        console.log(response);
        return response.data as typeof response.data & ProductPageModel;
    }

}
