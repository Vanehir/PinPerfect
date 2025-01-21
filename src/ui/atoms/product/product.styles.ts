import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

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
  containerHeader: {
    flexDirection: 'row',
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleStyle: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
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
  genericCardTextSpacing: {
    marginTop: 8,
  },
  genericCardText: {
    fontSize: 16,
    color: 'white',
  },
});
export default styles;
