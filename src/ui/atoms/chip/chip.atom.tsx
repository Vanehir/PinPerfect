import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './chip.styles';

const Chip = ({
  title,
  onPress,
  selected,
}: {
  title: string;
  onPress: () => void;
  selected: boolean;
}) => {
  return (
    <TouchableOpacity style={[styles.chip, styles.chipNotSelected]} onPress={onPress}>
      <View style={styles.chipTextContainer}>
        <Text style={styles.chipText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chip;
