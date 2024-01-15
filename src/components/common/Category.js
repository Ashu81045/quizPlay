// QuizCategory.js (Component)
import React from "react";
import { View, Text, Button } from "react-native";

const QuizCategory = ({ category, onSelectCategory }) => (
  <View>
    <Button title={category} onPress={() => onSelectCategory(category)} />
  </View>
);

export default QuizCategory;
