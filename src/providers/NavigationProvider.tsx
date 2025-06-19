import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from 'screens/DashboardScreen';

type Props = {
children: ReactNode;
};

const Stack = createNativeStackNavigator();

export const NavigationProvider = ({ children }: Props) => {
return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        {/* If needed, add a "children" route */}
    </Stack.Navigator>
    {children}
    </NavigationContainer>
);
};
