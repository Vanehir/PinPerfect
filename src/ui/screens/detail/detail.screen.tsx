import {Text, View} from "react-native";
import React from "react";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {NavigatorStackParamList, Screen} from "../../navigation/types";

interface Props {
  navigation: NativeStackNavigationProp<NavigatorStackParamList, Screen.Detail>
}

const DetailScreen = () => {
  return(
    <View>
      <Text>Detail Screen placeholder</Text>
    </View>
  )
}

export default DetailScreen;
