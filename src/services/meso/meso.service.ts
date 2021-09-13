import axios from 'axios';
import { ApiService } from '../api.service';
import { MesoModel } from './meso.model';

export class MesoService {
  private static readonly getListUrl = `${process.env.REACT_APP_API_BASE_URL}/meso/get`;

  static async getList(): Promise<MesoModel[]> {

    const response = await axios.get(this.getListUrl, {
      headers: {
        ...ApiService.AuthorizationHeaders(),
      },
    });
    return response.data as typeof response.data & MesoModel[];
  }

}
