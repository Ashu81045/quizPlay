import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const Piechart = ({ attempted, unAttempted, correct, total, incorrect }) => {
  const percentageConvertor = (val) => Math.round((val / total) * 100);
  const pieData = [
    {
      value: percentageConvertor(correct),
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    {
      value: percentageConvertor(unAttempted),
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
    },
    {
      value: percentageConvertor(attempted),
      color: "#BDB2FA",
      gradientCenterColor: "#8F80F3",
    },
    {
      value: percentageConvertor(incorrect),
      color: "#FFA5BA",
      gradientCenterColor: "#FF7F97",
    },
  ];

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#006DFF")}
            <Text style={{ color: "white" }}>
              Correct: {percentageConvertor(correct)}%
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#8F80F3")}
            <Text style={{ color: "white" }}>
              Incorrect: {percentageConvertor(incorrect)}%
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#3BE9DE")}
            <Text style={{ color: "white" }}>
              Attempted: {percentageConvertor(attempted)}%
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#FF7F97")}
            <Text style={{ color: "white" }}>
              Unattempted: {percentageConvertor(unAttempted)}%
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        // backgroundColor: "#34448B",
        flex: 1,
      }}
    >
      <View
        style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: "#232B5D",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Performance
        </Text>
        <View style={{ padding: 20, alignItems: "center" }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={"#232B5D"}
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                  >
                    {percentageConvertor(correct)}%
                  </Text>
                  <Text style={{ fontSize: 14, color: "white" }}>Correct</Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
};
export default Piechart;
