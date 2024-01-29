import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Icon from 'react-native-feather'; // Import feather icons
import CustomCarousel from '../Components/CustomCarousel';


import RestaurantCard from '../Components/RestaurantCard';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutTracker from '../Components/WorkoutTracker';
import { StatusBar } from 'expo-status-bar';

// Sample data for carousel and restaurant cards
const carouselData = [
  { image: require('../assets/images/carousel1.jpeg') },
  { image: require('../assets/images/carousel2.jpeg') },
  { image: require('../assets/images/carousel3.jpeg') },
];
const { width, height } = Dimensions.get("window");
const restaurantsData = [
  { image: require('../assets/images/restaurant1.jpeg'), name: 'Restaurant 1', location: 'Location 1', rating: 4.5 },
  { image: require('../assets/images/restaurant1.jpeg'), name: 'Restaurant 2', location: 'Location 2', rating: 4.2 },
  { image: require('../assets/images/restaurant1.jpeg'), name: 'Restaurant 1', location: 'Location 1', rating: 4.5 },
  { image: require('../assets/images/restaurant1.jpeg'), name: 'Restaurant 2', location: 'Location 2', rating: 4.2 },
  { image: require('../assets/images/restaurant1.jpeg'), name: 'Restaurant 1', location: 'Location 1', rating: 4.5 },
  { image: require('../assets/images/restaurant1.jpeg'), name: 'Restaurant 2', location: 'Location 2', rating: 4.2 },
  { image: require('../assets/images/restaurant1.jpeg'), name: 'Restaurant 1', location: 'Location 1', rating: 4.5 },
  { image: require('../assets/images/restaurant1.jpeg'), name: 'Restaurant 2', location: 'Location 2', rating: 4.2 },
  { image: require('../assets/images/restaurant1.jpeg'), name: 'Restaurant 1', location: 'Location 1', rating: 4.5 },
  { image: require('../assets/images/restaurant1.jpeg'), name: 'Restaurant 2', location: 'Location 2', rating: 4.2 },
  // Add more restaurant data as needed
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const goToResturant = ()=>{
    navigation.navigate('RestaurantScreen');
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='rgba(255, 199, 0, 0.25' />
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} >

        {/* Profile icon and profile-like symbol */}
        {/* <View style={styles.profileIconsContainer}>
          <TouchableOpacity>
            <Icon.Heart size={24} strokeWidth={1} onPress={() => navigation.navigate('Favorates')} color="black" style={styles.likeIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon.User size={24} color="black" style={{ margin: 3 }} onPress={() => navigation.navigate('Profile')} />
          </TouchableOpacity>
        </View> */}

        <CustomCarousel data={carouselData} />

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            It’s Healthy Snack time!!
          </Text>
        </View>


        <ScrollView style={[styles.restaurantScrollView]} showsHorizontalScrollIndicator={false} horizontal >
          {restaurantsData.map((restaurant, index) => (
            <TouchableOpacity key={index} onPress={()=>goToResturant()}>
              <RestaurantCard key={index} restaurant={restaurant} />
            </TouchableOpacity>
          ))}
        </ScrollView>
{/* <View style={styles.labelContainer}>
        <Text style={styles.label}>Trackers</Text>
</View> */}

        {/* Line charts */}
        <View style={styles.lineChartContainer}>
          {/* Line chart for complete goal progression */}
          {/* <LineCharts /> */}
          <View style={{ flex: 1, flexDirection: 'row', width: width }}>
            <WorkoutTracker />
            <WorkoutTracker />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: width
  },
  carouselContainer: {
    height: 200,
  },
  carouselItem: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headingContainer: {
    width: '60%', // Adjust the width as needed
    borderTopRightRadius: 20, // Round the bottom-left corner
    borderBottomRightRadius: 20, // Round the bottom-left corner
    backgroundColor: 'white', // Set the background color
    padding: 2,
    // backgroundColor:'rgba(255, 199, 0, 0.25)'
  },
  heading: {
    fontSize: 21,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 10,
    color: '#5B0000',
  },
  restaurantScrollView: {
    maxHeight: 600,
    marginTop: 10,
    width: width,
  },
  restaurantCard: {
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  restaurantImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  restaurantLocation: {
    fontSize: 14,
    color: 'gray',
  },
  restaurantRating: {
    fontSize: 14,
    color: 'green',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    fontStyle: 'italic',
    color: "#5B0000"
  },
  labelContainer: {
    width: '30%', // Adjust the width as needed
    borderTopRightRadius: 20, // Round the bottom-left corner
    borderBottomRightRadius: 20, // Round the bottom-left corner
    backgroundColor: 'white', // Set the background color
    // margin: 10,
    padding: 2,
  },
  lineChartContainer: {
    width: "100%",
    marginTop: 10,
    padding: 3,
  },
  profileIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor:'rgba(255, 199, 0, 0.25)',
    marginBottom:6,
    margin:9,
    borderRadius:13,
  },
  likeIcon: {
    marginLeft: 10,
  },
});

export default HomeScreen;
