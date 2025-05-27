import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen.js";
const Stack = createStackNavigator();
export default function StackNavigator() {
    return (
        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerShown: true, // Hide the header for all screens
                    headerStyle: {
                        backgroundColor: '#f4511e', // Set the header background color
                    },
                    
                }}
                >
                <Stack.Screen
                    name="Home"
                    component= {HomeScreen} // Replace with your HomeScreen component
                    options={{ title: 'Welcome', headerTitleAlign:'center' }} // Set the title for the Home screen
                    />
            </Stack.Navigator>
        </NavigationContainer>
    );
}