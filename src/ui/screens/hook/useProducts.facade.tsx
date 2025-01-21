import { useCallback, useState } from 'react';

interface apiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  image: string;
}

export interface ProductDetail extends Product {
  category: string;
  description: string;
  reviewCount: number;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);

  // ** USE CALLBACK ** //
  const refreshProducts = useCallback(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      const remappedData = data.map((product: apiProduct) => ({
        ...product,
        rating: product.rating.rate,
      }));
      setProducts([...remappedData]);
      setInitialProducts([...remappedData]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);
};
