import { StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 12,
    paddingHorizontal: 12 * 1.5,
    borderRadius: 12 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    marginVertical: 8,
  },
  chipNotSelected: {
    borderColor: COLORS.BLACK,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  chipSelected: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: 12,
  },
  chipTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 12 * 2,
  },
  chipText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default styles;
