import { useParams } from 'react-router-dom';


export const YandexMarketElement = (): JSX.Element => {

  const params = useParams();
  const { id } = params as typeof params & { id: string };
  return (
    <>{id}</>
  );

};
