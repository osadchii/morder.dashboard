import { SpecialPriceSelectProps } from './SpecialPriceSelect.props';
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { ProductService } from '../../services/product/product.service';
import { ApiService } from '../../services/api.service';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0),
      marginTop: theme.spacing(1),
      minWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export const SpecialPriceSelect = ({ value, setValue }: SpecialPriceSelectProps): JSX.Element => {

  const classes = useStyles();
  const history = useHistory();
  const [priceNames, setPriceNames] = useState<string[]>([]);
  const [state, setState] = React.useState<string | undefined>('');

  const getPriceNames = useCallback(async () => {
    const priceNamesResponse = await ProductService.getPriceNames()
      .catch((error: AxiosError) => {
        ApiService.catchFetchError(error, history.push);
      });
    if (priceNamesResponse) {
      setPriceNames(priceNamesResponse);
    }
  }, [state, value]);

  useEffect(() => {
    getPriceNames();
    setState(value);
  }, [getPriceNames]);

  const handleChange = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
    const selectedValue = event.target.value === 'empty' ? '' : event.target.value;
    if (typeof selectedValue === 'string') {
      setState(selectedValue);
      setValue('specialPriceName', selectedValue);
    }
  };
  return (<>
    <FormControl variant='outlined' className={classes.formControl}>
      <InputLabel id='select-outlined-label'>Вид цены</InputLabel>
      <Select
        labelId='select-outlined-label'
        id='select-outlined'
        value={state}
        onChange={handleChange}
        label='Вид цены'
      >
        <MenuItem value=''>
          <em>Не указана</em>
        </MenuItem>
        {priceNames.map((item) => (
          <MenuItem value={item} key={item}>{item}</MenuItem>),
        )}
      </Select>
    </FormControl>
  </>);
};
