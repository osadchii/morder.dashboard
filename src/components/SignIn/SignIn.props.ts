import {AuthModel} from "../../services/auth/auth.model";

export interface SignInProps {
    login: (authModel: AuthModel) => Promise<void>;
}
