import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { View, Text, Image } from 'react-native';

const RestaurantSearchCard = ({ name, location, rating, price, imageSource }) => (
  <View style={{ backgroundColor: 'white', padding: 10, marginBottom: 10, borderRadius: 10 }}>
    <Image source={{ uri: imageSource }} style={{ width: '100%', height: 150, borderRadius: 8 }} />
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
      <View>
        <Text style={{ fontWeight: 'bold' }}>{name}</Text>
        <Text>{location}</Text>
      </View>
      <View style={{ backgroundColor: 'green', padding: 5, borderRadius: 5,justifyContent:'center',alignItems:'center' }}>
        <Text style={{ color: 'white' }}>{rating} <FontAwesomeIcon icon={faStar} color='white' size={12} /></Text>
      </View>
    </View>
    <View style={{ borderWidth:1,borderColor: 'orange', padding: 5, borderRadius: 5, marginTop: 5,justifyContent:'center',alignItems:'center'}}>
      <Text style={{ color: 'black' }}>Avg Price: {price}</Text>
    </View>
  </View>
);

export default RestaurantSearchCard;
