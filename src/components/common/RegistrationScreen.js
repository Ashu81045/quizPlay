import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native";
import {
  Card,
  TextInput,
  Button,
  IconButton,
  Colors,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { setProfileImage, updateUser } from "../../redux/reducers/quizReducer";
import * as ImagePicker from 'expo-image-picker';
import MySnackbar from "../common/SnackBar";

const RegistrationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  console.log(selectedImage, "selectedImage");

  const handleImageSelect = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
        dispatch(setProfileImage(result.assets[0].uri)); // Dispatch action to store image URI in Redux
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleSave = () => {

    const user = {
      name: name,
      class: selectedClass,
      email: email
    };

    console.log('setSelectedClass', selectedClass)
    if(!name || name.length < 3 || !selectedClass){
      setSnackbarVisible(true);
      setSnackbarMessage("Please fill the mandatory field");

    }else if(selectedClass > 12 ){
      setSnackbarVisible(true);
      setSnackbarMessage("Allowed upto 12 class only");
      return;

    }
    else {
      dispatch(updateUser(user));
      navigation.navigate("Home");
    }
    
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <Text style={styles.greetText}>Help me to get your details!</Text>
       <Text style={styles.greetSubText}>Just this time only, please!</Text>
      <Card style={styles.card}>
       
        <Card.Content style={styles.cardContent}>
        <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handleImageSelect}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.profileImage}
                />
              ) : (
                <IconButton icon="camera" color={Colors.grey500} size={30} style={styles.iconStyle} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <IconButton icon="account" color={Colors.grey500} size={20} />
              <TextInput
                label="Name*"
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
              />
            </View>
            <View style={styles.inputRow}>
              <IconButton
                icon="format-title"
                color={Colors.grey500}
                size={20}
              />
              <TextInput
                label="Class*"
                value={selectedClass}
                onChangeText={(text) => setSelectedClass(text)}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputRow}>
              <IconButton icon="email" color={Colors.grey500} size={20} />
              <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                keyboardType="email-address"
              />
            </View>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="outlined"
            color={Colors.teal500}
            style={styles.saveButton}
            onPress={handleSave}
          >
            Save
          </Button>
        </Card.Actions>
      </Card>
      <MySnackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
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
    flexGrow: 1,
    padding:16,
    backgroundColor: '#f0f0f0',
  },
  greetText:{
    fontSize:24,
    textAlign:'center',
    padding:14
  },
  greetSubText:{
    fontSize:16,
    color:"teal",
    textAlign:'center',
    paddingBottom:16
  },
  iconStyle:{
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor:'teal'
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'column', // Change to column
    alignItems: 'center', // Center items vertically
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Adjust as needed
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor:'teal'
  },
  inputContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    width:'100%'
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height:60,
    padding:4
  },
  saveButton: {
    borderWidth: 1,
    borderColor: Colors.teal500,
    borderRadius: 8,
    marginTop: 16,
    width: '40%', // Set button width to 100%
    marginRight:'10%',
    marginLeft:'50%'
  },
});

export default RegistrationScreen;
