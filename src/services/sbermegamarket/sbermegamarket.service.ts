import axios from 'axios';
import { ApiService } from '../api.service';
import { SberMegaMarketModel } from './sbermegamarket.model';

export class SberMegaMarketService {

  private static readonly getListUrl = `${process.env.REACT_APP_API_BASE_URL}/sbermegamarket/get`;
  private static readonly updateUrl = `${process.env.REACT_APP_API_BASE_URL}/sbermegamarket/update`;

  static async getList(): Promise<SberMegaMarketModel[]> {

    const response = await axios.get(this.getListUrl, {
      headers: {
        ...ApiService.AuthorizationHeaders(),
      },
    });
    return response.data as typeof response.data & SberMegaMarketModel[];
  }

  static async getById(id: string): Promise<SberMegaMarketModel> {
    const response = await axios.get(this.getListUrl + `/${id}`, {
      headers: {
        ...ApiService.AuthorizationHeaders(),
      },
    });
    return response.data as typeof response.data & SberMegaMarketModel;
  }

  static async update(item: SberMegaMarketModel): Promise<void> {
    const url = `${this.updateUrl}/${item._id}`;
    await axios.post(url, item, {
      headers: {
        ...ApiService.AuthorizationHeaders(),
      },
    });
  }
}
