import React, { memo } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './chip.styles';

const Chip = ({
  title,
  selected,
  onPress,
}: {
  title: string;
  onPress: () => void;
  selected: boolean;
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected ? styles.chipSelected : styles.chipNotSelected]}
      onPress={onPress}>
      <View style={styles.chipTextContainer}>
        <Text
          style={[
            styles.chipText,
            selected ? styles.chipTextSelected : styles.chipTextNotSelected,
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Chip);
