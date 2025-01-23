import React, { useCallback, useEffect, useMemo } from 'react';
import { Animated, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { DetailScreenProps } from '../../navigation/navigationProps';
import { ProductDetail, useProducts } from '../hook/useProducts.facade';
import API_URL from '../../../constants/api_urls';
import { Dimensions } from 'react-native';
import styles from './detail.styles';
import ScrollView = Animated.ScrollView;
import IconButton from '../../atoms/iconButton/iconButton.atom';

const DetailScreen = ({ navigation, route }: DetailScreenProps) => {
  const {
    products,
    favoriteIds,
    getProducts,
    fetchCategories,
    categories,
    getSingleProduct,
    singleProduct,
    setSingleProduct,
    selectedCategories,
    setSelectedCategories,
    renderItemProduct,
    navigationProp,
    setNavigationProp,
    filterProducts,
    loadFavorites,
    addFavorite,
  } = useProducts();

  const { id, idsArray } = route.params;
  const { width: WIN_WIDTH, height: WIN_HEIGHT } = Dimensions.get('window');

  // ** USE MEMO ** //
  const currentIndex = useMemo(() => idsArray.indexOf(id), [id, idsArray]);

  // ** USE CALLBACK ** //
  const handleBack = useCallback(() => {
    const nextId = idsArray[currentIndex - 1];
    if (!nextId) {
      return;
    }
    navigation.setParams({ id: nextId });
  }, [currentIndex, idsArray, navigation]);

  const handleNext = useCallback(() => {
    const nextId = idsArray[currentIndex + 1];
    if (!nextId) {
      return;
    }
    navigation.setParams({ id: nextId });
  }, [currentIndex, idsArray, navigation]);

  // ** USE EFFECT ** //
  useEffect(() => {
    getSingleProduct(API_URL.BASE_URL, id);
  }, [id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backButtonContainer}>
        <IconButton icon={'return-up-back'} onPress={navigation.goBack} />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: singleProduct?.image }}
            style={[
              styles.image,
              {
                width: WIN_WIDTH - 40,
                height: WIN_HEIGHT / 3,
              },
            ]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{singleProduct?.title}</Text>

          <View style={styles.priceReviewContainer}>
            <Text style={styles.price}>${singleProduct?.price}</Text>
            <View style={styles.reviewContainer}>
              <Text style={styles.reviewCount}>{singleProduct?.reviewCount} Reviews</Text>
            </View>
          </View>

          <Text style={styles.description}>{singleProduct?.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.iconButtonContainer}>
        <IconButton icon={'chevron-back'} onPress={handleBack} />
        <IconButton icon={'chevron-forward'} onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
