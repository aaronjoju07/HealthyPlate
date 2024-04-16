import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import RestaurantSearchCard from '../Components/RestaurantSearchCard';
import { useNavigation } from '@react-navigation/native';
import PreviousOrder from '../Components/PreviousOrder';

const Favorates = () => {
  const navigation = useNavigation()
  const restaurantList = [
    { name: "Restaurant 1", location: "Location 1", rating: "4.5", price: "$20", imageSource: "https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" },
    { name: "Restaurant 2", location: "Location 2", rating: "4.0", price: "$25", imageSource: "https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" },
    { name: "Restaurant 1", location: "Location 1", rating: "4.5", price: "$20", imageSource: "https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" },
    { name: "Restaurant 2", location: "Location 2", rating: "4.0", price: "$25", imageSource: "https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" },
    { name: "Restaurant 1", location: "Location 1", rating: "4.5", price: "$20", imageSource: "https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" },
    { name: "Restaurant 2", location: "Location 2", rating: "4.0", price: "$25", imageSource: "https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" },
    { name: "Restaurant 1", location: "Location 1", rating: "4.5", price: "$20", imageSource: "https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" },
    { name: "Restaurant 2", location: "Location 2", rating: "4.0", price: "$25", imageSource: "https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" },
    { name: "Restaurant 1", location: "Location 1", rating: "4.5", price: "$20", imageSource: "https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" },
    { name: "Restaurant 2", location: "Location 2", rating: "4.0", price: "$25", imageSource: "https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" },

  ];
  const ResturantPress = () =>{
    navigation.navigate('RestaurantScreen');
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
      }}>
        <Text style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginBottom: 10,
          color: '#c51717',
        }}>
          My Favorates
        </Text>
      </View>
      <ScrollView style={{ marginTop: -5 }} showsVerticalScrollIndicator={false}>
        {restaurantList.map((restaurant, index) => (
          <TouchableOpacity key={index} onPress={()=>ResturantPress()}>
            <RestaurantSearchCard
              key={index}
              name={restaurant.name}
              location={restaurant.location}
              rating={restaurant.rating}
              price={restaurant.price}
              imageSource={restaurant.imageSource}
            />
            <PreviousOrder/>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Favorates