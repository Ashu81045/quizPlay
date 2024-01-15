import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ChampionBox = () => {
  return (
    <View style={styles.container}>
      {/* First Box */}
      <View style={styles.box}>
        {/* First Column */}
        <View style={styles.column}>
          {/* First Row */}
          <Image
            source={require("../../Assets/trophy.png")}
            style={styles.image}
          />
          {/* Second Row */}
          <View style={styles.row}>
            <Text style={styles.text}>Your Text 1</Text>
            <Text style={styles.number}>1</Text>
          </View>
        </View>

        {/* Second Column */}
        <View style={styles.column}>
          {/* First Row */}
          <Image
            source={require("../../Assets/coin.png")}
            style={styles.image}
          />
          {/* Second Row */}
          <View style={styles.row}>
            <Text style={styles.text}>Your Text 2</Text>
            <Text style={styles.number}>2</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 16,
    background: "#323232",
    shadowColor: "3px 4px 12px 0px rgba(0, 0, 0, 0.08)",
  },
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  number: {
    fontSize: 16,
    color: "blue",
  },
});

export default ChampionBox;
