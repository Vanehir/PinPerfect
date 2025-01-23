import React, { useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useProducts } from '../hook/useProducts.facade';
import API_URL from '../../../constants/api_urls';
import { FavoritesScreenProps } from '../../navigation/navigationProps';
import styles from './favorites.styles';

const FavoritesScreen = ({ navigation }: FavoritesScreenProps) => {
  const {
    products,
    favoriteIds,
    getProducts,
    fetchCategories,
    categories,
    renderItemProduct,
    renderItemCategory,
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
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.screenContainer}>
      <View>
        <FlatList
          data={categories}
          renderItem={renderItemCategory}
          keyExtractor={(item) => item}
          horizontal
        />
      </View>

      {favorites.length > 0 ? (
        <View>
          <FlatList
            data={favorites}
            renderItem={renderItemProduct}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : (
        <View style={styles.noFavoritesContainer}>
          <Text>No favorites yet</Text>
          <Text>This is sad :(</Text>
        </View>
      )}
    </View>
  );
};

export default FavoritesScreen;
