import {DashboardScreens} from "./Dashboard.screens";

export interface DashboardListItemsProps {
    logout: () => void;
    token: string;
    setScreen: (screen: DashboardScreens) => void;
}
