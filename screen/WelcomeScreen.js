import {Picker,TextInput, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
export default function WelcomeScreen({ navigation }){
    const [selectedValue, setSelectedValue] = useState("Rasperry PI 3");
    const [isFocus, setFocus] = useState(false)
    return(
        <View style={styles.container}>
            <View style={{width:200, height:200}}>
                <Image style={{width: 200, height:200,marginBottom:20,marginLeft:20}} source={require('../assets/garbabge.png')}/>
            </View>
            <View style={styles.form}>           
                {/* <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Garbage') } >
                        <View>
                            <Text>Garbage</Text>
                        </View>
                </TouchableOpacity> */}
                <Picker
                    selectedValue={selectedValue}
                    style={{ 
                            height: 50, 
                            width: 200,
                            borderWidth: 1,
                            borderRadius:10,
                            borderColor:"#0000cd",
                            shadowColor:"#0000cd",
                            shadowRadius:5,
                            shadowOpacity:0.6,
                            paddingHorizontal:17
                    }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Rasperry PI 3" value="Rasperry PI 3" />
                    <Picker.Item label="Rasperry PI 2" value="Rasperry PI 2" />
                    <Picker.Item label="Arduino Nano" value="Arduino Nano" />
                    <Picker.Item label="Arduino Fio" value="Arduino Fio" />
                    <Picker.Item label="Arduino Uno Wifi" value="Arduino Uno Wifi" />
                    <Picker.Item label="LilyPad Arduino USB" value="LilyPad Arduino USB" />
                    <Picker.Item label="LilyPad Arduino" value="LilyPad Arduino" />
                </Picker>
                <TextInput
                        onFocus={() => {
                            setFocus(true)
                        }}
                        onBlur={() => {
                            setFocus(false)
                        }}
                        secureTextEntry={true}
                        style={(isFocus) ? (styles.inputFocus) : (styles.input) }
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder="Enter Password Connect"
                        // keyboardType="numeric"
                        />

               <Button
                    onPress={() => navigation.navigate('Garbage')}
                    title="Submit"
                    color="#0000cd"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8ff',
      position:"relative",
      paddingVertical:50,
      paddingHorizontal:50
    },
    input:{
        height: 40,
        margin: 12,
        padding: 20,
        borderWidth: 1,
        borderRadius:10,
        borderColor:"#0000cd",
        shadowColor:"#0000cd",
        shadowRadius:5,
        shadowOpacity:0.6
    },
    inputFocus:{
        height: 40,
        margin: 12,
        padding: 20,
        borderWidth: 1,
        borderRadius:10,
        borderColor:"#0000cd",
        shadowColor:"#0000cd",
        shadowRadius:5,
        shadowOpacity:0.6,
        outlineWidth: 0
    },
    form:{
        backgroundColor: '#fff',
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:20,
        borderRadius:5
    }
});