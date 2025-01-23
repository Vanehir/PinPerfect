import React, { useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useProducts } from '../hook/useProducts.facade';
import API_URL from '../../../constants/api_urls';
import { FavoritesScreenProps } from '../../navigation/navigationProps';

const FavoritesScreen = ({ navigation }: FavoritesScreenProps) => {
  const {
    products,
    favoriteIds,
    getProducts,
    fetchCategories,
    categories,
    renderItemProduct,
    renderItemCategory,
    navigationProp,
    setNavigationProp,
    loadFavorites,
  } = useProducts();

  // ** USE MEMO ** //
  const favorites = useMemo(
    () => products.filter((product) => favoriteIds.includes(product.id)),
    [products, favoriteIds]
  );

  // ** USE EFFECT ** //
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Favorites screen focused');
      getProducts(API_URL.BASE_URL); // TODO find out why this give an error even if category is optional
      fetchCategories(API_URL.CATEGORY_URL);
      loadFavorites();
      setNavigationProp(navigation);
    });
    console.log(navigationProp);
    return unsubscribe;
  }, [navigation]);

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
          data={favorites}
          renderItem={renderItemProduct}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
};

export default FavoritesScreen;
