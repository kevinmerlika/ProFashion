import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomBar from "./navigation/BottomBar";
import Spinner from 'react-native-loading-spinner-overlay';



const Stack = createNativeStackNavigator();


function CustomHeader() {
  return (
    <View style={{ flexDirection: 'row', paddingTop: 40,alignItems: 'center', justifyContent: 'center' }}>
      <Image  style={styles.image} source={require('./assets/farfetch.jpg')}  />
    </View>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  return (
<View style={{ flex: 1, backgroundColor: '#000', marginTop: 36 }}>
   
      {isLoading ? (
         <View style={styles.container}>
        <Image style={styles.imageload} source={require('./assets/farfetch.jpg')} />
        <Spinner
    visible={isLoading}
    textContent={'Loading Data'}
    textStyle={styles.spinnerTextStyle}
  />
       </View>
       ) : (
        
          <><CustomHeader />
          <BottomBar /></>
      )}
      
   
    
    </View>
  );
};
  

const styles = StyleSheet.create({
  container: {
    
    flex: 0,
    paddingTop: 50,
  },
  image: {
    width: '100%',
    height: 60,
    marginTop: -30,
    resizeMode: 'cover',
  },
  imageload: {
    width: '100%',
    height: 200,
    top: '50%',
    resizeMode: 'center',
  },
  spinnerTextStyle: {
    paddingTop:10,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'normal',
  },
  
  

})
