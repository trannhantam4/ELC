import { View, Text } from "react-native";
import React from "react";

export default function Login({ children }) {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      {children}
    </View>
  );
}
