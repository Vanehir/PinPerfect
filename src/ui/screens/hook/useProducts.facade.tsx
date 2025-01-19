import {useCallback, useState} from "react";

interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: Rating;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);

  const refreshProducts = useCallback(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts([...data]);
      setInitialProducts([...data]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

}
