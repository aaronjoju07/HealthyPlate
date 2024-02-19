// RestaurantCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RestaurantCard = ({ restaurant }) => {
  return (
    <View style={styles.restaurantCard}>
      {/* <Image style={styles.restaurantImage} source={require(restaurant.image)} /> */}
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text style={styles.restaurantLocation}>{restaurant.location}</Text>
      <Text style={styles.restaurantRating}>Rating: {restaurant.rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    width: 240, 
    height: 250, 
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3, 
    shadowRadius: 4.65,
    elevation: 6,
    marginRight: 3,
    margin: 7,
  },
  restaurantImage: {
    width: '100%',
    height: 160, 
    resizeMode: 'cover',
    padding: 1,
    borderRadius: 10,

  },
  restaurantName: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginTop: 8, 
  },
  restaurantLocation: {
    fontSize: 14,
    color: 'gray',
  },
  restaurantRating: {
    fontSize: 14,
    color: 'green',
    marginBottom: 8, 
  },
});

export default RestaurantCard;
