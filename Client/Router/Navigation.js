import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../Screen/Login';
import Splash from '../Screen/Splash';
import TabNavigation from './TabNavigation';
import Favorates from '../Screen/Favorates';
import RestaurantScreen from '../Screen/Resturant/ResturantScreen';
import Menu from '../Screen/Resturant/Menu';
import OrderScreen from '../Screen/OrderScreen';
import Registration from '../Screen/Registration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartScreen from '../Screen/Resturant/Cart/CartScreen';
import DailyFoodTracker from '../Screen/FoodRecScreen/DailyFoodTracker';
import EnterFoodDetails from '../Screen/FoodRecScreen/EnterFoodDetails';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking a token in AsyncStorage
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('isLogin');
        if (userToken) {
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isUserLoggedIn ? (
          // Routes after login
          <>
            <Stack.Screen name="TabNavigation" component={TabNavigation} />
            <Stack.Screen name="Favorates" component={Favorates} />
            <Stack.Screen name="Menu" options={{ presentation: 'modal' }} component={Menu} />
            <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="DailyFoodTracker" options={{ presentation: 'modal' }} component={DailyFoodTracker} />
            <Stack.Screen name="Order" options={{ presentation: 'modal' }} component={OrderScreen} />
            <Stack.Screen name="EnterFoodDetais" component={EnterFoodDetails} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          // Routes before login
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="TabNavigation" component={TabNavigation} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
