import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../reducer/User/userSlice';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const userdata = useSelector((state) => state.user.user);
  const user = {
    name: userdata.username,
    avatar: { uri: 'https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    coverPhoto: { uri: 'https://images.pexels.com/photos/4552981/pexels-photo-4552981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  };

  const handleEditProfile = () => {
    // Handle edit profile action
    // Add your logic or navigation here
  };

  const handleResetPassword = () => {
    // Handle reset password action
    // Add your logic or navigation here
  };

  const handleAbout = () => {
    // Handle about action
    // Add your logic or navigation here
  };

  const handleDeleteAccount = () => {
    // Handle delete account action
    // Add your logic or navigation here
  };
  const dispatch = useDispatch();
  const handleLogoutAccount = () => {
    AsyncStorage.setItem('isLogin','')
    AsyncStorage.setItem('token','')
    dispatch(clearUser());
    setTimeout(() => {
      Alert.alert('Success', 'LOGOUT successful!');
    }, 500);
    navigation.navigate('Login');
  };

  const handleFav = () => {
    navigation.navigate('Favorates');
  };

  const handleOrder = () => {
    navigation.navigate('Order');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header with Cover Photo */}
      <Image style={styles.coverPhoto} source={user.coverPhoto} />

      <View style={styles.profileContainer}>
        <Image style={styles.avatar} source={user.avatar} />
        <Text style={styles.userName}>{user.name}</Text>

        {/* Buttons */}
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={handleEditProfile}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.passwordButton]}
          onPress={handleResetPassword}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.favoriteButton]}
          onPress={handleFav}
        >
          <Text style={styles.buttonText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.orderButton]}
          onPress={handleOrder}
        >
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.aboutButton]}
          onPress={handleAbout}
        >
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleLogoutAccount}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.loutButton]}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  coverPhoto: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -75, // Adjust based on the cover photo height
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'rgba(255, 199, 0, 0.7)',
  },
  passwordButton: {
    backgroundColor: 'rgba(255, 199, 0, 0.7)',
  },
  favoriteButton: {
    backgroundColor: 'rgba(255, 199, 0, 0.7)',
  },
  orderButton: {
    backgroundColor: 'rgba(255, 199, 0, 0.7)',
  },
  aboutButton: {
    backgroundColor: 'rgba(255, 199, 0, .7)',
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 0, 0,.6)',
  },
  loutButton: {
    backgroundColor: 'rgba(255, 0, 0,.6)',
  },
});

export default ProfileScreen;
