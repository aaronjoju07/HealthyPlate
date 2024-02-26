import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from "react-native-feather";
import RestaurantSearchCard from '../Components/RestaurantSearchCard';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  // State for categories
  const categories = ["Category1", "Category2", "Category3", "Category4", "Category5", "Category6", "Category7", "Category8", "Category9"];
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State for restaurant data
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurant data
  const getRestaurantData = () => {
    axios.get('http://localhost:5001/getAllRestaurants').then((res) => {
      setRestaurants(res.data.data)
    })
  }

  useEffect(() => {
    getRestaurantData();
  }, []);

  // Handle search input
  const handleSearch = (query) => {
    const filteredResults = restaurants.filter((restaurant) => {
      const nameMatch = restaurant.restaurantName.toLowerCase().includes(query.toLowerCase());
      const addressMatch = restaurant.address.toLowerCase().includes(query.toLowerCase());
      return nameMatch || addressMatch;
    });

    setSearchResults(filteredResults);
  };

  // Handle category press
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    // Additional logic if needed when a category is selected
  };
  const goToResturant = (restaurant) => {
    navigation.navigate('RestaurantScreen', { restaurant });
  }
  return (
    <SafeAreaView style={{ flex: 1, padding: 5, backgroundColor: '#fff' }}>
      {/* Search Component */}
      <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity style={{ marginRight: 10 }}>
          {/* <Icon.Search height="20" width="20" stroke="gray" /> */}
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderColor: 'rgba(255, 199, 0, 1)',
            borderWidth: 1.1,
            borderRadius: 20,
            paddingLeft: 20,
          }}
          placeholder="Search..."
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text);
          }}
          value={searchQuery}
        />
        <TouchableOpacity>
          <View style={{ marginLeft: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text><Icon.MapPin height="25" width="25" stroke="rgba(255, 199, 0, 1)" /></Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Category Component */}
      <View style={{ flex: 0.1, flexDirection: 'row', marginBottom: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: selectedCategory === category ? 'rgba(255, 199, 0, 1)' : 'rgba(255, 199, 0, 0.35)',
                paddingHorizontal: 15,
                paddingVertical: 8,
                height: 35,
                borderRadius: 20,
                marginRight: 5,
              }}
              onPress={() => handleCategoryPress(category)}
            >
              <Text>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Restaurant Cards */}
      {searchQuery.length>0? 
      
      <ScrollView style={{ flex: 4, marginTop: -5 }} showsVerticalScrollIndicator={false}>
        {searchResults.map((restaurant, index) => (
          <TouchableOpacity key={index} onPress={() => goToResturant(restaurant)}>
            <RestaurantSearchCard
              key={index}
              name={restaurant.restaurantName}
              location={restaurant.address}
              rating={restaurant.overallRating}
              imageSource={restaurant.imageAddress}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      : <ScrollView style={{ flex: 4, marginTop: -5 }} showsVerticalScrollIndicator={false}>
      {restaurants.map((restaurant, index) => (
        <TouchableOpacity key={index} onPress={() => goToResturant(restaurant)}>
          <RestaurantSearchCard
            key={index}
            name={restaurant.restaurantName}
            location={restaurant.address}
            rating={restaurant.overallRating}
            imageSource={restaurant.imageAddress}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>}
      

    </SafeAreaView>
  );
};

export default SearchScreen;
