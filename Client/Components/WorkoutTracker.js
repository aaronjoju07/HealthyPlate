import { faRunning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WorkoutTracker = () => {
  const navigation = useNavigation();
  const goTrack = () => {
navigation.navigate('HealthTrack')
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goTrack()}>
        <View style={styles.bottomContainer}>
          <View style={styles.trackerContainer}>
            <Text style={styles.trackerText}>Track your workout</Text>

            {/* Blue circle around running icon */}
            <View style={styles.iconContainer}>
              <FontAwesomeIcon icon={faRunning} color='#fff' size={20} style={styles.runningIcon} />
            </View>

            <Text style={styles.trackerValue}>Burn at least 454 Cal</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 15,
    // borderRadius: 15,
    overflow: 'hidden',
  },
  bottomContainer: {
    flex: 2,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  trackerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  trackerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  trackerValue: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  iconContainer: {
    backgroundColor: '#79b6c9',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  runningIcon: {

  },
});

export default WorkoutTracker;
