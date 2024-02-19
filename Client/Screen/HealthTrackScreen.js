import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Modal, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const HealthTrackScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetedWeight, setTargetedWeight] = useState('');
  const [currentHeight, setCurrentHeight] = useState('');
  const [age, setAge] = useState('');
  const [dailyProgress, setDailyProgress] = useState(90);
  const [overallProgress, setOverallProgress] = useState(10);

  // New state variables for selected target information
  const [selectedTrackingType, setSelectedTrackingType] = useState('');
  const [selectedTargetedWeight, setSelectedTargetedWeight] = useState('');
  const [weightDifference, setWeightDifference] = useState(0);
  const [bmiResult, setBmiResult] = useState(0);

  const handleSetTarget = () => {
    // Determine tracking type based on the relationship between targeted and current weight
    const trackingType = targetedWeight < currentWeight ? 'Weight Loss' : 'Weight Gain';

    // Calculate daily and overall progress based on user inputs
    setDailyProgress(100);
    setOverallProgress(10);

    // Update the selected target information
    setSelectedTrackingType(trackingType);
    setSelectedTargetedWeight(targetedWeight);
    setWeightDifference(targetedWeight - currentWeight);

    // Calculate BMI and update the state
    const bmi = calculateBMI(currentWeight, currentHeight);
    setBmiResult(bmi);

    setShowModal(false);
  };

  const calculateBMI = (weight, height) => {
    // Calculate BMI using weight (in kg) and height (in cm)
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text>Set Health Target</Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Set Health Target</Text>
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

      {/* Display the selected target information and results */}
      {selectedTrackingType !== '' && (
        <View style={styles.resultContainer}>
          <Text>Selected Tracking Type: {selectedTrackingType}</Text>
          <Text>Targeted Weight: {selectedTargetedWeight} kg</Text>
          <Text>Weight Difference: {weightDifference} kg</Text>
          <Text>BMI Result: {bmiResult}</Text>
        </View>
      )}

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

     

      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text >Weight Progression Chart</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="kg"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
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
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightyellow',
    borderRadius: 10,
  },
});

export default HealthTrackScreen;
