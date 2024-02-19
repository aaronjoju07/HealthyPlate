import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as Icon from 'react-native-feather';

import HomeScreen from '../Screen/HomeScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import SearchScreen from '../Screen/SearchScreen';
import HealthTrackScreen from '../Screen/HealthTrackScreen';
import OrderScreen from '../Screen/OrderScreen';
import Favorates from '../Screen/Favorates';

const TabNavigation = () => {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: wp('15%'),
                    elevation: 1,
                    backgroundColor: 'rgba(255, 199, 0, 0.35)',
                    padding: 2
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                            style={{
                                width:50,
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: focused
                                    ? 'rgba(255, 199, 0, 1)'
                                    : 'transparent',
                                    borderRadius: 60,
                            }}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <View>
                                <Icon.Home stroke={focused ? '#2A4834' : '#000'} />
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                        style={{
                            width:50,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: focused
                                ? 'rgba(255, 199, 0, 1)'
                                : 'transparent',
                                borderRadius: 60,
                        }}
                            onPress={() => navigation.navigate('Search')}
                        >
                            <View>
                                <Icon.Search style={{ padding: 3 }} stroke={focused ? '#2A4834' : '#000'} />
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen
                name="HealthTrack"
                component={HealthTrackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                        style={{
                            width:50,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: focused
                                ? 'rgba(255, 199, 0, 1)'
                                : 'transparent',
                                borderRadius: 60,
                        }}
                            onPress={() => navigation.navigate('HealthTrack')}
                        >
                            <View>
                                <Icon.Activity stroke={focused ? '#2A4834' : '#000'} />
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Order"
                component={OrderScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                        style={{
                            width:50,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: focused
                                ? 'rgba(255, 199, 0, 1)'
                                : 'transparent',
                                borderRadius: 60,
                        }}
                            onPress={() => navigation.navigate('Order')}
                        >
                            <View>
                                <Icon.ShoppingBag stroke={focused ? '#2A4834' : '#000'} />
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            /> */}
            {/* <Tab.Screen
                name="Like"
                component={Favorates}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                        style={{
                            width:50,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: focused
                                ? 'rgba(255, 199, 0, 1)'
                                : 'transparent',
                                borderRadius: 60,
                        }}
                            onPress={() => navigation.navigate('Like')}
                        >
                            <View>
                                <Icon.Heart stroke={focused ? '#2A4834' : '#000'} />
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            /> */}
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                        style={{
                            width:50,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: focused
                                ? 'rgba(255, 199, 0, 1)'
                                : 'transparent',
                                borderRadius: 60,
                        }}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <View>
                                <Icon.User stroke={focused ? '#2A4834' : '#000'} />
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;
