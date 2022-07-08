import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard';
import Orders from '../screens/Orders';
import FTasks from '../screens/FTasks';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const  Drawer = () => {
   
const BottomTab = createBottomTabNavigator();

  return (
    // </Drawer.Navigator>
    <BottomTab.Navigator
    tabBar={(tabsProps) => (
        <>
            <BottomTabBar {...tabsProps} />
        </>
    )}
    initialRouteName="Home"
>
    <BottomTab.Screen name="Home" component={Dashboard} />
    <BottomTab.Screen name="Orders" component={Orders} />
    <BottomTab.Screen name="FTasks" component={FTasks} />

</BottomTab.Navigator>
  )
}

export default Drawer


function Article() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Article Screen</Text>
      </View>
    );
  }