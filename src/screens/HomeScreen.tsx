// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => (
<View style={styles.container}>
    <Text style={styles.text}>🧠 SYNTHEOS is online</Text>
</View>
);

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
},
    text: { color: "#00FFAA", fontSize: 22 },
});

export default HomeScreen;
