// SYNTHEOSCore/src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useHEMS } from 'providers/HEMSProvider';

const DashboardScreen = () => {
const { status } = useHEMS();

return (
    <View style={styles.container}>
    <Text style={styles.header}>SYNTHEOS Dashboard</Text>
    <Text>HEMS Status: {status}</Text>
    <Text>BLE Device: Not connected</Text>
    </View>
);
};

export default DashboardScreen;

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
header: { fontSize: 28, fontWeight: '600', marginBottom: 20 },
});
