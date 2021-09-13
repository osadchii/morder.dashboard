import axios from 'axios';
import { ApiService } from '../api.service';
import { OzonModel } from './ozon.model';

export class OzonService {

  private static readonly getListUrl = `${process.env.REACT_APP_API_BASE_URL}/ozon/get`;


  static async getList(): Promise<OzonModel[]> {

    const response = await axios.get(this.getListUrl, {
      headers: {
        ...ApiService.AuthorizationHeaders(),
      },
    });
    return response.data as typeof response.data & OzonModel[];
  }
}
