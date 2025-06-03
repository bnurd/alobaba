export interface ProductDetail {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  stockQuantity: number;
  minumumOrderQuantity: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  ProductImages: ProductImage[];
  ProductCategory: ProductCategory[];
}

export interface ProductCategory {
  id: string;
  productId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
