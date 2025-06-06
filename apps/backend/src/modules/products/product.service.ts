import type * as productSchema from "~/modules/products/product.schema";
import * as productRepository from "~/modules/products/product.repository";

export const getAllProducts = async (params: productSchema.GetAllProduct) => {
  const products = await productRepository.getAllProducts(params);

  return products;
};

export const getProductBySlug = async (slug: string) => {
  const product = await productRepository.getProductBySlug(slug);

  return product;
};

export const searchProducts = async (q: string): Promise<productSchema.SearchResult> => {
  const products = await productRepository.getAllProductsByName(q);

  return products.map(product => ({
    id: product.id,
    name: product.name,
    imgaeUrl: product.imageUrl,
    slug: product.slug,
  }));
};
