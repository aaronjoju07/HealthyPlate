import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useFonts, KaushanScript_400Regular } from '@expo-google-fonts/kaushan-script';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const { width, height } = Dimensions.get('window');

const Registration = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const validateName = () => {
    const regex = /^[a-zA-Z]{3,}$/;
    setNameValid(regex.test(name));
  };

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(email));
  };

  const validatePhone = () => {
    const regex = /^[0-9]{9}$/;
    setPhoneValid(regex.test(phoneNumber));
  };

  const validatePassword = () => {
    // Password should have at least 1 special character, 1 uppercase, 1 lowercase, and a minimum length of 6 characters
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    setPasswordValid(regex.test(password));
  };

  const pressRegister = () => {
    const user = {
      username: name, email: email, phnum: phoneNumber, password: password
    }
    if (nameValid && emailValid && phoneValid && passwordValid && name.length > 0 && password.length > 0 && phoneNumber.length > 0 && email.length > 0) {
      axios.post('http://localhost:5001/register',user).then((res)=>{
        if (res.data.status == 'ok') {
          Alert.alert(res.data.data)
          navigation.navigate('Login')
        }
        else {
          Alert.alert(res.data.data)
        }
      })
      
    } else {
      Alert.alert("Invalid fields. Please check.")
    }
  };

  let [fontsLoaded, fontError] = useFonts({
    KaushanScript_400Regular,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Image style={styles.circleImage} source={require('../assets/images/coverLogo.png')} />
        </View>
        {fontsLoaded ? (
          <Text style={styles.title}>
            <Text style={styles.healthy}>Healthy</Text>
            <Text style={styles.text}>{` `}</Text>
            <Text style={styles.plate}>Plate</Text>
          </Text>
        ) : null}
        {fontsLoaded ? (
          <Text style={styles.subTitle}>Finest foods with no hassle delivery!!</Text>
        ) : null}
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          style={[styles.input, { borderColor: nameValid ? 'green' : 'red' }]}
          placeholder="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            validateName();
          }}
        />
        <TextInput
          style={[styles.input, { borderColor: emailValid ? 'green' : 'red' }]}
          placeholder="Email"
          autoCapitalize="none" 
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail();
          }}
        />
        <TextInput
          style={[styles.input, { borderColor: phoneValid ? 'green' : 'red' }]}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            validatePhone();
          }}
        />
        <TextInput
          style={[styles.input, { borderColor: passwordValid ? 'green' : 'red' }]}
          placeholder="Password"
          autoCapitalize="none" 
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword();
          }}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={() => pressRegister()}>
        <Text style={styles.buttonText}>Register</Text>
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

  registerButton: {
    backgroundColor: 'rgba(255, 199, 0, 1)',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default Registration;
