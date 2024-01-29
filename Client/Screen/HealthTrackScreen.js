import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Modal, TextInput, Button, StyleSheet } from 'react-native';

const HealthTrackScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [trackingType, setTrackingType] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetedWeight, setTargetedWeight] = useState('');
  const [currentHeight, setCurrentHeight] = useState('');
  const [age, setAge] = useState('');
  const [dailyProgress, setDailyProgress] = useState(90);
  const [overallProgress, setOverallProgress] = useState(10);

  const handleSetTarget = () => {
    // Calculate daily and overall progress based on user inputs
    const dailyTarget = calculateDailyTarget(currentWeight, targetedWeight);
    setDailyProgress(dailyTarget);

    const overallTarget = calculateOverallTarget(currentWeight, targetedWeight, currentHeight, age);
    setOverallProgress(overallTarget);

    setShowModal(false);
  };

  const calculateDailyTarget = (currentWeight, targetedWeight) => {
    // Calculate daily target based on user preferences (weight gain or weight loss)
    const weightDifference = targetedWeight - currentWeight;
    const dailyTarget = weightDifference > 0 ? weightDifference / 30 : 0; // Assuming a 30-day target
    return dailyTarget;
  };

  const calculateOverallTarget = (currentWeight, targetedWeight, currentHeight, age) => {
    // Calculate overall target based on user preferences and additional factors
    // You can customize this calculation based on specific health tracking goals and metrics
    const weightDifference = targetedWeight - currentWeight;
    const heightFactor = currentHeight / 100; // Convert height to meters
    const ageFactor = age / 100; // Age factor (adjust as needed)

    const overallTarget = weightDifference * heightFactor * ageFactor;
    return overallTarget;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>HealthTrackScreen</Text>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text>Set Health Target</Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Set Health Target</Text>
            <TextInput
              placeholder="Tracking Type (e.g., weight gain, weight loss)"
              value={trackingType}
              onChangeText={text => setTrackingType(text)}
            />
            <TextInput
              placeholder="Current Weight (kg)"
              value={currentWeight}
              onChangeText={text => setCurrentWeight(text)}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Targeted Weight (kg)"
              value={targetedWeight}
              onChangeText={text => setTargetedWeight(text)}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Current Height (cm)"
              value={currentHeight}
              onChangeText={text => setCurrentHeight(text)}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Age"
              value={age}
              onChangeText={text => setAge(text)}
              keyboardType="numeric"
            />
            <Button title="Set Target" onPress={handleSetTarget} />
          </View>
        </View>
      </Modal>

      <View style={styles.progressContainer}>
        <Text>Daily Tracking Progress {dailyProgress}%</Text>
        <View style={styles.progressBar}>
          <View style={{ width: `${dailyProgress}%`, height: 20, backgroundColor: 'green' }} />
        </View>

        <Text>Overall Tracking Progress {overallProgress}%</Text>
        <View style={styles.progressBar}>
          <View style={{ width: `${overallProgress}%`, height: 20, backgroundColor: 'blue' }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  progressContainer: {
    marginTop: 20,
  },
  progressBar: {
    width: '80%',
    height: 20,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
  },
});

export default HealthTrackScreen;
