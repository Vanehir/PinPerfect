import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  categoryContainer: {
    padding: 10,
  },
  productContainer: {
    flex: 1,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortButtonContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
});

export default styles;
