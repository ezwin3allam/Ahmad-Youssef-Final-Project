import {
  AllProductsResponse,
  BrandsResponse,
  Brand,
  CategoriesResponse,
  Category,
  ProductData,
  ProductDetailsResponse,
} from "./home.interface";
import { fetchJsonOrThrow, getApiBaseUrl } from "@/lib/api";

export async function getAllProducts(): Promise<ProductData[]> {
  const data = await fetchJsonOrThrow<AllProductsResponse>(
    `${getApiBaseUrl()}/api/v1/products`,
    { cache: "force-cache" }
  );
  return data.data;
}

export async function getProducts(params?: {
  keyword?: string;
  categoryId?: string;
  brandId?: string;
  limit?: number;
}): Promise<ProductData[]> {
  const query = new URLSearchParams();
  if (params?.keyword) query.set("keyword", params.keyword);
  if (params?.categoryId) query.set("category[in]", params.categoryId);
  if (params?.brandId) query.set("brand", params.brandId);
  if (params?.limit) query.set("limit", String(params.limit));

  const queryString = query.toString();
  const data = await fetchJsonOrThrow<AllProductsResponse>(
    `${getApiBaseUrl()}/api/v1/products${queryString ? `?${queryString}` : ""}`,
    { cache: "no-store" }
  );
  return data.data;
}

export async function getSpecificProduct(id: string): Promise<ProductData> {
  const data = await fetchJsonOrThrow<ProductDetailsResponse>(
    `${getApiBaseUrl()}/api/v1/products/${id}`
  );
  return data.data;
}

export async function getProductsByIds(ids: string[]): Promise<ProductData[]> {
  const uniqueIds = Array.from(new Set(ids.filter(Boolean)));
  if (uniqueIds.length === 0) return [];
  const products = await Promise.all(uniqueIds.map((id) => getSpecificProduct(id)));
  return products;
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await fetchJsonOrThrow<CategoriesResponse>(
    `${getApiBaseUrl()}/api/v1/categories`,
    { cache: "no-store" }
  );
  return data.data;
}

export async function getAllBrands(): Promise<Brand[]> {
  const data = await fetchJsonOrThrow<BrandsResponse>(
    `${getApiBaseUrl()}/api/v1/brands`,
    { cache: "force-cache" }
  );
  return data.data;
}
