import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import styles from './iconButton.styles';

const IconButton = ({
  icon,
  onPress,
  color = 'white',
  disabled = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress} disabled={disabled}>
      <Ionicons name={icon} size={24} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
