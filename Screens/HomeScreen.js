import React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const dataWithBanner = [{ Front: '../assets/sales.jpg' }, ...products];


  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.100.40:3000/products/');
      const data = await response.json();

      // Store the data in AsyncStorage
      await AsyncStorage.setItem('products', JSON.stringify(data));

      setProducts(data);
    } catch (error) {
      console.log(error);
      // Retrieve the data from AsyncStorage if there is an error with the fetch
      const data = await AsyncStorage.getItem('products');
      setProducts(JSON.parse(data));
    }
  };

  useEffect(() => {
    fetchData();
    // Fetch data every 10 seconds
  const intervalId = setInterval(fetchData, 10000);

  // Clear interval on unmount
  return () => clearInterval(intervalId);
  }, []);

  console.log(products)
  const [numColumns, setNumColumns] = useState(2);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemimage}>
          <Image source={{ uri: item.Front }} style={styles.image} />
        </View>
        {item.NewArrivals === "Yes" && 
        <Text style={styles.sale}>{item.NewArrivals === "Yes" ? "New" : null}</Text>
    }
        <Text style={styles.brand}>{item.Brand}</Text>
        <Text style={styles.name}>{item.Name}</Text>
        <Text style={styles.price}>${item.Price}</Text>
        
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.bannerContainer}>
        <Image source={require('../assets/sales.jpg')} style={styles.bannerImage} />
      </View>
    );
  };

  const renderAnotherHeader = () => {
    return (
      <View style={styles.anotherHeaderContainer}>
        <Text>Another Header</Text>
      </View>
    );
  };

  return (
    <FlatList
    data={products}
    numColumns={numColumns}
    keyExtractor={(item, index) => `${item._id}_${index}`}
    ListHeaderComponent={renderHeader}
    renderItem={renderItem}
    ListFooterComponent={renderAnotherHeader}
  />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 0,
    width: '100%',
  },
  item: {

    flex: 1,
    marginHorizontal: 5,
    borderWidth: 0,
    width: 140,
    borderStyle: 'solid',
    overflow: 'hidden',
    elevation: 5,
    marginLeft: '5%',
    paddingTop:5,
    gap: 5,
    marginBottom: 10,
  },
  itemimage:{
    justifyContent: 'center',

    flexDirection: 'column',
    borderWidth: 0,
    borderStyle: 'solid',
    elevation: 5,
    marginBottom: 0,
    alignItems: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  image: {
    justifyContent: 'center',

    width: 150,
    height: 160,
    marginRight: 0
  },
  name: {
    
    width: 120,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 13,
    paddingBottom: 5,
    alignSelf: 'center',
    fontWeight: 'bold'
  },

  brand: {
    
    width: 120,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 13,
    color: '#555555',
    paddingTop: 5,
    paddingBottom: 0,
    alignSelf: 'center',
    fontWeight: '600'
  },
  sale: {
    
    width: 120,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: 'red',
    marginTop: 0,
    paddingTop: 0,
    alignSelf: 'center',
    fontWeight: '600'
  },
  price: {
    justifyContent: 'center',
    flex:1,
    textAlign: 'center',
    fontSize: 16
  },
  bannerContainer: {
    width: '100%',
    height: 140,
    flex:1,
    marginBottom: 0,
  },
  bannerImage: {
    width: '100%',
    height: 140,
    resizeMode: 'stretch',
  },
});

export default HomeScreen;