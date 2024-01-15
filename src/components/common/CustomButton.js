// components/common/CommonButton.js
import React from "react";
import { Button } from "react-native-paper";

const CommonButton = ({ label, onPress }) => {
  return (
    <Button
      mode="contained"
      color="#3EB8D4"
      style={{ borderRadius: 16, marginVertical: 8 }}
      contentStyle={{ height: 52, width: 327 }}
      onPress={onPress}
    >
      {label}
    </Button>
  );
};

export default CommonButton;
