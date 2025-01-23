import React, { useCallback, useEffect } from 'react';

import { FlatList, ListRenderItem, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorStackParamList, Screen } from '../../navigation/types';
import { Product, useProducts } from '../hook/useProducts.facade';
import ProductCard from '../../atoms/product/product.atom';
import API_URL from '../../../constants/api_urls';
import Chip from '../../atoms/chip/chip.atom';

interface Props {
  navigation: NativeStackNavigationProp<NavigatorStackParamList, Screen.Home>;
}

const HomeScreen = ({ navigation }: Props) => {
  const {
    products,
    favoriteIds,
    getProducts,
    fetchCategories,
    categories,
    selectedCategories,
    setSelectedCategories,
    filterProducts,
    loadFavorites,
    addFavorite,
  } = useProducts();

  // ** USE CALLBACK ** //
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
          navigation.navigate(Screen.Detail, {
            id: item.id,
            idsArray: products.map((el) => el.id),
          });
        }}
      />
    ),
    [addFavorite, products, favoriteIds, navigation]
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
            filterProducts;
          }
        }}
      />
    ),
    [filterProducts, selectedCategories, setSelectedCategories]
  );

  // ** USE EFFECT ** //
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Favorites screen focused');
      getProducts(API_URL.BASE_URL); // TODO find out why this give an error even if category is optional
      fetchCategories(API_URL.CATEGORY_URL);
      loadFavorites();
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <View>
        <FlatList
          data={categories}
          renderItem={renderItemCategory}
          keyExtractor={(item) => item}
          horizontal
        />

        <FlatList
          data={products}
          renderItem={renderItemProduct}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
};

export default HomeScreen;
