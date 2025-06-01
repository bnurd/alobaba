import type * as productSchema from "~/modules/products/product.schema";
import * as productRepository from "~/modules/products/product.repository";

export const getAllProducts = async () => {
  const products = await productRepository.getAllProducts();

  return products;
};

export const searchProducts = async (q: string): Promise<productSchema.SearchResult> => {
  const products = await productRepository.getAllProductsByName(q);

  return products.map(product => ({
    id: product.id,
    name: product.name,
    imgaeUrl: product.imageUrl,
  }));
};
