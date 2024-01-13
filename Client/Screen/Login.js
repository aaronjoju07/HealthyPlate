import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
import { useFonts, KaushanScript_400Regular } from '@expo-google-fonts/kaushan-script';

const { width, height } = Dimensions.get("window");

const Login = () => {
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
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => console.log('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={() => console.log('Register')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      {/* Include your Google and Apple sign-in buttons here */}
      <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Login')}>
        <Text style={styles.buttonText}>SigIn With Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Register')}>
        <Text style={styles.buttonText}>SigIn With Apple</Text>
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
