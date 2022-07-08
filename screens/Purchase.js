// import axios from 'axios';
// import axios from 'axios';
import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
// import { TouchableRipple } from 'react-native-paper';
// import CardViewWithImage from './components/Cards';

const { width, height } = Dimensions.get('window')



const catagoriesTabs = [
        {
                title: 'Groceries',
                icon: require('../assets/groceries.png'),
        },
        {
                title: 'Medicines',
                icon: require('../assets/medicine.png'),
        },
        {
                title: 'Fruits & Vegetables',
                icon: require('../assets/vegetables.png'),
        },
        {
                title: 'Food',
                icon: require('../assets/food.png'),
        },
        {
                title: 'Meats',
                icon: require('../assets/meats.png'),
        },
        {
                title: 'Others',
                icon: require('../assets/others-category-icon.png'),
        },
]



export default function ({ route, navigation }) {

        const data = useSelector(e => e)
        console.log(data)
      
        const params = route.params


        const onPressHandle = (tab) => {
                const data = {
                        ...params,
                        category: tab.title
                }
                navigation.navigate('FTasks', data)
        }


        return (
                <ScrollView>
                        {/* <Text style={{ color: 'black' }}>Welcome To Car Rent App</Text> */}
                        <View style={{flex :1, height:height, backgroundColor: 'white',  paddingHorizontal: 30,alignItems: 'center' }}>
                                {/* <Text style={{ color: 'black', fontFamily: 'Arial', marginTop: 50, marginBottom: 20, fontWeight: 'bold', fontSize: 32 }}>Available Cars</Text> */}
                                {/* <Button title="Open Camera" onPress={() => props.navigation.navigate("Camera")} /> */}


                                <Image
                                        style={{ width: 700, height: 400, resizeMode: 'contain', marginTop: -110 }}
                                        source={require('../assets/categories-banner.png')}
                                        resizeMode='contain'
                                />

                                <Text
                                        style={{ fontSize: 30, color: 'black', marginTop: -60, marginBottom: 20, textAlign: 'center' }}

                                >
                                        CATEGORIES
                                </Text>




                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 50 }}>

                                        {catagoriesTabs.map((tab, ind) => <TouchableOpacity key={ind} onPress={() => onPressHandle(tab)} ><View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F6F2', width: ((width / 2) - 45), height: ((width / 2) - 60), borderRadius: 15, borderColor: '#D9D9D9', borderWidth: 1, marginBottom: 25 }}><Image
                                                style={{ width: 55, height: 55, }}
                                                source={tab.icon}
                                                resizeMode='contain'

                                        /><Text style={{ color: '#313131', fontWeight: 'bold', marginTop: 5, textTransform: 'uppercase', paddingHorizontal: 20, textAlign: 'center' }}>{tab.title}</Text></View></TouchableOpacity>)}



                                </View>



                                {/* <Text >
                                        <TouchableOpacity >
                                                <View style={{ marginRight: 5 }}>
                                                        <Image
                                                                style={{ width: 120, height: 135, }}
                                                                source={require('../assets/basket.png')}
                                                        // resizeMode='contain'

                                                        /><Text style={{ color: 'black', marginRight: 10, marginLeft: 20, marginTop: -45 }}>Groceries</Text>
                                                </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity>

                                                <View style={{ marginLeft: 5 }}>
                                                        <Image
                                                                style={{ width: 120, height: 135, marginLeft: 50 }}
                                                                source={require('../assets/medicine.png')}
                                                        // resizeMode='contain'
                                                        /><Text style={{ color: 'black', marginLeft: 70, marginTop: -45 }}>Medicine</Text>
                                                </View>
                                        </TouchableOpacity>


                                </Text>
                                <Text style={{ marginTop: 50 }}>
                                        <TouchableOpacity>

                                                <View style={{ marginRight: 5 }}>
                                                        <Image
                                                                style={{ width: 120, height: 135, }}
                                                                source={require('../assets/vegetable.png')}
                                                        // resizeMode='contain'

                                                        /><Text style={{ color: 'black', marginRight: 10, marginLeft: 20, marginTop: -45 }}>Vegetables</Text>
                                                </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity>

                                                <View style={{ marginLeft: 5 }}>
                                                        <Image
                                                                style={{ width: 120, height: 135, marginLeft: 50 }}
                                                                source={require('../assets/khana.png')}
                                                        // resizeMode='contain'
                                                        /><Text style={{ color: 'black', marginLeft: 80, marginTop: -45 }}>Food</Text>
                                                </View>

                                        </TouchableOpacity>
                                </Text>



                                <Text style={{ marginTop: 50 }}>
                                        <TouchableOpacity>
                                                <View style={{ marginRight: 5 }}>
                                                        <Image
                                                                style={{ width: 120, height: 135, }}
                                                                source={require('../assets/meat.png')}
                                                        // resizeMode='contain'

                                                        /><Text style={{ color: 'black', marginRight: 10, marginLeft: 30, marginTop: -45 }}>Meat</Text>
                                                </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity>


                                                <View style={{ marginLeft: 5 }}>
                                                        <Image
                                                                style={{ width: 120, height: 135, marginLeft: 50 }}
                                                                source={require('../assets/bag.png')}
                                                        // resizeMode='contain'
                                                        /><Text style={{ color: 'black', marginLeft: 80, marginTop: -45 }}>Others</Text>
                                                </View>
                                        </TouchableOpacity>

                                </Text> */}
                                <View style={{ height: 100 }}>

                                </View>



                        </View>
                </ScrollView>
        )
}