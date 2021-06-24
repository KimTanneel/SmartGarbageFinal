import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screen/WelcomeScreen';
import GarbageScreen from './screen/GarbageScreen';
import { NavigationContainer } from '@react-navigation/native';

const NavStack = createStackNavigator();


export default function App() {
  return(
    <NavigationContainer>
      <NavStack.Navigator initialRouteName="Welcome" 
                        screenOptions={{
                                headerShown: false
                              }}>
        <NavStack.Screen name="Welcome" component={WelcomeScreen} />
        <NavStack.Screen name="Garbage" component={GarbageScreen}/>
      </NavStack.Navigator>
    </NavigationContainer>
  );
}


