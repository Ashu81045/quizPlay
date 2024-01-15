// components/common/CustomCheckbox.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomCheckbox = ({
  label,
  isCorrect,
  isEvaluated,
  isSelected,
  onPress,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Reset the checked state when moving to the next question
    setChecked(false);
  }, [isEvaluated]);

  const handleToggle = () => {
    if (!isEvaluated) {
      setChecked(!checked);
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        marginTop: 8,
        borderWidth: 2,
        borderRadius: 16,
        borderColor: isEvaluated
          ? isCorrect
            ? "#3EB8D4"
            : isSelected
            ? "#FF0000"
            : "#737373"
          : "#737373",
        padding: 12,
        backgroundColor: isSelected ? "#000" : "transparent",
        opacity: isEvaluated ? 0.5 : 1, // Adjust opacity for disabled options
      }}
      disabled={isEvaluated}
    >
      <View>
        <Text
          style={{
            marginRight: 16,
            fontWeight: "500",
            fontSize: 18,
            color: isEvaluated
              ? isCorrect
                ? "#3EB8D4"
                : isSelected
                ? "#FF0000"
                : "#fff"
              : "#fff",
          }}
        >
          {label}
        </Text>
      </View>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: isEvaluated
            ? isCorrect
              ? "#3EB8D4"
              : isSelected
              ? "#FF0000"
              : "#737373"
            : "#737373",
          backgroundColor: isEvaluated
            ? isCorrect
              ? "#3EB8D4"
              : isSelected
              ? "#FF0000"
              : "transparent"
            : "transparent",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isEvaluated ? (
          isCorrect ? (
            <Icon name="check" size={18} color="#ffffff" />
          ) : isSelected ? (
            <Icon name="close" size={18} color="#ffffff" />
          ) : null
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
