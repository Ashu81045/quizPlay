import React from 'react';
import { View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

const MySnackbar = ({ visible, onDismiss, duration, action, message }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      action={action}
      style={{
        position: 'absolute',
        bottom: 0,
        width: '50%',
        marginLeft: '25%', // Center the Snackbar horizontally
        backgroundColor: '#3EB8D4', // Customize the background color
        borderRadius: 10, // Add rounded corners
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: '#fff', marginRight: 8 }}>{message}</Text>
      </View>
    </Snackbar>
  );
};

export default MySnackbar;
