import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions, Alert, ToastAndroid } from 'react-native';
import { useFonts, KaushanScript_400Regular } from '@expo-google-fonts/kaushan-script';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios'
import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userData = { email, password }
  const pressLogin = () => {
    if (email.length == 0 && password.length == 0) {
      Alert.alert('Input email and password')
    } else {
      axios.post('http://localhost:5001/login', userData).then((res) => {
        // console.log(res.data)
        if (res.data.status == 'ok') {
          AsyncStorage.setItem("token",res.data.data)
          AsyncStorage.setItem("isLogin",JSON.stringify(true))
          // Alert.alert('Login Successfull')
          setTimeout(() => {
            Alert.alert('Success', 'Login successful!');
          }, 500);
          navigation.navigate('TabNavigation');
        }
      })
    }
  }
  let [fontsLoaded, fontError] = useFonts({
    KaushanScript_400Regular
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Image style={styles.circleImage} source={require("../assets/images/coverLogo.png")} />
        </View>
        {fontsLoaded ? <Text style={styles.title}>
          <Text style={styles.healthy}>Healthy</Text>
          <Text style={styles.text}>{` `}</Text>
          <Text style={styles.plate}>Plate</Text>
        </Text> : null}
        {fontsLoaded ? <Text style={styles.subTitle}>
          Finest foods with no hassle delivery!!
        </Text> : null}
      </View>

      <View style={styles.textInputContainer}>
        <TextInput style={styles.input} autoCapitalize="none"  onChangeText={(text) => setEmail(text)} value={email} placeholder="Email" />
        <TextInput style={styles.input} autoCapitalize="none"  placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => pressLogin()}>
        <Text style={styles.buttonText} >Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      {/* Include your Google and Apple sign-in buttons here */}
      <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Login')}>
        <FontAwesomeIcon icon={faGoogle} color='white' size={20} />
        <Text style={[styles.buttonText, { marginLeft: 10 }]}>
          SignIn With Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Register')}>
        <FontAwesomeIcon icon={faApple} color='white' size={20} />
        <Text style={[styles.buttonText, { marginLeft: 10 }]}>
          SignIn With Apple
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 199, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    marginTop: height * 0.1,
    alignItems: 'center',
  },
  circle: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: 'rgba(255, 199, 0, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  circleImage: {
    width: '100%',
    height: '100%',
    borderRadius: (width * 0.7) / 2,
  },
  title: {
    fontFamily: "KaushanScript_400Regular",
    fontSize: width * 0.1,
  },
  subTitle: {
    fontFamily: "KaushanScript_400Regular",
    marginTop: 10,
  },
  textInputContainer: {
    marginTop: height * 0.03,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  loginButton: {
    backgroundColor: 'rgba(255, 199, 0, 1)',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  registerButton: {
    backgroundColor: 'rgba(255, 199, 0, 1)',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  socialButton: {
    backgroundColor: 'rgba(255, 199, 0, 1)',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  dividerText: {
    marginHorizontal: 10,
    color: 'black',
  },
});

export default Login;
