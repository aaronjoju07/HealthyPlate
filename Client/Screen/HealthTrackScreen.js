import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Modal, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { calculateTrackingType } from '../Service/calculateTrackingType';
import { calculateBMI } from '../Service/calculateBMI';
import DropdownComponent from '../Components/DropdownComponent';
import GenderDropdown from '../Components/GenderDropdown';
import calculateCalories from '../Service/calculateCalories';
import { useSelector } from 'react-redux';
import axios from 'axios'

const HealthTrackScreen = () => {

  const userdata = useSelector((state) => state.user.user);

  const [showModal, setShowModal] = useState(false);
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetedWeight, setTargetedWeight] = useState('');
  const [currentHeight, setCurrentHeight] = useState('');
  const [age, setAge] = useState('');
  const [dailyProgress, setDailyProgress] = useState(60);
  const [overallProgress, setOverallProgress] = useState(40);

  const [dataSet, setdataSet] = useState(false)
  const [selectedTrackingType, setSelectedTrackingType] = useState('');
  const [selectedTargetedWeight, setSelectedTargetedWeight] = useState('');
  const [weightDifference, setWeightDifference] = useState(0);
  const [bmiResult, setBmiResult] = useState(0);
  const [activityFactor, setactivityFactor] = useState('')
  const [Gender, setGender] = useState('')
  const [CalculatedCalories, setCalculatedCalories] = useState(0)

  const handleSetTarget = () => {
    if (
      currentWeight.trim() === '' ||
      targetedWeight.trim() === '' ||
      currentHeight.trim() === '' ||
      age.trim() === '' ||
      activityFactor.trim() == '' ||
      Gender.trim() == ''
    ) {
      alert('Please fill in all the fields');
      return;
    }
    const trackingType = calculateTrackingType(targetedWeight, currentWeight);
    setSelectedTrackingType(trackingType);
    setSelectedTargetedWeight(targetedWeight);
    setWeightDifference(targetedWeight - currentWeight);
    const bmi = calculateBMI(currentWeight, currentHeight);
    setBmiResult(bmi);
    const calculatedCalories = calculateCalories(currentWeight, currentHeight, age, Gender, activityFactor, trackingType)
    setCalculatedCalories(calculatedCalories)
    // console.log(userdata);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const healthTrackerData = {
      user_id: userdata._id,
      current_weight: currentWeight,
      targeted_weight: targetedWeight,
      current_height: currentHeight,
      active_factor: activityFactor,
      gender: Gender,
      tracking_type: trackingType,
      bmi_result: bmi,
      calculated_calories: calculatedCalories,
      daily_progression: [
        {
          date: formattedDate,
          progression: 0,
        }
      ],
      overall_progression: 0,
      weight_history: [
        {
          date: formattedDate,
          weight: currentWeight,
        }
      ],
    };
    axios.post(`http://localhost:5001/healthtracker`, healthTrackerData)
      .then(response => {
        console.log('Data posted successfully:', response.data);
        setdataSet(true)
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
    setShowModal(false);
  };

  const [showUpdateWeightModal, setShowUpdateWeightModal] = useState(false);

  // New state variable for updated current weight
  const [updatedCurrentWeight, setUpdatedCurrentWeight] = useState('');

  // Function to handle updating current weight and adding data to chart
  const handleUpdateWeight = () => {

    setShowUpdateWeightModal(false);
  };
  const handleGenderChange = (gender) => { setGender(gender) }
  const handelActivityChange = (activity) => { setactivityFactor(activity) }
  const getTrackerDataExist = () => {
    axios.get(`http://localhost:5001/healthtracker/${userdata._id}`)
      .then(response => {
        const healthTrackerExists = response.data !== null;

        if (healthTrackerExists) {
          const data = response.data
          console.log(data);
          setCalculatedCalories(data.calculated_calories)
          setCurrentWeight(data.current_weight)
          setCurrentHeight(data.current_height)
          setBmiResult(data.bmi_result)
          setGender(data.gender)
          setOverallProgress(data.overall_progression)
          setSelectedTrackingType(data.tracking_type)
          setSelectedTargetedWeight(data.targeted_weight)
          const weigDiff = parseFloat(data.current_weight) - parseFloat(data.targeted_weight)
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().split('T')[0];
          const todayDailyProgression = data.daily_progression.find(entry => {
            const entryDate = new Date(entry.date).toISOString().split('T')[0]; // Extract date part from the entry

            return entryDate === formattedDate;
          });
          setDailyProgress(todayDailyProgression.progression)
          setWeightDifference(weigDiff.toFixed(2))
          setdataSet(true)
        } else {
          console.log('HealthTracker does not exist for the user.');
        }
      })
      .catch(error => {
        console.error('Error checking HealthTracker existence:', error);
      });
  }
  useEffect(() => {
    getTrackerDataExist();
  }, [])



  return (
    <SafeAreaView style={styles.container}>
      {!dataSet && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setShowModal(true)} style={styles.setTargetButton}>
            <Text style={styles.buttonText}>Set Health Target</Text>
          </TouchableOpacity>
        </View>

      )}

      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontStyle: 'italic', paddingBottom: 15 }}>Set Health Target</Text>
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

            <DropdownComponent onActivityChange={handelActivityChange} />
            <GenderDropdown onGenderChange={handleGenderChange} />
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

      {dataSet && (
        <View>
          {/* Display the selected target information and results */}

          <View style={{padding:6,backgroundColor:'#eeeee4',margin:3,borderRadius:15}}>
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

            <View style={styles.trackerRow}>
              <View style={styles.trackerBox}>
                <Text style={styles.fieldText}>Gender: {Gender.toLocaleUpperCase()}</Text>
              </View>

              <View style={styles.trackerBox}>
                <Text style={styles.fieldText}>Daily targeted Calories: {CalculatedCalories}</Text>
              </View>
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
          {/* Button to update current weight */}
          {selectedTrackingType && (
            <View style={{ alignItems: 'center' }} >
              <TouchableOpacity onPress={() => setShowUpdateWeightModal(true)} style={[styles.setTargetButton, { width: '90%' }]}>
                <Text style={styles.buttonText}>Update Current Weight</Text>
              </TouchableOpacity>
            </View>

          )}

          {/* Update Weight Modal */}
          <Modal visible={showUpdateWeightModal} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontStyle: 'italic' }}>Update Current Weight</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Current Weight (kg)"
                    value={updatedCurrentWeight}
                    onChangeText={text => setUpdatedCurrentWeight(text)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ backgroundColor: 'rgba(255, 199, 0, 0.97)', borderRadius: 14, }}>
                  <Button title="Update Weight" color='white' onPress={handleUpdateWeight} />
                </View>
              </View>
            </View>
          </Modal>
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
    width: '75%',
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
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,

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
    textAlign: 'center',
    // padding:5
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