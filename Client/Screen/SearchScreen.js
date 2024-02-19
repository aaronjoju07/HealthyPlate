import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from "react-native-feather";
import RestaurantSearchCard from '../Components/RestaurantSearchCard';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const cityName = "YourCity";
  const categories = ["Category1", "Category2", "Category3", "Category4", "Category5", "Category6", "Category7", "Category8", "Category9"];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (query) => {
    // Implement your search logic and update searchResults state
    // const filteredResults = yourSearchFunction(query);
    // setSearchResults(filteredResults);
  };

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
    // Add more restaurants as needed
  ];

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    // Additional logic if needed when a category is selected
  };

  const renderResultItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 5,backgroundColor:'#fff' }}>
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
      <ScrollView style={{ flex: 4, marginTop: -5 }} showsVerticalScrollIndicator={false}>
        {restaurantList.map((restaurant, index) => (
          <TouchableOpacity key={index}>
            <RestaurantSearchCard
              key={index}
              name={restaurant.name}
              location={restaurant.location}
              rating={restaurant.rating}
              price={restaurant.price}
              imageSource={restaurant.imageSource}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
