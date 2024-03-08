import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Icon from 'react-native-feather'; // Import feather icons
import CustomCarousel from '../Components/CustomCarousel';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RestaurantCard from '../Components/RestaurantCard';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutTracker from '../Components/WorkoutTracker';
import { StatusBar } from 'expo-status-bar';
import { getUser, setUser } from '../reducer/User/userSlice';

// carousel for restaurant 
const carouselData = [
  { image: require('../assets/images/carousel3.png') },
  { image: require('../assets/images/carousel1.jpg') },
];
const { width, height } = Dimensions.get("window");


const HomeScreen = () => {
  const navigation = useNavigation();
  const [UserData, setUserData] = useState([])
  const dispatch = useDispatch()
  
  
  const [Resturants, setResturants] = useState([])
  const getUserData = async () => {
    const token = await AsyncStorage.getItem('token')
    axios.post('http://localhost:5001/logined-in-user', { token: token }).then((res) => {
      setUserData(res.data.data)
      dispatch(setUser(res.data.data));
    })
  }
// Resturant Data  Fetching
  const getResturantData = () => {
    axios.get('http://localhost:5001/getAllRestaurants').then((res) => {
      setResturants(res.data.data)
    })
  }
  useEffect(() => {
    getUserData()
    getResturantData()
  }, [])
// Redux-User  state is used to check if the user has logged
  // const user = useSelector((state) => state.user.user);
  const goToResturant = (restaurant) => {
    navigation.navigate('RestaurantScreen', { restaurant });
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='rgba(255, 199, 0, 0.25' />
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} >
        <CustomCarousel data={carouselData} />

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            It’s Healthy Snack time!!
          </Text>
        </View>


        {Resturants ? <ScrollView style={[styles.restaurantScrollView]} showsHorizontalScrollIndicator={false} horizontal >
          {Resturants.map((restaurant, index) => (
            <TouchableOpacity key={index} onPress={() => goToResturant(restaurant)}>
              <RestaurantCard key={index} restaurant={restaurant} />
            </TouchableOpacity>
          ))}
        </ScrollView> : null}


        <View style={styles.lineChartContainer}>
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
    backgroundColor: '#fff',
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
    backgroundColor: 'white', // Add a background color
    elevation: 5, // Adjust the elevation as needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
    backgroundColor: 'rgba(255, 199, 0, 0.25)',
    marginBottom: 6,
    margin: 9,
    borderRadius: 13,
  },
  likeIcon: {
    marginLeft: 10,
  },
});

export default HomeScreen;
