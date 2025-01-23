import { StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  container: {
    flex: 1,
    color: COLORS.WHITE,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    paddingVertical: 20,
  },
  image: {
    borderRadius: 15,
  },
  detailsContainer: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginTop: -20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  priceReviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.CARNATION_PINK,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCount: {
    color: COLORS.GREY,
  },
  description: {
    fontSize: 16,
    color: COLORS.BLACK,
    lineHeight: 24,
    marginBottom: 20,
  },
  iconButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default styles;
