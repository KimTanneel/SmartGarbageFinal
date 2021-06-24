import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Circle from  '../circleProgress/CircleProgress';
import "firebase/firestore";
import "firebase/database";
import firebase from "firebase/app";
import registerNotifications from  "../notification/RegisterNotification"
import sendNotifications from "../notification/SendNotification";
import * as Notifications from 'expo-notifications';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


export default function GarbageScreen() {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAjsg2_QADPDyj5AuHt_N3ox5lJJzQcpRk",
    authDomain: "garbage-app-eed2c.firebaseapp.com",
    databaseURL: "https://garbage-app-eed2c-default-rtdb.firebaseio.com",
    projectId: "garbage-app-eed2c",
    storageBucket: "garbage-app-eed2c.appspot.com",
    messagingSenderId: "60234969577",
    appId: "1:60234969577:web:13a61b29de05ea14191b78",
    measurementId: "G-8S9QM8LB7R"
  };


  if (firebase.apps.length === 0) {
     firebase.initializeApp(firebaseConfig);
  }

  const [percentTrash, setPercent] = useState({
    organic:{
      isEnable: true,
      percent: 0
    },
    inorganic:{
      isEnable: false,
      percent: 0
    }
  });

  useEffect(() => {
    const percentInorganicTrash = percentTrash.inorganic.percent;
    const percentOrganicTrash = percentTrash.organic.percent;
    let isPushed = true;
    const token = "ExponentPushToken[VjmgRjDhNt0AFxrc_3EUxI]";
    if(percentOrganicTrash == 100 && !(percentInorganicTrash == 100 && isPushed)){
      isPushed = false;
      sendNotifications(token," 🗑 🗑 Full Garbage In Organic", "😀	😀 Let's go take out the trash 😀	😀")
    }
    else if(percentInorganicTrash == 100 && !(percentOrganicTrash == 100 && isPushed)){
      isPushed = false;
      sendNotifications(token," 🗑 🗑 Full Garbage In Inorganic", "😀	😀 Let's go take out the trash 😀	😀")
    }
    else if(percentInorganicTrash == 100 && percentOrganicTrash == 100 && isPushed){
      isPushed = false;
      sendNotifications(token," 🗑 🗑 Garbage on both sides are full", "😀	😀 Let's go take out the trash 😀	😀")
    }
  })
 
  useEffect(() => {
    var trashRef = firebase.database().ref("trash/");

    trashRef.on("value", function(data) {
      var trash = data.val();
      var percentInorganicGarbage = parseInt(trash.inorganic.percent)
      var percentOrganicGarbage = parseInt(trash.organic.percent)
      setPercent({
        ...percentTrash,
        inorganic:{
          ...percentTrash.inorganic,
          percent: percentInorganicGarbage
        },
        organic:{
          ...percentTrash.organic,
          percent: percentOrganicGarbage
        }
      })
      
    });
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.headerSettings}>
        <Image source={require('../assets/crown.png')}/>
        <Image source={require('../assets/settings.png')} />
      </View>
      <View style={{alignItems:"center"}}>
        {
          (percentTrash.organic.isEnable) ? (<Circle size={256} progress={percentTrash.organic.percent} type="organic"/>) : (<Circle size={256} progress={percentTrash.inorganic.percent} type="inorganic"/>)
        }
      </View>
      <TouchableOpacity style={styles.buttonLoad} activeOpacity={0.6}>
          <Image source={require('../assets/refresh.png')}/>
          <Text accessibilityLabel="Learn more about this purple button" style={{fontSize:18}}>Load Garbage</Text>
      </TouchableOpacity>
      <View style={styles.category}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
          setPercent({
            ...percentTrash,
            organic:{
              ...percentTrash.organic,
              isEnable: true
            },
            inorganic:{
              ...percentTrash.inorganic,
              isEnable: false
            }
          })
        }}>
          <View style={styles.categoryGarbage}>
              <Image source={require("../assets/organic-food.png")}/>
              <Text style={{marginTop:10,fontSize:16,fontWeight:'600'}}>Organic</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
          setPercent({
            ...percentTrash,
            inorganic:{
              ...percentTrash.inorganic,
              isEnable: true
            },
            organic:{
              ...percentTrash.organic,
              isEnable: false
            }
          })
        }}>
          <View style={styles.categoryGarbage}>
              <Image source={require("../assets/online-shopping.png")}/>
              <Text style={{marginTop:10,fontSize:16,fontWeight:'600'}}>Inorganic</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87cefa',
    paddingVertical:32,
    paddingHorizontal:12
  },
  headerSettings:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:16,
    paddingVertical:8
  },
  aQuarter:{ 
      position:"absolute",
      top:0,
      left:0,
      width:256,
      height:256,
      borderRadius:200,
      borderWidth:10,
      borderTopColor:"rgba(0,0,0,0) ",
      borderLeftColor:"rgba(0,0,0,0) ",
      borderBottomColor:"rgba(0,0,0,0) ",
      borderRightColor:"green",
      transform: [{rotate: '-45deg'}]
  },
  coverChart:{
    position:"absolute",
    top:0,
    left:0,
    width:60,
    height:60
  },
  percent:{
    fontSize:56,
    fontWeight:'600'
  },
  buttonLoad:{
    borderWidth:1,
    borderColor:"#e6e6fa",
    backgroundColor:"#e6e6fa",
    shadowColor:"gray",
    shadowOpacity:0.4,
    shadowRadius:10,
    marginHorizontal:50,
    paddingHorizontal:20,
    marginTop:20,
    borderRadius:20,
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center",
    paddingVertical:8

  },
  category:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    marginTop:50
  },
  categoryGarbage:{
    flexDirection:"column",
    alignItems:"center",
    backgroundColor:"#fff",
    paddingVertical:40,
    width:160,
    borderRadius:10,
    shadowRadius:20,
    shadowColor:"gray",
    shadowOpacity:0.6
  },

});
