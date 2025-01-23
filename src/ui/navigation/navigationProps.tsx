import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorStackParamList, Screen, TabParams } from './types';
import { RouteProp } from '@react-navigation/native';

// TODO find out why this does not work
/*
export interface NavigationProps {
  navigationHome: NativeStackNavigationProp<NavigatorStackParamList, Screen.Home>;
  navigationFavorites: NativeStackNavigationProp<NavigatorStackParamList, Screen.Favorites>;
  navigationDetail: NativeStackNavigationProp<NavigatorStackParamList, Screen.Detail>;
  routeDetail: RouteProp<NavigatorStackParamList, Screen.Detail>;
}
 */

export interface HomeScreenProps {
  navigation: NativeStackNavigationProp<NavigatorStackParamList, Screen.Home>;
}

export interface FavoritesScreenProps {
  navigation: NativeStackNavigationProp<NavigatorStackParamList, Screen.Favorites>;
}

export interface DetailScreenProps {
  navigation: NativeStackNavigationProp<NavigatorStackParamList, Screen.Detail>;
  route: RouteProp<NavigatorStackParamList, Screen.Detail>;
}
