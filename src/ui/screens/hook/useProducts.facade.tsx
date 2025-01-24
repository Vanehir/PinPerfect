import React, { useCallback, useMemo, useState } from 'react';
import { storage } from '../../../core/storage/storage';
import { FAVORITE_PRODUCTS } from '../../../core/storage/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProductCard from '../../atoms/product/product.atom';
import { NavigatorStackParamList, Screen } from '../../navigation/types';
import { ListRenderItem } from 'react-native';
import Chip from '../../atoms/chip/chip.atom';
import { Ionicons } from '@expo/vector-icons';

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

export enum SortType {
  DEFAULT = 'DEFAULT',
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  //const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // old single category state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [navigationProp, setNavigationProp] =
    useState<NativeStackNavigationProp<NavigatorStackParamList, Screen.Detail>>();
  const [singleProduct, setSingleProduct] = useState<ProductDetail | null>(null);
  const [sorting, setSorting] = useState<SortType>(SortType.DEFAULT);
  const [iconSortButton, setIconSortButton] = useState<keyof typeof Ionicons.glyphMap>('arrow-up');

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

  const getSingleProduct = useCallback(async (baseUrl: string, id: number) => {
    try {
      const response = await fetch(baseUrl + `/${id}`);
      const data = await response.json();
      const remappedData = {
        ...data,
        rating: data.rating.rate,
        reviewCount: data.rating.count,
      };
      setSingleProduct(remappedData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }, []);

  // old wrong filterProduct function
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

  // old filterProducts function
  /*

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

   */

  const renderItemProduct = useCallback<ListRenderItem<Product>>(
    ({ item }) => (
      <ProductCard
        product={item}
        selected={favoriteIds.includes(item.id)}
        onAddFavorite={() => addFavorite(item)}
        onPress={() => {
          if (!item.id) {
            return;
          }
          navigationProp?.navigate(Screen.Detail, {
            id: item.id,
            idsArray: products.map((el) => el.id),
          });
        }}
      />
    ),
    [addFavorite, products, favoriteIds, navigationProp]
  );

  const renderItemCategory = useCallback<ListRenderItem<string>>(
    ({ item }) => (
      <Chip
        title={item}
        selected={selectedCategories.includes(item)}
        onPress={() => {
          if (selectedCategories.includes(item)) {
            setSelectedCategories((currentSelectedCategories: string[]) =>
              currentSelectedCategories.filter((category) => category !== item)
            );
          } else {
            setSelectedCategories((currentSelectedCategories: string[]) => [
              ...currentSelectedCategories,
              item,
            ]);
          }
        }}
      />
    ),
    [selectedCategories, setSelectedCategories]
  );

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

  // const sortProduct = useCallback(
  //   (sort: SortType) => {
  //     setSorting(sort);
  //     if (sort === SortType.DEFAULT) {
  //       setProducts(initialProducts);
  //       return;
  //     }
  //     const sortedProducts = products.sort((a, b) => {
  //       if (sort === SortType.ASCENDING) {
  //         return a.rating - b.rating;
  //       }
  //       return b.rating - a.rating;
  //     });
  //     setProducts(sortedProducts);
  //   },
  //   [initialProducts, products]
  // );

  const sortProduct = useCallback(() => {
    console.log('sorting', sorting);
    switch (sorting) {
      case SortType.DEFAULT:
        setProducts([...products].sort((a, b) => a.rating - b.rating));
        setSorting(SortType.ASCENDING);
        setIconSortButton('arrow-down');
        break;
      case SortType.ASCENDING:
        setProducts([...products].sort((a, b) => b.rating - a.rating));
        setSorting(SortType.DESCENDING);
        setIconSortButton('close');
        break;
      case SortType.DESCENDING:
        filterProductsCallBack();
        setSorting(SortType.DEFAULT);
        setIconSortButton('arrow-up');
        break;
    }
  }, [sorting, products]);

  const filterProductsCallBack = useCallback(() => {
    if (selectedCategories.length > 0) {
      const filteredProducts = initialProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
      setProducts(filteredProducts);
    } else {
      setProducts(initialProducts);
    }
  }, [initialProducts, selectedCategories]);

  // ** USE MEMO ** //
  const filterProducts = useMemo(async () => {
    filterProductsCallBack();
  }, [filterProductsCallBack]);

  return {
    products,
    favoriteIds,
    getProducts,
    fetchCategories,
    getSingleProduct,
    singleProduct,
    setSingleProduct,
    categories,
    renderItemProduct,
    renderItemCategory,
    navigationProp,
    setNavigationProp,
    // selectedCategory,
    // setSelectedCategory,
    selectedCategories,
    setSelectedCategories,
    filterProducts,
    sorting,
    sortProduct,
    iconSortButton,
    loadFavorites,
    addFavorite,
  };
};
