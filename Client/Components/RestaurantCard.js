// RestaurantCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RestaurantCard = ({ restaurant }) => {
  return (
    <View style={styles.restaurantCard}>
      <Image style={styles.restaurantImage} source={{ uri: restaurant.imageAddress }} />
      <View style={styles.cardDetails}>
        <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text>
        <Text style={styles.restaurantLocation}>{restaurant.address}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.restaurantRating}>Rating: {restaurant.overallRating}</Text>
        </View>
      </View>
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
    marginRight: 10,
    margin: 7,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  restaurantImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardDetails: {
    padding: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  restaurantLocation: {
    fontSize: 14,
    color: '#777',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  restaurantRating: {
    fontSize: 14,
    color: '#f8d12c',
    marginRight: 5,
  },
});

export default RestaurantCard;
