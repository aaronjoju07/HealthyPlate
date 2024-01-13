import * as React from "react";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { Color } from "../Theme/GlobalStyles.js";
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';// import * as Font from 'expo-font';
import { KaushanScript_400Regular } from '@expo-google-fonts/kaushan-script';
import { Itim_400Regular } from '@expo-google-fonts/itim';
const { width, height } = Dimensions.get("window");

const Splash = () => {
  const navigation = useNavigation(); 
  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,KaushanScript_400Regular,Itim_400Regular
  });
  React.useEffect(() => {
    const navigateToLogin = () => {
      navigation.navigate('Login'); // Replace 'Login' with the actual name of your login screen
    };

    const timeoutId = setTimeout(navigateToLogin, 2000);

    return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
  }, [navigation]);
  return (
    <View style={styles.splash}>
      <View style={[styles.splashChild, styles.splashPosition]} />
      <Image
        style={styles.removebgPreview1Icon}
        resizeMode="cover"
        source={require("../assets/images/coverLogo.png")}
      />
      <View style={[styles.splashItem, styles.splashPosition]} />
     {fontsLoaded? <Text style={styles.healthyPlate}>
        <Text style={styles.healthy}>Healthy</Text>
        <Text style={styles.text}>{` `}</Text>
        <Text style={styles.plate}>Plate</Text>
      </Text>:null}
    </View>
  );
};

const styles = StyleSheet.create({
  splashPosition: {
    top: 0,
    position: "absolute",
    height,
  },
  splashChild: {
    left: 0,
    backgroundColor: "#ffc700",
    width: (width * 200) / 375,
  },
  removebgPreview1Icon: {
    top: (height * 148) / 812,
    left: (width * 23) / 375,
    width: (width * 348) / 375,
    height: (height * 420) / 812,
    position: "absolute",
  },
  splashItem: {
    left: width/1.9,
    backgroundColor: "rgba(255, 199, 0, 0.35)",
    width: (width * 189) / 375,
  },
  healthy: {
    color: "#c51717",
  },
  text: {
    color: Color.colorWhite,
  },
  plate: {
    color: "#6c554d",
  },
  healthyPlate: {
    top: (height * 0.65), // Adjusted for centering
    left: width/4, // Adjusted for centering
    fontSize: (width * 0.1),
    fontFamily: 'KaushanScript_400Regular',
    textAlign: "left",
    width: (width * 369) / 375,
    height: (height * 0.16),
    position: "absolute",
  },
  splash: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height,
  },
});



export default Splash;
