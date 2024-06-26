export interface ProductSize {
  height: number;
  width: number;
}
export interface Comment {
  date: string;
  description: string;
  id: number;
  productId: number;
}
export interface Product {
  comments: Array<Comment>;
  count: number;
  id: string;
  imageUrl: string;
  name: string;
  size: ProductSize;
  weight: string;
}

export interface ProductToAdd {
  imageUrl: string;
  name: string;
  count: number | string;
  size: {
    width: number | string;
    height: number | string;
  };
  weight: string;
  comments: Array<Comment>;
}
