import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HealthReportScreen from "screens/HealthReportScreen";
import VoiceAssistantScreen from "screens/VoiceAssistantScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
<NavigationContainer>
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#111" },
        tabBarActiveTintColor: "#00FFAA",
        tabBarIcon: ({ color, size }) => {
        let iconName = "ios-pulse";
        if (route.name === "Health") iconName = "ios-pulse";
        if (route.name === "Assistant") iconName = "ios-mic";
        return <Ionicons name={iconName as any} size={size} color={color} />;
        },
    })}
    >
    <Tab.Screen name="Health" component={HealthReportScreen} />
    <Tab.Screen name="Assistant" component={VoiceAssistantScreen} />
    </Tab.Navigator>
</NavigationContainer>
);

export default AppNavigator;
