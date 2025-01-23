export enum Screen {
  TabNavigator = 'TabNavigator',
  Home = 'Home',
  Detail = 'Detail',
  Favorites = 'Favorites',
}

export type NavigatorStackParamList = {
  TabNavigator: undefined;
  [Screen.Detail]: {
    id: number;
    idsArray: number[];
  };
};
