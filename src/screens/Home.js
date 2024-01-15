import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar } from "react-native-paper";
import Maths from "../Assets/maths.png";
import Chemistry from "../Assets/chemistry.png";
import Biology from "../Assets/biology.png";
import Geography from "../Assets/geography.png";
import Sports from "../Assets/sports.png";
import Gk from "../Assets/gk.png";
import History from "../Assets/history.png";
import English from "../Assets/english.png";
import Random from "../Assets/random.png";
import GeneralScience from "../Assets/science.png";
import { getLevelInfo } from "../utility/util";

const HomeScreen = ({ navigation }) => {
  const categories = [
    "Random",
    "Maths",
    "Chemistry",
    "Biology",
    "Geography",
    "Sports",
    "GK",
    "History",
    "English",
    "Science",
  ];
  const earnedPoints = useSelector((state) => state.quiz.earnedPoints);
  const user = useSelector((state) => state.quiz.user);
  const profileImage = useSelector((state) => state.quiz.profileImage);
  console.log("user->", user,
  "profileImage",profileImage);
  const { level } = getLevelInfo(earnedPoints);
  const userInfo = user.length && user[0];
  const { name } = userInfo;

  const handleCategorySelection = (category) => {
    navigation.navigate("Quiz", { category });
  };
  const categoryImages = {
    Random,
    Maths,
    Chemistry,
    Biology,
    Geography,
    Sports,
    GK: Gk, // Assuming Gk is the correct category name
    History,
    English,
    Science: GeneralScience,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Greeting and Profile Icon */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello { name || 'there'}</Text>
        {profileImage?(
        <Image
          source={{uri: profileImage}}
          style={styles.avatar}
        />):(
          <Avatar.Image
            size={60}
            source={require("../Assets/boy.png")}
            color="white"
            style={styles.avatar}
        />
        )
        }
      </View>

      {/* Champion Box */}
      <View style={styles.championBox}>
        <View style={styles.trophyContainer}>
          <Image
            source={require("../Assets/trophy.png")}
            style={styles.trophyImage}
          />
          <View style={styles.trophyText}>
            <Text style={styles.textStyleTrophy}>{level}</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.coinContainer}>
          <Image
            source={require("../Assets/coin.png")}
            style={styles.coinImage}
          />
          <View style={styles.trophyText}>
            <Text style={styles.textStyleTrophy}>{earnedPoints}</Text>
          </View>
        </View>
      </View>

      {/* Categories */}
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryTile, index % 2 !== 0 && styles.zigzagTile]}
            onPress={() => handleCategorySelection(category)}
          >
            <View style={styles.categoryImageContainer}>
              <Image
                source={categoryImages[category]}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  greeting: {
    color: "white",
    fontSize: 24,
  },
  avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
  },
  championBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    color: "white",
    backgroundColor: "#323232",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
  },
  trophyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  trophyImage: {
    marginRight: 8,
    height: 50,
    width: 50,
  },
  trophyText: {
    flexDirection: "column",
  },
  textStyleTrophy: {
    color: "#fff",
    fontSize: 18,
  },
  divider: {
    borderRightWidth: 1,
    borderColor: "white",
    height: "100%",
    marginHorizontal: 1,
    color: "#fff",
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinImage: {
    marginRight: 8,
    height: 50,
    width: 50,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 40, // Add margin at the top for spacing
  },
  categoryTile: {
    width: "48%",
    height: 80, // Set a fixed height for the tiles
    backgroundColor: "#323232",
    borderRadius: 16,
    marginVertical: 8,
    padding: 16,
    borderWidth: 2, // Add border to create a highlighted box effect
    borderColor: "#3EB8D4", // Choose a color for the border
  },
  zigzagTile: {
    marginTop: 20,
  },
  categoryImageContainer: {
    position: "absolute",
    top: -20,
    alignItems: "center",
  },
  categoryImage: {
    width: 75,
    height: 75,
  },
  categoryText: {
    color: "white",
    fontSize: 18,
    textAlign: "right",
    marginTop: 16,
  },
});

export default HomeScreen;
