import axios from "axios";
import {CompanyModel} from "./company.model";
import {ApiService} from "../api.service";

export class CompanyService {
    private static readonly getCompanyUrl = `${process.env.REACT_APP_API_BASE_URL}/company/`
    private static readonly postCompanyUrl = `${process.env.REACT_APP_API_BASE_URL}/company/`

    static async getCompanyData(token: string): Promise<CompanyModel> {
        const response = await axios.get(this.getCompanyUrl, {
            headers: {
                ...ApiService.AuthorizationHeaders(token)
            }
        });
        return response.data as typeof response.data & CompanyModel;
    }

    static async saveCompanyData(token: string, companyModel: CompanyModel): Promise<void> {
        await axios.post(this.postCompanyUrl, companyModel, {
            headers: {
                ...ApiService.AuthorizationHeaders(token)
            }
        })
    }
}
