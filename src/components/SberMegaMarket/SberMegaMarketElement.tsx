import { Controller, useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Brightness1 } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { AxiosError } from 'axios';
import { ApiService } from '../../services/api.service';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel } from '@material-ui/core';
import { SpecialPriceSelect } from '../SpecialPriceSelect/SpecialPriceSelect';
import { ProductTypeBoxes } from '../ProductTypeBox/ProductTypeBox';
import { SberMegaMarketModel } from '../../services/sbermegamarket/sbermegamarket.model';
import { SberMegaMarketService } from '../../services/sbermegamarket/sbermegamarket.service';

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
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const defaultValues: SberMegaMarketModel = {
  _id: '',
  active: false,
  feedGenerationInterval: 0,
  minimalPrice: 0,
  name: '',
  nullifyStocks: false,
  orderBefore: 0,
  outletId: 0,
  productTypes: [],
  shippingDays: 0,
};

export const SberMegaMarketElement = (): JSX.Element => {

  const history = useHistory();
  const params = useParams();

  const classes = useStyles();

  const { id } = params as typeof params & { id: string };

  const { control, handleSubmit, reset, setValue } = useForm<SberMegaMarketModel>({ defaultValues });

  const onSubmit = handleSubmit(async (data: SberMegaMarketModel) => {
    await SberMegaMarketService.update(data)
      .catch((error: AxiosError) => {
        ApiService.catchFetchError(error, history.push);
      });
  });

  const getItemCallBack = useCallback(async () => {
    const item = await SberMegaMarketService.getById(id)
      .catch((error: AxiosError) => {
        ApiService.catchFetchError(error, history.push);
      });

    if (item) {
      reset(item);
    }
  }, [reset, id]);

  useEffect(() => {
    getItemCallBack();
  }, [id]);

  return (
    <Container component='div' maxWidth={'md'}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Brightness1 />
        </Avatar>
        <Typography component='h1' variant='h5'>
          SberMegaMarket
        </Typography>
        <form className={classes.form} noValidate
              onSubmit={onSubmit}
              method={'post'}>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'>
              <Typography className={classes.heading}>Основные настройки</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.root}>
                <FormControlLabel
                  label='Активно'
                  control={
                    <Controller
                      control={control}
                      name={'active'}
                      render={
                        ({ field }) =>
                          <Checkbox
                            color='primary'
                            checked={field.value}
                            {...field}
                          />
                      }
                    />
                  }
                />
                <FormControlLabel
                  label='Обнулять остатки'
                  control={
                    <Controller
                      control={control}
                      name={'nullifyStocks'}
                      render={
                        ({ field }) =>
                          <Checkbox
                            color='primary'
                            checked={field.value}
                            {...field}
                          />
                      }
                    />
                  }
                />
                <Controller
                  control={control}
                  name={'name'}
                  render={
                    ({ field }) =>
                      <TextField
                        variant={'outlined'}
                        margin='normal'
                        required
                        fullWidth
                        id='name'
                        label='Название'
                        {...field}
                      />
                  }
                  rules={{ required: true }}
                />
                <Controller
                  control={control}
                  name={'minimalPrice'}
                  render={
                    ({ field }) =>
                      <TextField
                        variant={'outlined'}
                        margin='normal'
                        required
                        type={'number'}
                        fullWidth
                        label='Минимальная цена'
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            Number.isNaN(parseInt(e.target.value))
                              ? 0
                              : parseInt(e.target.value),
                          )
                        }
                      />
                  }
                  rules={{ min: 0, max: 999999 }}
                />
                <Controller
                  control={control}
                  name={'specialPriceName'}
                  render={
                    ({ field }) =>
                      <SpecialPriceSelect {...field} value={field.value} setValue={setValue} />
                  }
                  rules={{ min: 0, max: 999999 }}
                />
                <Controller
                  control={control}
                  name={'shippingDays'}
                  render={
                    ({ field }) =>
                      <TextField
                        variant={'outlined'}
                        margin='normal'
                        required
                        type={'number'}
                        fullWidth
                        label='Доставка за, дней'
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            Number.isNaN(parseInt(e.target.value))
                              ? 0
                              : parseInt(e.target.value),
                          )
                        }
                      />
                  }
                  rules={{ min: 0, max: 999999 }}
                />
                <Controller
                  control={control}
                  name={'orderBefore'}
                  render={
                    ({ field }) =>
                      <TextField
                        variant={'outlined'}
                        margin='normal'
                        required
                        type={'number'}
                        fullWidth
                        label='При заказе до, часов'
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            Number.isNaN(parseInt(e.target.value))
                              ? 0
                              : parseInt(e.target.value),
                          )
                        }
                      />
                  }
                  rules={{ min: 0, max: 999999 }}
                />
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'>
              <Typography className={classes.heading}>Виды товаров</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.root}>
                <ProductTypeBoxes controller={control} setValue={setValue} />
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography className={classes.heading}>Настройки API</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.root}>
                <Controller
                  control={control}
                  name={'feedGenerationInterval'}
                  render={
                    ({ field }) =>
                      <TextField
                        variant={'outlined'}
                        margin='normal'
                        required
                        type={'number'}
                        fullWidth
                        label='Интервал обновления фида'
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            Number.isNaN(parseInt(e.target.value))
                              ? 0
                              : parseInt(e.target.value),
                          )
                        }
                      />
                  }
                  rules={{ min: 0, max: 999999 }}
                />
                <Controller
                  control={control}
                  name={'outletId'}
                  render={
                    ({ field }) =>
                      <TextField
                        variant={'outlined'}
                        margin='normal'
                        required
                        type={'number'}
                        fullWidth
                        label='Идентификатор склада'
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            Number.isNaN(parseInt(e.target.value))
                              ? 0
                              : parseInt(e.target.value),
                          )
                        }
                      />
                  }
                  rules={{ min: 0, max: 999999 }}
                />
              </div>
            </AccordionDetails>
          </Accordion>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Сохранить
          </Button>
        </form>
      </div>
    </Container>
  );

};
