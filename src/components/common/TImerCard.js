import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TimerCard = ({ content, timeRemaining }) => {
  // Calculate progress based on the remaining time
  const progress = (30 - timeRemaining) / 30; // Assuming the total time is 30 seconds

  // Calculate the dynamic borderWidth based on progress
  const borderWidth = 4 + 16 * progress; // 4 is the initial borderWidth, and 16 is the maximum increase

  return (
    <View style={styles.card}>
      <View style={[styles.timerCircle, { borderWidth: 4 }]}>
        <Text style={styles.timerText}>{timeRemaining}</Text>
      </View>
      <Text style={styles.timerText}>{content}</Text>
      {/* Add other card content below */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#323232", // Set the background color of the card
    borderRadius: 8,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 24,
  },
  timerCircle: {
    position: "absolute",
    top: -20, // Adjust as needed
    left: "60%",
    marginLeft: -20, // Half of the circle width
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#3EB8D4",
    backgroundColor: "#000",
  },
  timerText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
    color: "#fff",
    fontWeight: "700",
  },
});

export default TimerCard;
