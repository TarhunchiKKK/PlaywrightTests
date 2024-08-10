import { IProduct } from "../../types";

export const PRODUCTS_SORT_COMPAREERS = {
    NAME_ASC: (a: IProduct, b: IProduct) => b.title.localeCompare(a.title),
    NAME_DESC: (a: IProduct, b: IProduct) => a.title.localeCompare(b.title),
    PRICE_ASC: (a: IProduct, b: IProduct) => (a.price <= b.price ? 1 : -1),
    PRICE_DESC: (a: IProduct, b: IProduct) => (a.price < b.price ? -1 : 1),
};
