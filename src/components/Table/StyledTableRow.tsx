import { TableRow, withStyles } from '@material-ui/core';

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer',
    },
  },
}))(TableRow);
