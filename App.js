//app.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from "react-native-paper";
import { Provider, useSelector } from "react-redux";
import store from "./src/redux/store";
import { PreferencesContext } from "./src/components/common/ThemeContext";
import MainNavigator from "./src/components/navigation/MainNavigator";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const theme = isThemeDark ? DarkTheme : DefaultTheme;
  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <Provider store={store}>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <MainNavigator/>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </Provider>
  );
};

export default App;
