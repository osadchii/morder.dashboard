import { YandexMarketModel } from './yandexmarket.model';
import axios from 'axios';
import { ApiService } from '../api.service';

export class YandexMarketService {
  private static readonly getListUrl = `${process.env.REACT_APP_API_BASE_URL}/yandexmarket/get`;
  private static readonly updateUrl = `${process.env.REACT_APP_API_BASE_URL}/yandexmarket/update`;

  static async getList(): Promise<YandexMarketModel[]> {

    const response = await axios.get(this.getListUrl, {
      headers: {
        ...ApiService.AuthorizationHeaders(),
      },
    });
    return response.data as typeof response.data & YandexMarketModel[];
  }

  static async getById(id: string): Promise<YandexMarketModel> {
    const response = await axios.get(this.getListUrl + `/${id}`, {
      headers: {
        ...ApiService.AuthorizationHeaders(),
      },
    });
    return response.data as typeof response.data & YandexMarketModel;
  }

  static async update(item: YandexMarketModel): Promise<void> {
    const url = `${this.updateUrl}/${item._id}`;
    await axios.post(url, item, {
      headers: {
        ...ApiService.AuthorizationHeaders(),
      },
    });
  }

}
