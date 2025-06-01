import * as productRepository from "~/modules/products/product.repository";

export const getAllProducts = async () => {
  const products = await productRepository.getAllProducts();

  return products;
};
