// QuizResult.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz, updateEarnedPoints } from "../redux/reducers/quizReducer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getLevelInfo } from "../utility/util";
import Piechart from "../components/graph/Piechart";
import Barchart from "../components/graph/Barchart";

const QuizResult = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showConfetti, setShowConfetti] = useState(false);
  const userAnswers = useSelector((state) => state.quiz.userAnswers);
  const skippedAnswers = useSelector((state) => state.quiz.questionSkipped);
  const totalQuestions = useSelector((state) => state.quiz.questions.length);
  const earnedPoints = useSelector((state) => state.quiz.earnedPoints);
  const correctAnswers = userAnswers.length;
  const incorrectAnswers = totalQuestions - correctAnswers - skippedAnswers;
  const unattemptedQuestions = skippedAnswers;
  const attemptedQuestions = totalQuestions - unattemptedQuestions;
  const updateUserPoints = () => {
    dispatch(updateEarnedPoints(correctAnswers));
  };

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3500);
    if (correctAnswers) {
      updateUserPoints();
    }
  }, []);

  const handleRestartQuiz = () => {
    dispatch(resetQuiz());
    navigation.navigate("Home"); // Replace 'Home' with the name of your home screen
  };

  const { level, nextLevelPoints } = getLevelInfo(earnedPoints);
  const levelInfo = level;
  const remainingPoints = nextLevelPoints;
  const barChartData = {
    labels: ["Correct", "Incorrect", "Unattempted", "Attempted"],
    datasets: [
      {
        data: [
          correctAnswers,
          incorrectAnswers,
          unattemptedQuestions,
          attemptedQuestions,
        ],
      },
    ],
  };
  const handleShareResult = () => {
    // Implement your logic to share the result
    console.log("Sharing result...");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* Your existing components here */}
        <Text style={styles.headingText}>
          Congratulations!! You have scored{" "}
        </Text>
        <Text style={styles.subHeadingText}>
          {(correctAnswers / totalQuestions) * 100}%
        </Text>
        <Text style={styles.headingTextPoints}>
          Yay! You have earned {correctAnswers} points!
        </Text>
        {/* Level Box */}
        <ImageBackground
          source={require("../Assets/trophyBackground.png")} // Replace with the actual path to your image
          style={styles.levelBox}
          imageStyle={styles.backgroundImageStyle}
        >
          <Text style={styles.levelText}>{levelInfo}</Text>
          <Text style={styles.remainingPointsText}>
            {remainingPoints} points to next level
          </Text>
        </ImageBackground>
        <View style={styles.separator} />
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRestartQuiz}>
            <Icon name="home" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleShareResult}>
            <Icon name="share-variant" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.headingText}> Graphical Analysis Summary </Text>

          <Piechart
            attempted={attemptedQuestions}
            unAttempted={unattemptedQuestions}
            correct={correctAnswers}
            total={totalQuestions}
            incorrect={incorrectAnswers}
          />
          <Barchart data={barChartData} />
        </View>
      </View>
      {showConfetti && (
        <ConfettiCannon count={200} origin={{ x: -80, y: 1400 }} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... existing styles
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  headingText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
    padding: 12,
    paddingHorizontal: 40,
    textAlign: "center",
  },
  headingTextPoints: {
    fontSize: 16,
    color: "#77dbf2",
    padding: 12,
    paddingHorizontal: 40,
    textAlign: "center",
  },
  subHeadingText: {
    fontSize: 24,
    color: "#77dbf2",
    fontWeight: "800",
    textAlign: "center",
  },

  chartContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    borderBottomColor: "#77dbf2",
    borderBottomWidth: 1,
    borderStyle: "dotted",
    marginVertical: 10,
  },
  levelBox: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    borderColor: "#3EB8D4",
    marginBottom: 20,
    alignItems: "center",
    marginTop: 20,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  remainingPointsText: {
    fontSize: 16,
    color: "#77dbf2",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3EB8D4",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  backgroundImageStyle: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
  },
});

export default QuizResult;
