import { StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 8,
  },
  titleContainer: {
    alignItems: 'center',
    margin: 15,
  },
  titleStyle: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  containerImage: {
    padding: 8,
    alignItems: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  genericCardText: {
    fontSize: 16,
    color: 'white',
  },
  priceAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.CARNATION_PINK,
  },
  rating: {
    fontSize: 14,
    color: COLORS.GREY,
    paddingLeft: 8,
  },
  priceAndRatingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});
export default styles;
