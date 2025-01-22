import React, { useCallback, useEffect } from 'react';

import { FlatList, ListRenderItem, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorStackParamList, Screen } from '../../navigation/types';
import { Product, useProducts } from '../hook/useProducts.facade';
import ProductCard from '../../atoms/product/product.atom';

const BASE_URL = 'https://fakestoreapi.com/products';
const CATEGORY_URL = 'https://fakestoreapi.com/products/categories';

interface Props {
  navigation: NativeStackNavigationProp<NavigatorStackParamList, Screen.Home>;
}

const HomeScreen = ({ navigation }: Props) => {
  const {
    products,
    favoriteIds,
    refreshProducts,
    loadFavorites,
    addFavorite,
    FilterType,
    sorting,
    onApplyFilter,
  } = useProducts();

  // ** USE CALLBACK ** //
  const renderItem = useCallback<ListRenderItem<Product>>(
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

  // ** USE EFFECT ** //
  useEffect(() => {
    refreshProducts(BASE_URL);
    loadFavorites();
  }, []);

  return (
    <>
      <View>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
};

export default HomeScreen;
