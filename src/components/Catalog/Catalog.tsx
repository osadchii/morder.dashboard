import {DashboardProps} from "../Dashboard/Dashboard.props";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    withStyles
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {AllInbox} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';
import {ProductModel, ProductType} from "../../services/product/product.model";
import {ProductService} from "../../services/product/product.service";

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
    table: {
        minWidth: 700,
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(2),
        },
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 15,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }
    },
}))(TableRow);

function readableProductType(productType: ProductType): string{
    switch (productType){
        case "Piece":
            return "Штучный товар";
        case "Tobacco":
            return "Табачная продукция";
        case "Alcohol":
            return "Алкогольная продукция";
        case "Weight":
            return "Весовой товар";
    }
}

export const Catalog = ({token, logout}: DashboardProps): JSX.Element => {

    const classes = useStyles();

    const [errorMessage, setErrorMessage] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, _] = useState(15);
    const [rows, setRows] = useState([] as ProductModel[]);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        setLoading(true);
        try {
            const products = await ProductService.getProductPage(token, page, 48);
            setRows(products);
        } catch (error) {
            const {statusCode} = error.response.data;
            let message = '';
            if (statusCode === 401
                || statusCode === 403) {
                logout();
            } else {
                message = error.toString();
            }

            setErrorMessage(message);
        }
        setLoading(false);
    }

    const getProductsCallback = useCallback(async () => {
        await getProducts();
    }, [token, page]);

    useEffect(() => {
        getProductsCallback();
    }, [getProductsCallback]);

    const handleChange = async (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Container component="div" maxWidth={"xl"}>
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
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Наименование</StyledTableCell>
                                <StyledTableCell align="right">Артикул</StyledTableCell>
                                <StyledTableCell align="right">Штрихкод</StyledTableCell>
                                <StyledTableCell align="right">Бренд</StyledTableCell>
                                <StyledTableCell align="right">Тип товара</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.articul}</StyledTableCell>
                                    <StyledTableCell align="right">{row.barcode}</StyledTableCell>
                                    <StyledTableCell align="right">{row.brand}</StyledTableCell>
                                    <StyledTableCell align="right">{readableProductType(row.productType)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className={classes.root}>
                    <Pagination count={totalPages} color="primary" page={page} onChange={handleChange} disabled={loading} />
                </div>
            </div>
        </Container>
    );
}
