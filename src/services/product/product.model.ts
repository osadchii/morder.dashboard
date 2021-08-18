export type ProductType = 'Piece' | 'Tobacco' | 'Alcohol' | 'Weight'

export interface ProductModel {
    _id: string;
    name: string;
    productType: ProductType;
    barcode: string;
    articul: string;
    brand?: string;
    price: number;
    stock: number;
}
