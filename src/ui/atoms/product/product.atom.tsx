import React, { memo } from 'react';
import { Product } from '../../screens/hook/useProducts.facade';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './product.styles';
import COLORS from '../../constants/colors';

interface ProductCardProps {
  product: Product;
  selected: boolean;
  onPress: () => void;
  onAddFavorite: () => void;
}

const Card = ({ product, selected, onAddFavorite, onPress }: ProductCardProps) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <Image style={styles.imageStyle} source={{ uri: product.image }} />
        </View>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>{product.title}</Text>
          </View>
          <View>
            <Ionicons
              onPress={onAddFavorite}
              name={selected ? 'star' : 'star-outline'}
              size={28}
              color={COLORS.BROWNISH_YELLOW}
            />
          </View>
          <View></View>
          <Image source={{ uri: product.image }} />
        </View>
        <View>
          <Text>{product.price}</Text>
        </View>
      </View>
    </>
  );
};

export default memo(Card);
