import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestionsRequest,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  setCurrentQuestion,
  submitAnswer,
  resetQuiz,
  submitSkip,
} from "../redux/reducers/quizReducer";
import OptionBox from "../components/common/OptionBox";
import TimerCard from "../components/common/TImerCard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ProgressBar } from "react-native-paper";
import gk from "../data/gk/questions.json";
import biology from "../data/biology/questions.json";
import chemistry from "../data/chemistry/questions.json";
import english from "../data/english/questions.json";
import geography from "../data/geography/questions.json";
import history from "../data/history/questions.json";
import maths from "../data/maths/questions.json";
import science from "../data/science/questions.json";
import sports from "../data/sports/questions.json";
import { getRandomElements } from "../utility/util";
import MySnackbar from "../components/common/SnackBar";

const RANDOM = 20;
const CATWISE = 15;
const RANDOMCAT = "Random";

const QuizScreen = ({ route, navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [time, setTime] = useState(30);
  const [isFrozen, setFrozen] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarDuration] = useState(2000);
  const [soundObject, setSoundObject] = useState(null);

  const { category } = route.params;
  const dispatch = useDispatch();
  const isMounted = useRef(true);
  const intervalIdRef = useRef(null);

  const categoryQuestions = {
    maths,
    chemistry,
    biology,
    geography,
    sports,
    gk,
    history,
    english,
    science,
  };

  const combinedQuestions = [
    ...maths,
    ...chemistry,
    ...biology,
    ...geography,
    ...sports,
    ...gk,
    ...history,
    ...english,
    ...science,
  ];

  const { questions, currentQuestionIndex, userAnswers } = useSelector(
    (state) => state.quiz
  );

  useEffect(() => {
    return () => {
      // Component will unmount
      isMounted.current = false;
      clearInterval(intervalIdRef.current);
    };
  }, []);
  useEffect(() => {
    // Reset the timer when navigating to the next route
    return () => {
      clearInterval(intervalIdRef.current);
      setTime(30);
      setSelectedOption(null);
      setIsEvaluated(false);
      setIsCorrect(false);
      setFrozen(false);
      setSnackbarVisible(false);
      setSnackbarMessage("");
      dispatch(setCurrentQuestion(0));
    };
  }, [navigation]);

  useEffect(() => {
    // Check if coming from QuizResult, then reset the quiz
    const unsubscribeFocus = navigation.addListener("focus", () => {
      if (route.name === "QuizResult") {
        dispatch(resetQuiz());
      }
    });

    // Clear the interval when the component is unmounted
    return () => {
      unsubscribeFocus();
      clearInterval(intervalIdRef.current);
    };
  }, [navigation, route, dispatch]);

  useEffect(() => {
    // Reset the timer when the current question changes
    setTime(30);
  }, [currentQuestionIndex]);

  useEffect(() => {
    const loadSound = async () => {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync(require("../Assets/archivo.mp3"));
        setSoundObject(sound);
      } catch (error) {
        console.error("Error loading sound", error);
      }
    };

    loadSound();

    return () => {
      // Unload the sound when the component is unmounted
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (time === 5 && !isEvaluated) {
      playWarningSound();
    } else if (isEvaluated) {
      unloadWarningSound();
    }
  }, [time, isEvaluated]);

  const playWarningSound = async () => {
    try {
      if (soundObject) {
        await soundObject.setPositionAsync(0); // Reset the sound to the beginning
        await soundObject.playAsync();
      }
    } catch (error) {
      console.error("Error playing sound", error);
    }
  };
  const unloadWarningSound = async () => {
    try {
      if (soundObject._loaded) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
      }
    } catch (error) {
      console.error("Error unloading sound", error);
    }
  };

  useEffect(() => {
    const handleTimerExpiration = () => {
      if (currentQuestionIndex === questions.length - 1) {
        // If it's the last question, navigate to the result screen
        if (isMounted.current) {
          dispatch(submitSkip());
          navigation.navigate("QuizResult", { category });
        }
      } else {
        // If not the last question, show a snackbar or any other notification
        if (isMounted.current) {
          setSnackbarMessage("Time's up!");
          setSnackbarVisible(true);

          // Automatically close the Snackbar after the specified duration
          setTimeout(() => {
            if (isMounted.current) {
              setSnackbarVisible(false);
            }
          }, snackbarDuration);

          // Move to the next question after Snackbar is dismissed
          setTimeout(() => {
            if (isMounted.current) {
              dispatch(setCurrentQuestion(currentQuestionIndex + 1));
              dispatch(submitSkip());
            }
          }, snackbarDuration + 10); // Adjust the delay accordingly
        }
      }
    };

    intervalIdRef.current = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));

      if (time === 0) {
        clearInterval(intervalIdRef.current);
        handleTimerExpiration();
      }
    }, 1000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [
    time,
    currentQuestionIndex,
    dispatch,
    questions.length,
    navigation,
    category,
    snackbarDuration,
  ]);

  useEffect(() => {
    dispatch(fetchQuestionsRequest());

    try {
      const data =
        category !== RANDOMCAT
          ? categoryQuestions[category.toLowerCase()]
          : combinedQuestions;
      const questionsData =
        category !== RANDOMCAT
          ? getRandomElements(data, CATWISE)
          : getRandomElements(combinedQuestions, RANDOM);
      dispatch(fetchQuestionsSuccess(questionsData));
    } catch (error) {
      dispatch(fetchQuestionsFailure(error.message));
      console.error(error, "err");
    }

    intervalIdRef.current = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      if (time === 0) {
        clearInterval(intervalIdRef.current);
        handleTimerExpiration();
      }
    }, 1000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [category, dispatch, route]);

  const handleAnswerSubmission = (answer, index) => {
    setFrozen(true);
    setSelectedOption(index);
    setIsEvaluated(true);

    if (currentQuestionIndex === questions.length - 1) {
      if (isMounted.current) {
        setIsCorrect(questions[currentQuestionIndex].answer === answer);

        if (questions[currentQuestionIndex].answer === answer) {
          setTimeout(() => {
            if (isMounted.current) {
              dispatch(submitAnswer(answer));
              setIsEvaluated(false);
              setSelectedOption(null);
              setFrozen(false);
            }
            navigation.navigate("QuizResult", { category });
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.navigate("QuizResult", { category });
          }, 2000);
        }
      }
    } else {
      setIsCorrect(questions[currentQuestionIndex].answer === answer);

      if (questions[currentQuestionIndex].answer === answer) {
        setTimeout(() => {
          if (isMounted.current) {
            dispatch(submitAnswer(answer));
            dispatch(setCurrentQuestion(currentQuestionIndex + 1));
            setIsEvaluated(false);
            setSelectedOption(null);
            setFrozen(false);
          }
        }, 2000);
      }

      setTimeout(() => {
        if (isMounted.current) {
          dispatch(setCurrentQuestion(currentQuestionIndex + 1));
          setIsEvaluated(false);
          setSelectedOption(null);
          setFrozen(false);
        }
      }, 2000);
    }
  };

  const handleQuizReset = () => {
    dispatch(resetQuiz());
    navigation.navigate("Home", { category });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.topicText}>Topic - {category}</Text>
      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleQuizReset}
            >
              <Icon name="close" size={18} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.progressBarContainer}>
              <ProgressBar
                progress={(currentQuestionIndex + 1) / questions.length}
                color={"#FF9F41"}
              />
              <View />
            </View>
          </View>
          <View style={styles.questionsDetails}>
            <Text style={styles.prgbrText}> Question: </Text>
            <Text style={styles.activeQuestion}>
              {currentQuestionIndex + 1}/
            </Text>
            <Text style={styles.prgbrText}>{`${questions.length}`}</Text>
          </View>
          <TimerCard
            content={questions[currentQuestionIndex].question}
            timeRemaining={time}
          />
          {questions[currentQuestionIndex].options.map((option, index) => (
            <OptionBox
              label={option}
              isEvaluated={isEvaluated}
              isCorrect={isCorrect && selectedOption === index}
              isSelected={selectedOption === index}
              key={option}
              onPress={() => handleAnswerSubmission(option, index)}
            />
          ))}
          {isEvaluated && !isCorrect && (
            <View style={styles.answerContiner}>
              <Text style={styles.answerText}>
                {questions[currentQuestionIndex].answer}
              </Text>
              <Icon name="check" size={32} color="#3EB8D4" />
            </View>
          )}
        </View>
      )}
      <MySnackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={snackbarDuration}
        action={{
          label: "OK",
          onPress: () => setSnackbarVisible(false),
        }}
        message={snackbarMessage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  answerContiner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    padding: 8,
    backgroundColor: "#121212",
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#737373",
    marginTop: 14,
    width: "70%",
    alignSelf: "center",
  },
  topicText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
  },
  closeButton: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#737373",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginEnd: 8,
  },
  prgbrText: {
    color: "#fff",
    paddingTop: 5,
    fontWeight: "600",
  },
  answerText: {
    color: "#fff",
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "700",
  },
  progressBarContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#737373",
    height: 35,
    marginLeft: 8,
    padding: 14,
  },
  activeQuestion: {
    fontSize: 18,
    color: "#3EB8D4",
    fontWeight: "700",
  },
  quizCompletedContainer: {
    flex: 1,
    justifyContent: "center",
  },
  quizCompletedText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },
  questionsDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  scoreText: {
    color: "#fff",
    marginBottom: 20,
  },
});

export default QuizScreen;
