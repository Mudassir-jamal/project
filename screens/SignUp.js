import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import FormSubmitButton from '../assets/buttons/FormSubmitButton';
import { mainColor } from '../helper/ReuseAble-StyleSheet';
import { registrationHandle } from '../redux/actions/regitrationActions';



const { height, width } = Dimensions.get('window')

export default function ({ navigation }) {
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [loading, setLoading] = useState(false);

  


  const Register = async () => {
    if (!name || !phone) {
      alert('Please Enter All the Details');
    } else {

      setLoading(true)

      const data = {
        user_name: name.toLocaleLowerCase(),
        phone: phone,
      }
      registrationHandle(
        data,
        navigation,
        setLoading
      )
    }
  };



  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text
            style={{
              color: 'black',
              // fontFamily: 'Arial',
              fontWeight: 'bold',
              fontSize: 32,
            }}>
            Sign Up
          </Text>
        </View>

        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          {/* <Image source={require('../Images/logo.png')} style={styles.pic}/> */}


          <TextInput
            style={styles.input}
            onChangeText={e => setname(e)}
            placeholder="Enter your name"
          />

          <TextInput
            style={styles.input}
            onChangeText={e => setphone(e)}
            placeholder="Enter your phone"
            keyboardType="numeric"
          />


          <FormSubmitButton loading={loading} onPressHandle={Register} buttonCaption='Sign Up' />


        </View>




        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <View style={{ flexDirection: 'row', }}>
            <Text>Already have account </Text><TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: mainColor }}>Login now</Text>
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
    color: 'black',
    height: height,
  },
  pic: {
    height: 200,
    width: 300,
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#ec9b01',
    borderRadius: 25,
    padding: 10,
    height: 50,
    width: 280,
    marginBottom: 20,
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
  text: {
    color: 'white',
    fontSize: 20,
  },
});
