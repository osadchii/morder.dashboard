import {ProductModel} from "./product.model";

export interface ProductPageModel {
    items: ProductModel[];
    count: number;
}
