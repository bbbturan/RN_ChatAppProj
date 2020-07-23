import React from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigator";

import Login from "./screens/Login";
import Home from "./screens/Home";
import Chat from "./screens/Chat";
import AuthLoadingScreen from ".../screens/AuthLoadingScreen";

const AppStack = createStackNavigator({ Home: Home, Chat: Chat });
const AuthStack = createStackNavigator({ Login: Login });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
