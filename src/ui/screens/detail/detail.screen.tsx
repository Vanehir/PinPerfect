import React, { useCallback, useEffect, useMemo } from 'react';
import { Animated, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { DetailScreenProps } from '../../navigation/navigationProps';
import { ProductDetail, useProducts } from '../hook/useProducts.facade';
import API_URL from '../../../constants/api_urls';
import { Dimensions } from 'react-native';
import styles from './detail.styles';
import ScrollView = Animated.ScrollView;
import IconButton from '../../atoms/iconButton/iconButton.atom';
import COLORS from '../../../constants/colors';
import { WIN_WIDTH, WIN_HEIGHT } from '../../../constants/dimensions';

const DetailScreen = ({ navigation, route }: DetailScreenProps) => {
  const { getSingleProduct, singleProduct } = useProducts();

  const { id, idsArray } = route.params;

  // ** USE MEMO ** //
  const currentIndex = useMemo(() => idsArray.indexOf(id), [id, idsArray]);

  const backButtonColor = useMemo(
    () => (currentIndex > 0 ? COLORS.TURQUOISE_SURF : COLORS.GREY),
    [currentIndex]
  );
  const forwardButtonColor = useMemo(
    () => (currentIndex < idsArray.length - 1 ? COLORS.TURQUOISE_SURF : COLORS.GREY),
    [currentIndex, idsArray.length]
  );

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
        <IconButton icon={'chevron-back'} onPress={handleBack} colorButton={backButtonColor} />
        <IconButton
          icon={'chevron-forward'}
          onPress={handleNext}
          colorButton={forwardButtonColor}
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
