export enum Screen {
  TabNavigator = 'TabNavigator',
  Home = 'Home',
  Detail = 'Detail',
  Favorites = 'Favorites',
}

export type TabParams = {
  [Screen.Home]: undefined;
  [Screen.Favorites]: undefined;
}

export type NavigatorStackParamList = {
  TabNavigator: undefined;
  [Screen.Detail]: {
    id: number;
    idsArray: number[];
  };
}
