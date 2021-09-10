import { Control, Controller, useForm, useWatch } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Brightness1 } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { YandexMarketModel } from '../../services/yandexmarket/yandexmarket.model';
import { useHistory, useParams } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import { YandexMarketService } from '../../services/yandexmarket/yandexmarket.service';
import { AxiosError } from 'axios';
import { ApiService } from '../../services/api.service';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel } from '@material-ui/core';
import { ProductType } from '../../services/product/product.model';

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

const defaultValues: YandexMarketModel = {
  updatePricesByApi: false,
  updateMarketSkus: false,
  updateMarketSkusInterval: 0,
  authToken: '',
  campaignId: '',
  clientId: '',
  _id: '',
  active: false,
  feedGenerationInterval: 0,
  lastFeedGeneration: new Date(),
  minimalPrice: 0,
  name: '',
  nullifyStocks: false,
  productTypes: [],
};

interface ProductTypeBoxProps {
  control: Control<YandexMarketModel>,
  setValue: (field: 'productTypes', value: ProductType[]) => void
}

const ProductTypeBoxes = ({ control, setValue }: ProductTypeBoxProps) => {

  const box = useWatch({
    control,
    name: 'productTypes',
    defaultValue: [],
  });

  const hasProductType = (productType: ProductType): boolean => {
    return !!box.find((elem) => elem === productType);
  };

  const onChangeProductTypeFlag = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const name = target.name as ProductType;
    const value = target.checked;

    if (value) {
      setValue('productTypes', [...box, name]);
    } else {
      const newTypes: ProductType[] = [];
      for (const productType of box) {
        if (productType != name) {
          newTypes.push(productType);
        }
      }
      setValue('productTypes', newTypes);
    }
  };

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            name='Piece'
            color='primary'
            checked={hasProductType('Piece')}
            onChange={onChangeProductTypeFlag}
          />
        }
        label='Штучные товары'
      />

      <FormControlLabel
        control={
          <Checkbox
            name='Weight'
            color='primary'
            checked={hasProductType('Weight')}
            onChange={onChangeProductTypeFlag}
          />
        }
        label='Весовые товары'
      />

      <FormControlLabel
        control={
          <Checkbox
            name='Alcohol'
            color='primary'
            checked={hasProductType('Alcohol')}
            onChange={onChangeProductTypeFlag}
          />
        }
        label='Алкогольная продукция'
      />

      <FormControlLabel
        control={
          <Checkbox
            name='Tobacco'
            color='primary'
            checked={hasProductType('Tobacco')}
            onChange={onChangeProductTypeFlag}
          />
        }
        label='Табачная продукция'
      />
    </>
  );
};

export const YandexMarketElement = (): JSX.Element => {

  const history = useHistory();
  const params = useParams();

  const classes = useStyles();

  const { id } = params as typeof params & { id: string };

  const { control, handleSubmit, reset, setValue } = useForm<YandexMarketModel>({ defaultValues });

  const onSubmit = handleSubmit(async (data: YandexMarketModel) => {
    await YandexMarketService.update(data)
      .catch((error: AxiosError) => {
        ApiService.catchFetchError(error, history.push);
      });
  });

  const getItemCallBack = useCallback(async () => {
    const item = await YandexMarketService.getById(id)
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
          Yandex.Market
        </Typography>
        <form className={classes.form} noValidate
              onSubmit={onSubmit}
              method={'post'}>
          <Accordion expanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
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

              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography className={classes.heading}>Виды товаров</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.root}>
                <ProductTypeBoxes control={control} setValue={setValue} />
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
                  name={'authToken'}
                  render={
                    ({ field }) =>
                      <TextField
                        variant={'outlined'}
                        margin='normal'
                        required
                        fullWidth
                        id='authToken'
                        label='oAuth Token'
                        {...field}
                      />
                  }
                  rules={{ required: true }}
                />
                <Controller
                  control={control}
                  name={'clientId'}
                  render={
                    ({ field }) =>
                      <TextField
                        variant={'outlined'}
                        margin='normal'
                        required
                        fullWidth
                        id='clientId'
                        label='ID приложения'
                        {...field}
                      />
                  }
                  rules={{ required: true }}
                />
                <Controller
                  control={control}
                  name={'campaignId'}
                  render={
                    ({ field }) =>
                      <TextField
                        variant={'outlined'}
                        margin='normal'
                        required
                        fullWidth
                        id='campaignId'
                        label='Идентификатор компании'
                        {...field}
                      />
                  }
                  rules={{ required: true }}
                />
                <FormControlLabel
                  label='Обновлять идентификаторы Яндекс'
                  control={
                    <Controller
                      control={control}
                      name={'updateMarketSkus'}
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
                  name={'updateMarketSkusInterval'}
                  render={
                    ({ field }) =>
                      <TextField
                        variant={'outlined'}
                        margin='normal'
                        required
                        type={'number'}
                        fullWidth
                        label='Интервал обновления идентификаторов Яндекс'
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
                <FormControlLabel
                  label='Обновлять цены по API'
                  control={
                    <Controller
                      control={control}
                      name={'updatePricesByApi'}
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
