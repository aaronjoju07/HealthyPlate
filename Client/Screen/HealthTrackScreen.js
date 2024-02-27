import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Modal, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const HealthTrackScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetedWeight, setTargetedWeight] = useState('');
  const [currentHeight, setCurrentHeight] = useState('');
  const [age, setAge] = useState('');
  const [dailyProgress, setDailyProgress] = useState(60);
  const [overallProgress, setOverallProgress] = useState(40);

  // New state variables for selected target information
  const [selectedTrackingType, setSelectedTrackingType] = useState('');
  const [selectedTargetedWeight, setSelectedTargetedWeight] = useState('');
  const [weightDifference, setWeightDifference] = useState(0);
  const [bmiResult, setBmiResult] = useState(0);

  const handleSetTarget = () => {
    // Determine tracking type based on the relationship between targeted and current weight
    const trackingType = targetedWeight < currentWeight ? 'Weight Loss' : 'Weight Gain';
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
    const roundedBMI = bmi.toFixed(2);
      // Determine the BMI category
      let category;
      if (bmi < 18.5) {
          category = 'Underweight';
      } else if (bmi < 25) {
          category = 'Normal weight';
      } else if (bmi < 30) {
          category = 'Overweight';
      } else if (bmi < 35) {
          category = 'Obesity I';
      } else if (bmi < 40) {
          category = 'Obesity II';
      } else {
          category = 'Obesity III';
      }
      return category;
  };

  return (
    <SafeAreaView style={styles.container}>
      {!selectedTrackingType && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setShowModal(true)} style={styles.setTargetButton}>
            <Text style={styles.buttonText}>Set Health Target</Text>
          </TouchableOpacity>
        </View>

      )}

      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontStyle: 'italic' }}>Set Health Target</Text>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Current Weight (kg)"
                value={currentWeight}
                onChangeText={text => setCurrentWeight(text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Targeted Weight (kg)"
                value={targetedWeight}
                onChangeText={text => setTargetedWeight(text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Current Height (cm)"
                value={currentHeight}
                onChangeText={text => setCurrentHeight(text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Age"
                value={age}
                onChangeText={text => setAge(text)}
                keyboardType="numeric"
              />
            </View>
            <View style={{ backgroundColor: 'rgba(255, 199, 0, 0.97)', borderRadius: 14, }}>
              <Button title="Set Target" color='white' onPress={handleSetTarget} />
            </View>
          </View>
        </View>
      </Modal>

      {selectedTrackingType && (
        <View>
          {/* Display the selected target information and results */}
          <View style={styles.trackerRow}>
            <View style={styles.trackerBox}>
              <Text style={styles.fieldText}>Selected Tracking Type: {selectedTrackingType}</Text>
            </View>

            <View style={styles.trackerBox}>
              <Text style={styles.fieldText}>Targeted Weight: {selectedTargetedWeight} kg</Text>
            </View>
          </View>

          <View style={styles.trackerRow}>
            <View style={styles.trackerBox}>
              <Text style={styles.fieldText}>Weight Difference: {weightDifference} kg</Text>
            </View>

            <View style={styles.trackerBox}>
              <Text style={styles.fieldText}>BMI Result: {bmiResult}</Text>
            </View>
          </View>


          {/* Progress bars */}
          <View style={styles.progressContainer}>
            <Text>Daily Tracking Progress {dailyProgress}%</Text>
            <View style={styles.progressBar}>
              <View style={{ width: `${dailyProgress}%`, height: 20, backgroundColor: 'rgba(255, 199, 7, 10)' }} />
            </View>

            <Text>Overall Tracking Progress {overallProgress}%</Text>
            <View style={styles.progressBar}>
              <View style={{ width: `${overallProgress}%`, height: 20, backgroundColor: 'rgba(255, 199, 7, 10)' }} />
            </View>
          </View>

          {/* Weight Progression Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Weight Progression Chart</Text>
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
              width={Dimensions.get("window").width - 5} // from react-native
              height={220}
              yAxisLabel="kg"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: 'rgba(255, 199, 7, 6)',
                backgroundGradientFrom: 'rgba(255, 131, 0, 0.1)',
                backgroundGradientTo: 'rgba(255, 189, 0, 0.1)',
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 199, 0, ${opacity})`, // Set the color to rgba(255, 199, 0, 1)
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 14,
                },
                propsForDots: {
                  r: "5",
                  strokeWidth: "2",
                  stroke: "white"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />

          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1
  },
  setTargetButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 199, 0, 0.97)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '75%'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  inputBox: {
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,

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
    width: '90%',
    textAlign: 'center'
  },
  progressContainer: {
    marginTop: 20,
  },
  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255, 199, 7, .36)',
    borderRadius: 10, // Set borderRadius to half of the height
    marginTop: 10,
    overflow: 'hidden',
    margin: 5,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  chartTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontStyle: 'italic',

  },
  fieldText: {
    fontSize: 14,
    marginBottom: 5,
  },
  trackerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 3
  },
  trackerBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 199, 0, 0.35)', // Set an appropriate background color
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 10,
    height: '80%'
  },
});

export default HealthTrackScreen;