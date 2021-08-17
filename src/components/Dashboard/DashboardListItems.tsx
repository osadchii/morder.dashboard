import {Divider, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {DashboardListItemsProps} from "./DashboardListItems.props";
import {DashboardScreens} from "./Dashboard.screens";

export const DashboardListItems = ({logout, setScreen}: DashboardListItemsProps): JSX.Element => {
    const showDashboard = (): void => {
        setScreen(DashboardScreens.Dashboard)
    };
    const showCompany = (): void => {
        setScreen(DashboardScreens.Company)
    };
    return (
        <div>
            <ListItem button
                      onClick={showDashboard}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Панель управления"/>
            </ListItem>
            <ListItem button
                      onClick={showCompany}>
                <ListItemIcon>
                    <BusinessIcon/>
                </ListItemIcon>
                <ListItemText primary="Компания"/>
            </ListItem>
            <Divider/>
            <ListItem button
                      onClick={logout}>
                <ListItemIcon>
                    <ExitToAppIcon/>
                </ListItemIcon>
                <ListItemText primary="Выйти"/>
            </ListItem>
        </div>
    );
}
