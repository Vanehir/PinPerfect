import React from 'react';
import { Text, View } from 'react-native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {NavigatorStackParamList, Screen} from "../../navigation/types";

interface Props {
  navigation: NativeStackNavigationProp<NavigatorStackParamList, Screen.Favorites>
}

const FavoritesScreen = () => {
  return (
    <View>
      <Text>Favorites Screen placeholder</Text>
    </View>
  )
}

export default FavoritesScreen;
