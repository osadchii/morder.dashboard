import { YandexMarketModel } from './yandexmarket.model';
import axios from 'axios';
import { ApiService } from '../api.service';

export class YandexMarketService {
  private static readonly getListUrl = `${process.env.REACT_APP_API_BASE_URL}/yandexmarket/get`;

  static async getList(): Promise<YandexMarketModel[]> {

    const response = await axios.get(this.getListUrl, {
      headers: {
        ...ApiService.AuthorizationHeaders(),
      },
    });
    return response.data as typeof response.data & YandexMarketModel[];
  }

}
