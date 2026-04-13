export interface AllProductsResponse {
  results: number;
  metadata: Metadata;
  data: ProductData[];
}

export interface ProductDetailsResponse {
  data: ProductData;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface ProductData {
  sold?: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: string[];
  __v: number;
  reviews?: Review[];
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Review {
  _id: string;
  rating: number;
  review: string;
  product: string;
  user: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoriesResponse {
  results: number;
  data: Category[];
}

export interface BrandsResponse {
  results: number;
  data: Brand[];
}
