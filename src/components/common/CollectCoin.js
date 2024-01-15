import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

const CollectCoin = () => {
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [animation] = useState(new Animated.Value(0));

  const handleCoinCollection = () => {
    // Trigger collection animation
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();

    // Update collected coins counter
    setCollectedCoins(collectedCoins + 1);
  };

  const interpolatedAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.5)"],
  });

  const animatedStyle = {
    backgroundColor: interpolatedAnimation,
  };

  return (
    <View style={styles.container}>
      {/* Game content */}

      {/* Coin graphic with collection animation */}
      <TouchableOpacity onPress={handleCoinCollection}>
        <Animated.View style={[styles.coin, animatedStyle]}>
          <Image
            source={require("../../Assets/coin.png")}
            style={styles.coinImage}
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Display collected coins count */}
      <View style={styles.coinCounter}>
        <Text style={styles.coinCounterText}>{collectedCoins}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Other styling for the game screen
  },
  coin: {
    width: 50,
    height: 50,
    // Other styling for the coin
  },
  coinImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  coinCounter: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  coinCounterText: {
    color: "white",
    fontSize: 16,
  },
});

export default CollectCoin;
