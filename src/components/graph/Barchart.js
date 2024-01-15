import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
const Barchart = ({ data }) => {
  const chartConfig = {
    backgroundGradientFrom: "#3EB8D4",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#3EB8D4",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(201, 206, 26, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.container}>
      <View style={styles.internalContainer}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Quiz Summary
        </Text>
        <BarChart
          data={data}
          width={280}
          height={280}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero
          showValuesOnTopOfBars
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  internalContainer: {
    margin: 20,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#232B5D",
  },
});
export default Barchart;
