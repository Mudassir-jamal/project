import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/common';
import { Logout } from '../screens/Logout';
  
  

export default function CustomDrawerContent(props) {
     let dispatch = useDispatch()

    const logOut = () => {
        // navigation.navigate('') 
        logoutUser(dispatch)
    }
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={logOut} />
       
      </DrawerContentScrollView>
    );
  }
  