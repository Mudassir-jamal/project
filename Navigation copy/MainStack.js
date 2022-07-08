import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
// import Drawer from './Drawer';
import Dashboard from "../screens/Dashboard";
import Orders from "../screens/Orders";
import FTasks from "../screens/FTasks";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyCurvedView from "../screens/UserProfile";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { Switch } from "react-native-paper";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function MainStack() {
  const [active, setActive] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen options={{
          headerStyle: {
            backgroundColor: 'orange',
          },
          headerTintColor: 'black',
          // headerLeft:false,
          headerRight: () => (
            <Switch
            trackColor={{ false: "black", true: "gray" }}
            thumbColor={isEnabled ? "white" : "gray"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          ),
        }}
        name="Home" component={Dashboard} />


        <Drawer.Screen name="Profile" component={MyCurvedView} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}
