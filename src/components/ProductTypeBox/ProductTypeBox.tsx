import { Control, useWatch } from 'react-hook-form';
import { ProductType } from '../../services/product/product.model';
import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { ProductTypeBoxProps } from './ProductTypeBox.props';

export const ProductTypeBoxes = ({ controller, setValue }: ProductTypeBoxProps): JSX.Element => {

  const box = useWatch({
    control: controller as unknown as Control<{ productTypes: ProductType[] }>,
    name: 'productTypes',
    defaultValue: [],
  });

  const hasProductType = (productType: ProductType): boolean => {
    return !!box.find((elem: ProductType) => elem === productType);
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
