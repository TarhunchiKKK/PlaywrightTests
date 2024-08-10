export interface IProduct {
    title: string;
    price: number;
}

export type ProductsSortCompareer = (_: IProduct, __: IProduct) => number;
