import { useCallback, useState } from 'react';
import { storage } from '../../../core/storage/storage';
import { FAVORITE_PRODUCTS } from '../../../core/storage/types';

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
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

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

  const loadFavorites = useCallback(async () => {
    try {
      const savedFavorites = await storage.getItem(FAVORITE_PRODUCTS);
      const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      setFavoriteIds(parsedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  const addFavorite = useCallback(
    async (product: Product) => {
      const updatedFavorites = favoriteIds.includes(product.id)
        ? favoriteIds.filter((id) => id !== product.id)
        : [...favoriteIds, product.id];
      setFavoriteIds(updatedFavorites);
      await storage.setItem(FAVORITE_PRODUCTS, JSON.stringify(updatedFavorites));
    },
    [favoriteIds]
  );

  return {
    products,
    favoriteIds,
    refreshProducts,
    loadFavorites,
    addFavorite,
    // TODO add filter and sorting
  };
};
