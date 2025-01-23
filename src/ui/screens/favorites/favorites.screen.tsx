import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorStackParamList, Screen } from '../../navigation/types';
import { useProducts } from '../hook/useProducts.facade';
import API_URL from '../../../constants/api_urls';

interface Props {
  navigation: NativeStackNavigationProp<NavigatorStackParamList, Screen.Favorites>;
}

const FavoritesScreen = ({ navigation }: Props) => {
  const { getProducts, fetchCategories, loadFavorites } = useProducts();

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
    <View>
      <Text>Favorites Screen placeholder</Text>
    </View>
  );
};

export default FavoritesScreen;
