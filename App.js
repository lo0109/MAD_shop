import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { Provider, useDispatch } from "react-redux";

import store from "./src/redux/store";

import { DrawerNavigatorContainer } from "./src/component/DrawerNavigatorContainer";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigatorContainer />
      </NavigationContainer>
    </Provider>
  );
}
