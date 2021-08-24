import axios from 'axios';
import { ApiService } from '../api.service';
import { CategoryModel } from './category.model';
import { AuthService } from '../auth/auth.service';

export class CategoryService {
  private static readonly getCategoriesByParentUrl = `${process.env.REACT_APP_API_BASE_URL}/category/getbyparentcode`;
  private static readonly getCategoryByErpCode = `${process.env.REACT_APP_API_BASE_URL}/category/getbyerpcode`;

  static async getByParentCode(parentCode?: string): Promise<CategoryModel[]> {
    const response = await axios.post(this.getCategoriesByParentUrl, {
        parentCode: parentCode === '' ? undefined : parentCode,
      },
      {
        headers: {
          ...ApiService.AuthorizationHeaders(AuthService.getTokenFromStorage()),
        },
      },
    );
    return (response.data as typeof response.data & CategoryModel[])
      .sort((a: CategoryModel, b: CategoryModel) => a.name.localeCompare(b.name));
  }

  static async getUpperCategoryCode(erpCode: string): Promise<string> {
    const response = await axios.get(this.getCategoryByErpCode + `/${erpCode}`, {
      headers: {
        ...ApiService.AuthorizationHeaders(AuthService.getTokenFromStorage()),
      },
    });

    const data = response.data as typeof response.data & CategoryModel;
    return data.parentCode ?? '';
  }
}
