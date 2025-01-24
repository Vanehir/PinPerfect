import React, { useEffect, useMemo } from 'react';

import { FlatList, View } from 'react-native';
import { useProducts } from '../hook/useProducts.facade';
import API_URL from '../../../constants/api_urls';
import { HomeScreenProps } from '../../navigation/navigationProps';

import IconButton from '../../atoms/iconButton/iconButton.atom';

import styles from '../tabScreen.styles';
import COLORS from '../../../constants/colors';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const {
    products,
    getProducts,
    fetchCategories,
    categories,
    renderItemProduct,
    renderItemCategory,
    setNavigationProp,
    sorting,
    iconSortButton,
    sortProduct,
    loadFavorites,
  } = useProducts();

  // ** USE CALLBACK ** //

  // const renderItemProduct = useCallback<ListRenderItem<Product>>(
  //   ({ item }) => (
  //     <ProductCard
  //       product={item}
  //       selected={favoriteIds.includes(item.id)}
  //       onAddFavorite={() => addFavorite(item)}
  //       onPress={() => {
  //         if (!item.id) {
  //           return;
  //         }
  //         navigation.navigate(Screen.Detail, {
  //           id: item.id,
  //           idsArray: products.map((el) => el.id),
  //         });
  //       }}
  //     />
  //   ),
  //   [addFavorite, products, favoriteIds]
  // );

  // const renderItemCategory = useCallback<ListRenderItem<string>>(
  //   ({ item }) => (
  //     <Chip
  //       title={item}
  //       selected={selectedCategories.includes(item)}
  //       onPress={() => {
  //         if (selectedCategories.includes(item)) {
  //           setSelectedCategories((currentSelectedCategories: string[]) =>
  //             currentSelectedCategories.filter((category) => category !== item)
  //           );
  //         } else {
  //           setSelectedCategories((currentSelectedCategories: string[]) => [
  //             ...currentSelectedCategories,
  //             item,
  //           ]);
  //           filterProducts;
  //         }
  //       }}
  //     />
  //   ),
  //   [filterProducts, selectedCategories, setSelectedCategories]
  // );

  // ** USE EFFECT ** //
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Home screen focused');
      getProducts(API_URL.BASE_URL); // TODO find out why this give an error even if category is optional
      fetchCategories(API_URL.CATEGORY_URL);
      loadFavorites();
      setNavigationProp(navigation);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.sortButtonContainer}>
        <IconButton icon={iconSortButton} onPress={sortProduct} colorButton={COLORS.BLACK} />
      </View>
      <View>
        <FlatList
          data={categories}
          renderItem={renderItemCategory}
          keyExtractor={(item) => item}
          horizontal
        />
      </View>

      <View style={styles.productContainer}>
        <FlatList
          data={products}
          renderItem={renderItemProduct}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
