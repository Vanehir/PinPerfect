import React from 'react';
import styles from './button.styles';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, title }: { onPress: () => void; title: string }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
