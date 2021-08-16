import {AuthModel} from "./auth.model";
import axios from "axios";
import {API_BASE_URL} from "../api.constants";

export class AuthService {
    private static readonly loginUrl = `${API_BASE_URL}/auth/login`;

    static async login(authModel: AuthModel): Promise<string> {

        const response = await axios.post(this.loginUrl, authModel);
        const data = response.data as typeof response.data & { access_token: string };

        return data.access_token;

    }

    static saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

}
