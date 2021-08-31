import { Controller, useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Brightness1 } from '@material-ui/icons';
import { YandexMarketModel } from '../../services/yandexmarket/yandexmarket.model';
import { useHistory, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { YandexMarketService } from '../../services/yandexmarket/yandexmarket.service';
import { AxiosError } from 'axios';
import { ApiService } from '../../services/api.service';
import { Checkbox, FormControlLabel } from '@material-ui/core';

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
}));

const defaultValues: YandexMarketModel = {
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

export const YandexMarketElement = (): JSX.Element => {

  const history = useHistory();

  const classes = useStyles();
  const params = useParams();

  const { id } = params as typeof params & { id: string };

  const { control, handleSubmit, reset } = useForm<YandexMarketModel>({ defaultValues });
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
