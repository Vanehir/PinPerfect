import { useCallback, useMemo, useState } from 'react';
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
  category: string;
  image: string;
}

export interface ProductDetail extends Product {
  description: string;
  reviewCount: number;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ** USE CALLBACK ** //
  // we do not use it the category passed as parameter in this case, but this could be useful in the future
  const getProducts = useCallback(async (baseUrl: string, category: string | null) => {
    try {
      const response = await fetch(baseUrl + (category ? `/category/${category}` : ''));
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

  const fetchCategories = useCallback(async (categoryUrl: string) => {
    try {
      const response = await fetch(categoryUrl);
      const data: string[] = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  // old filterProduct function
  /*
  
  const filterProduct = useCallback(async () => {
    if (selectedCategory) {
      const filteredProducts = initialProducts.filter(
        (product) => product.category === selectedCategory
      );
      setProducts(filteredProducts);
    } else {
      setProducts(initialProducts);
    }
  }, [initialProducts, selectedCategory]);

   */

  const filterProducts = useMemo(async () => {
    if (selectedCategory) {
      const filteredProducts = initialProducts.filter(
        (product) => product.category === selectedCategory
      );
      setProducts(filteredProducts);
    } else {
      setProducts(initialProducts);
    }
  }, [initialProducts, selectedCategory]);

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
    getProducts,
    fetchCategories,
    categories,
    selectedCategory,
    setSelectedCategory,
    filterProducts,
    loadFavorites,
    addFavorite,
    // TODO add sorting and test filterProduct
  };
};
