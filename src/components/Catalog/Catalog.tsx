import {DashboardProps} from "../Dashboard/Dashboard.props";
import {Container, Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import {useState} from "react";
import {AllInbox} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const Catalog = ({token, logout}: DashboardProps): JSX.Element => {

    const classes = useStyles();
    const [errorMessage, _] = useState('');
    return (
        <Container component="main" maxWidth={"lg"}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AllInbox/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Каталог
                </Typography>
                <Typography color={"error"}>
                    {errorMessage}
                </Typography>

            </div>
        </Container>
    );
}
