import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import styles from './iconButton.styles';
import COLORS from '../../../constants/colors';

const IconButton = ({
  icon,
  onPress,
  colorIcon = COLORS.WHITE,
  colorButton = COLORS.TURQUOISE_SURF,
  disabled = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  colorIcon?: string;
  colorButton?: string;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      style={[styles.iconButton, { backgroundColor: colorButton }]}
      onPress={onPress}
      disabled={disabled}>
      <Ionicons name={icon} size={24} color={colorIcon} />
    </TouchableOpacity>
  );
};

export default IconButton;
