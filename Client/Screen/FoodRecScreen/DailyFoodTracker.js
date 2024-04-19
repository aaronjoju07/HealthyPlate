import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const DailyFoodTracker = ({route}) => {
  const { foodList } = route.params;
  const [userIntake, setUserIntake] = useState({});
  const [deficiencies, setDeficiencies] = useState({});
  const [foodRecommendations, setFoodRecommendations] = useState({});

  useEffect(() => {
    axios.post('http://127.0.0.1:8001/recommend', {
      user_daily_log: foodList
    })
      .then(response => {
        const { user_intake, deficiencies, food_recommendations } = response.data;
        setUserIntake(user_intake);
        setDeficiencies(deficiencies);
        setFoodRecommendations(food_recommendations);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Daily Food Tracker</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Intake</Text>
          <Text style={styles.infoText}>Food Items: {userIntake.Food_items}</Text>
          <Text style={styles.infoText}>Calories: {userIntake.Calories}</Text>
          <Text style={styles.infoText}>Carbohydrates: {userIntake.Carbohydrates}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deficiencies</Text>
          {Object.keys(deficiencies).map(deficiency => (
            <Text key={deficiency} style={styles.infoText}>{deficiency}: {deficiencies[deficiency]}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Recommendations</Text>
          {Object.keys(foodRecommendations).map(deficiency => (
            <View key={deficiency}>
              <Text style={styles.subTitle}>{deficiency}</Text>
              {foodRecommendations[deficiency].map(item => (
                <Text key={item.Food_items} style={styles.infoText}>{item.Food_items}: {item[deficiency]}</Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Adjust the background color
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: 'rgba(255, 199, 0, 0.97)',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white', // Adjust the background color
    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'rgba(255, 199, 0, 0.97)',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'rgba(255, 199, 0, 0.97)',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 12,
    color: 'black',
  },
});

export default DailyFoodTracker;
