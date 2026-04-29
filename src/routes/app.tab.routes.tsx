import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { AppStackRoutes } from "./app.stack.routes";

import { useTheme } from "styled-components/native";

import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";
import { Profile } from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarStyle: {
          paddingVertical: Platform.OS ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="HomeStack"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="home"
              size={32}
              color={color ? color : theme.colors.text}
            />
          ),
        }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="person"
              size={32}
              color={color ? color : theme.colors.text}
            />
          ),
        }}
      />

      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="directions-car"
              size={32}
              color={color ? color : theme.colors.text}
            />
          ),
        }}
      />
    </Navigator>
  );
}
