import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signin from "./Components/Signin.js";
import Homepage from "./Components/Homepage.js";
import AddMember from './Components/Addmember.js'

import { name as appname } from "./app.json";
import { AppRegistry } from "react-native";

AppRegistry.registerComponent(appname, () => Homepage);
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Signin">
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Homepage" component={Homepage} />
          <Stack.Screen name="Addmember" component={AddMember} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
