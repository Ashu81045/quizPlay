// MainNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/Home";
import RegistrationScreen from "../../components/common/RegistrationScreen";
import QuizScreen from "../../screens/QuizScreen";
import QuizResultScreen from "../../screens/QuizResult";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const user = useSelector((state) => state.quiz.user);

  return (
    <Stack.Navigator>
      {user.length ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="QuizResult" component={QuizResultScreen} />
        </>
      ) : (
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
