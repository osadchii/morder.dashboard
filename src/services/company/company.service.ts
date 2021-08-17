import {API_BASE_URL} from "../api.constants";
import axios from "axios";
import {CompanyModel} from "./company.model";

export class CompanyService {
    private static readonly getCompanyUrl = `${API_BASE_URL}/company/`
    private static readonly postCompanyUrl = `${API_BASE_URL}/company/`

    static async getCompanyData(token: string): Promise<CompanyModel> {
        const response = await axios.get(this.getCompanyUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data as typeof response.data & CompanyModel;
    }

    static async saveCompanyData(token: string, companyModel: CompanyModel): Promise<void> {
        await axios.post(this.postCompanyUrl, companyModel, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
}
