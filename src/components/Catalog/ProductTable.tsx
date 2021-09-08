import {
  CssBaseline,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ProductModel } from '../../services/product/product.model';
import { ProductService } from '../../services/product/product.service';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { ProductTableProps } from './ProductTable.props';
import { StyledTableCell } from '../Table/StyledTableCell';
import { StyledTableRow } from '../Table/StyledTableRow';
import { ApiService } from '../../services/api.service';
import { AxiosError } from 'axios';
import { CatalogBlockMenu } from './CatalogBlockMenu';

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
    minWidth: 500,
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  },
}));

export const ProductTable = ({ categoryCode, searchString }: ProductTableProps): JSX.Element => {

  const history = useHistory();
  const params = useParams();

  const { marketplaceId } = params as typeof params & { marketplaceId: string };

  const classes = useStyles();

  const pageSize = 20;

  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(15);
  const [rows, setRows] = useState([] as ProductModel[]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    setLoading(true);
    const products = await ProductService.getProductPage(page, pageSize, categoryCode, searchString)
      .catch((error: AxiosError) => {
        ApiService.catchFetchError(error, history.push, setErrorMessage);
      });

    if (products) {
      const totalPages = Math.ceil(products.count / pageSize);
      setRows(products.items);
      setTotalPages(totalPages);
    }
    setLoading(false);
  };

  const getProductsCallback = useCallback(async () => {
    await getProducts();
  }, [page, categoryCode, searchString]);

  useEffect(() => {
    getProductsCallback();
  }, [getProductsCallback]);

  const handleChange = async (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const isProductBlocked = (productModel: ProductModel, id: string): boolean => {
    let blocked = false;

    if (productModel.marketplaceSettings) {
      for (const setting of productModel.marketplaceSettings) {
        if (setting.marketplaceId == id && setting.nullifyStock) {
          blocked = true;
          break;
        }
      }
    }
    return blocked;
  };

  const isProductIgnoredRestrictions = (productModel: ProductModel, id: string): boolean => {
    let blocked = false;

    if (productModel.marketplaceSettings) {
      for (const setting of productModel.marketplaceSettings) {
        if (setting.marketplaceId == id && setting.ignoreRestrictions) {
          blocked = true;
          break;
        }
      }
    }
    return blocked;
  };

  return (
    <>
      <CssBaseline />
      <Typography color={'primary'}>
        Товары
      </Typography>
      <Typography color={'error'}>
        {errorMessage}
      </Typography>
      <TableContainer component={Paper} elevation={10}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Наименование</StyledTableCell>
              <StyledTableCell align='right'>Артикул</StyledTableCell>
              <StyledTableCell align='right'>Штрихкод</StyledTableCell>
              <StyledTableCell align='right'>Бренд</StyledTableCell>
              <StyledTableCell align='right'>Цена</StyledTableCell>
              <StyledTableCell align='right'>Остаток</StyledTableCell>
              {marketplaceId &&
              <StyledTableCell align='right'>Блокирование</StyledTableCell>}
              {marketplaceId &&
              <StyledTableCell align='right'>Исключение</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component='th' scope='row'>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.articul}</StyledTableCell>
                <StyledTableCell align='right'>{row.barcode}</StyledTableCell>
                <StyledTableCell align='right'>{row.brand}</StyledTableCell>
                <StyledTableCell align='right'>{row.price}</StyledTableCell>
                <StyledTableCell align='right'>{row.stock}</StyledTableCell>
                {marketplaceId && <StyledTableCell align='right'>
                  <CatalogBlockMenu value={isProductBlocked(row, marketplaceId)}
                                    marketplaceId={marketplaceId}
                                    erpCode={row.erpCode}
                                    menuType={'blockProduct'} />
                </StyledTableCell>}
                {marketplaceId && <StyledTableCell align='right'>
                  <CatalogBlockMenu value={isProductIgnoredRestrictions(row, marketplaceId)}
                                    marketplaceId={marketplaceId}
                                    erpCode={row.erpCode}
                                    menuType={'ignoreRestrictionsProduct'} />
                </StyledTableCell>}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(totalPages > 1) &&
      <div className={classes.root}>
        <Pagination count={totalPages} color='primary' page={page} onChange={handleChange}
                    disabled={loading} />
      </div>}
    </>
  );
};
