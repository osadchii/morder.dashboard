import axios from 'axios';
import { ApiService } from '../api.service';
import { CategoryModel } from './category.model';

export class CategoryService {
  private static readonly getcategoriesByParentUrl = `${process.env.REACT_APP_API_BASE_URL}/category/getbyparentcode`;

  static async getByParentCode(token: string, parentCode?: string): Promise<CategoryModel[]> {
    const response = await axios.post(this.getcategoriesByParentUrl, {
        parentCode: parentCode,
      },
      {
        headers: {
          ...ApiService.AuthorizationHeaders(token),
        },
      },
    );
    return (response.data as typeof response.data & CategoryModel[]);
  }
}
