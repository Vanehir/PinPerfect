import React, { memo } from 'react';
import { Product } from '../../screens/hook/useProducts.facade';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './product.styles';
import COLORS from '../../../constants/colors';
import Button from '../button/button.atom';

interface ProductCardProps {
  product: Product;
  selected: boolean;
  onPress: () => void;
  onAddFavorite: () => void;
}

const ProductCard = ({ product, selected, onAddFavorite, onPress }: ProductCardProps) => {
  return (
    <View style={styles.container}>
      <Ionicons
        onPress={onAddFavorite}
        name={selected ? 'star' : 'star-outline'}
        size={36}
        color={COLORS.BROWNISH_YELLOW}
        style={styles.favoriteIcon}
      />

      <View style={styles.containerImage}>
        <Image style={styles.imageStyle} source={{ uri: product.image }} />
      </View>

      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>{product.title}</Text>
        </View>

        <Image source={{ uri: product.image }} />
      </View>

      <View style={styles.priceAndButtonContainer}>
        <View style={styles.priceAndRatingContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.rating}>{product.rating}/5</Text>
        </View>
        <Button onPress={onPress} title={'Details'} />
      </View>
    </View>
  );
};

export default memo(ProductCard);
