// SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Profile />
      {/* Add more settings options/components as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 199, 0, 0.35)',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Add more styles as needed
});

export default SettingsScreen;
