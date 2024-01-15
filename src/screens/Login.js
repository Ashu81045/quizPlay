import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
//import { auth } from '../../firebase';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirm, setConfirm] = useState(null);

  const handleSendCode = async () => {
    try {
      const confirmation = await auth.signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleConfirmCode = async () => {
    try {
      await confirm.confirm(confirmationCode);
      console.log('Phone number confirmed!');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View>
      <Text>Phone Number:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />

      {confirm ? (
        <>
          <Text>Confirmation Code:</Text>
          <TextInput
            value={confirmationCode}
            onChangeText={(text) => setConfirmationCode(text)}
          />
          <Button title="Confirm Code" onPress={handleConfirmCode} />
        </>
      ) : (
        <Button title="Send Code" onPress={handleSendCode} />
      )}
    </View>
  );
};

export default Login;
