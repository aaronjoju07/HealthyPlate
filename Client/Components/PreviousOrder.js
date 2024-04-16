import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import OrderItem from './OrderItem';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PreviousOrder = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            {/* <Image
              style={styles.image}
              source={require('../assets/restaurant.jpg')}
            /> */}
            <View style={styles.textContainer}>
              <Text style={styles.canteenName}>Restaurant Name</Text>
              <Text style={styles.canteenLoc}>location</Text>
            </View>
          </View>
          <Text style={styles.price}>₹ 899</Text>
        </View>
      </View>
      <OrderItem />
      <View style={styles.statusContainer}>
        <View style={styles.status}>
          <Text style={styles.statusText}>status</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    width: screenWidth * 0.9,
    marginVertical: screenWidth * 0.02,
  },
  content: {
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    width: screenHeight * 0.1,
    height: screenHeight * 0.1,
    borderRadius: 5,
  },
  textContainer: {
    flexDirection: 'column',
    paddingHorizontal: 2,
  },
  canteenName: {
    fontSize: 18,
    fontWeight: '600',
  },
  canteenLoc: {
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    color: '#065f46',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#064e3b',
    borderRadius: 5,
  },
  statusText: {
    color: '#fff',
  },
});

export default PreviousOrder;











