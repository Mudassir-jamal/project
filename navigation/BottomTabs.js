import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedBack from '../screens/FeedBack';


const Tab = createBottomTabNavigator();


const BottomTabs = () => {
  return (
    <View>
      <Tab.Navigator
      
      screenOptions={{
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'blue',
        // tabBarActiveBackgroundColor: 'red',

        tabBarStyle: {
          position: 'absolute',
          height: 65,
          borderTopColor: 'rgba(0, 0, 0, .2)',
        },
      }}>
      <Tab.Screen
        options={{
          // headerShown: false,
          headerStyle:{backgroundColor:'#ec9b01'},
          headerTitle:'FAAIZY',
          headerTitleStyle:{backgroundColor:'black',paddingHorizontal:10,paddingVertical:2,color:'#ec9b01',borderRadius:10},
          headerTintColor: 'black',
          headerTitleAlign:'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
          tabBarIcon: () => (
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/home.png')}
            />
          ),
        }}
        name="Home"
        component={Dashboard}
      />

      {/* <Tab.Screen
        options={{
          headerStyle:{backgroundColor:'#ec9b01'},
          headerTitle:'ORDER',
          headerTintColor: 'black',
          tabBarIcon: () => (
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/phone.png')}
            />
          ),
        }}
        name="Contact"
        component={Dashboard}
      /> */}
      
      <Tab.Screen
        options={{
          headerStyle:{backgroundColor:'#ec9b01'},
          headerTitle:'FAAIZY',
          headerTitleStyle:{backgroundColor:'black',paddingHorizontal:10,paddingVertical:2,color:'#ec9b01',borderRadius:10},
          headerTintColor: 'black',
          headerTitleAlign:'center',
          tabBarIcon: () => (
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/phone.png')}
            />
          ),
        }}
        name="Contact"
        component={FeedBack}
      />

      <Tab.Screen
        options={{
          headerStyle:{backgroundColor:'#ec9b01'},
          headerTintColor: 'black',
          headerTitle:'ORDERS LIST',
          
          
          tabBarIcon: () => (
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/time.png')}
            />
          ),
        }}
        name="Time"
        component={Orders}
      />
    </Tab.Navigator>
    </View>
  )
}

export default BottomTabs

const styles = StyleSheet.create({})