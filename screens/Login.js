import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import FormSubmitButton from '../assets/buttons/FormSubmitButton';
import { mainColor } from '../helper/ReuseAble-StyleSheet';
import { loginHandle } from '../redux/actions/loginActions';
import { useSelector } from 'react-redux';

const {height,width} = Dimensions.get('window')


export default function Login ({ navigation }) {
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  


  const Login = async () => {
    if (!number) {
      alert('Kindly Fill all the details');
    } else {
      setLoading(true)
      loginHandle({ phone: number }, navigation,setLoading)



    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Image source={require('../assets/logo_size.jpg')} style={styles.pic} /> */}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text
            style={{
              color: 'black',
              // fontFamily: 'Arial',
              fontWeight: 'bold',
              fontSize: 32,
            }}>
            Login
          </Text>
        </View>


        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>

          {/* <Icon name="rocket" size={30} color="#900" /> */}


          <TextInput
            style={styles.input}
            keyboardType='numeric'
            onChangeText={e => setNumber(e)}
            placeholder="Enter Phone Number"
          />


          <FormSubmitButton loading={loading} onPressHandle={Login} buttonCaption='Login' />




          {/* <TouchableOpacity style={styles.button} onPress={Login}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>

          <View  style={styles.loadingButton}>
          <ActivityIndicator color="white" />
          </View> */}
          


        </View>


        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <View  style={{flexDirection:'row',}}>
            <Text>Don't have account </Text><TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{ color: mainColor }}>Register now</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:height
    // justifyContent: 'center',
  },
  pic: {
    height: 200,
    width: 300,
    marginTop: 10,
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: 280,
    margin: 12,
    // borderWidth: 1
    borderBottomWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'white',
  },
  accbutton: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 8,
    height: 40,
    width: 200,
  },

  text: {
    color: 'white',
    fontSize: 20,
  },
});
