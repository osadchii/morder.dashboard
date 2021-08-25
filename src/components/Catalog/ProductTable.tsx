import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ProductModel, ProductType } from '../../services/product/product.model';
import { ProductService } from '../../services/product/product.service';
import { makeStyles } from '@material-ui/core/styles';
import { AuthService } from '../../services/auth/auth.service';
import { useHistory } from 'react-router-dom';
import { ProductTableProps } from './ProductTable.props';

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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer',
    },
  },
}))(TableRow);

function readableProductType(productType: ProductType): string {
  switch (productType) {
    case 'Piece':
      return 'Штучный';
    case 'Tobacco':
      return 'Табак';
    case 'Alcohol':
      return 'Алкоголь';
    case 'Weight':
      return 'Весовой';
  }
}

export const ProductTable = ({ categoryCode, searchString }: ProductTableProps): JSX.Element => {

  const history = useHistory();

  const classes = useStyles();

  const pageSize = 20;

  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(15);
  const [rows, setRows] = useState([] as ProductModel[]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    setLoading(true);
    try {
      const products = await ProductService.getProductPage(page, pageSize, categoryCode, searchString);
      const totalPages = Math.ceil(products.count / pageSize);
      setRows(products.items);
      setTotalPages(totalPages);
    } catch (error) {
      const { statusCode } = error.response.data;
      let message = '';
      if (statusCode === 401
        || statusCode === 403) {
        AuthService.logout();
        history.push('/login');
      } else {
        message = error.toString();
      }

      setErrorMessage(message);
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

  return (
    <>
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
              <StyledTableCell align='right'>Тип</StyledTableCell>
              <StyledTableCell align='right'>Цена</StyledTableCell>
              <StyledTableCell align='right'>Остаток</StyledTableCell>
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
                <StyledTableCell
                  align='right'>{readableProductType(row.productType)}</StyledTableCell>
                <StyledTableCell align='right'>{row.price}</StyledTableCell>
                <StyledTableCell align='right'>{row.stock}</StyledTableCell>
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
