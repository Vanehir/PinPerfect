import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParams, Screen } from "../types";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../../screens/home/home.screen";
import FavoritesScreen from "../../screens/favorites/favorites.screen";
import COLORS from "../../../constants/colors";

const Tab = createBottomTabNavigator<TabParams>();
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: true,
          tabBarShowLabel: true,
          tabBarIconStyle: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarLabelStyle: {
            color: COLORS.TURQUOISE_SURF,
          },
          tabBarIcon: ({ focused }) => {
            const iconName = () => {
              switch (route.name) {
                case Screen.Home:
                  return "home";
                case Screen.Favorites:
                  return "bookmark";
              }
            };
            return (
              <Ionicons
                name={iconName()}
                size={24}
                color={focused ? COLORS.TURQUOISE_SURF : COLORS.GREY}
              />
            );
          },
        };
      }}
    >
      <Tab.Screen name={Screen.Home} component={HomeScreen} />
      <Tab.Screen name={Screen.Favorites} component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
