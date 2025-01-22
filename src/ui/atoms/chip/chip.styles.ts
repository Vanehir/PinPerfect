import { StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8 * 2,
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
    paddingHorizontal: 14,
  },
  chipTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 16,
  },
  chipText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  chipTextSelected: {
    color: COLORS.WHITE,
  },
  chipTextNotSelected: {
    color: COLORS.BLACK,
  },
});

export default styles;
