import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Flex } from 'native-base';

const Tab = createBottomTabNavigator();

function BottomBar() {
    
  return (
    <NavigationContainer>
      <Tab.Navigator   screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarInactiveBackgroundColor: "black",
        tabBarActiveBackgroundColor: "black",
        tabBarStyle:{
            paddingBottom:0,
            height: 50,
            marginBottom:30,
            display: "flex"
        },
       
    
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused
          ? 'md-home'
          : 'md-home-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      } else if (route.name === 'Search') {
        iconName = focused ? "search" : 'search';
        return <MaterialIcons name={iconName} size={size} color={color} />;
      } else if (route.name === 'Favorites') {
        iconName = focused ? 'heart' : 'heart-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      } else if (route.name === 'Profile') {
        iconName = focused ? 'user-circle' : 'user-circle-o';
        return <FontAwesome name={iconName} size={size} color={color} />;
      }
    },
  })}
  tabBarOptions={{
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
  }}
>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default BottomBar;