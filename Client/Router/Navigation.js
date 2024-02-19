import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../Screen/Login'
import Splash from '../Screen/Splash'
import TabNavigation from './TabNavigation';
import Favorates from '../Screen/Favorates';
import ProfileScreen from '../Screen/ProfileScreen';
import RestaurantScreen from '../Screen/Resturant/ResturantScreen';
import Menu from '../Screen/Resturant/Menu';
import OrderScreen from '../Screen/OrderScreen';

const Navigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="TabNavigation" component={TabNavigation} />
                <Stack.Screen name="Favorates"  component={Favorates} />
                {/* <Stack.Screen name="Profile"  component={ProfileScreen} /> */}
                <Stack.Screen name="Menu" options={{presentation:'modal',}} component={Menu} />
                <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
                <Stack.Screen name="Order" options={{presentation:'modal',}} component={OrderScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation