import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { colors } from "../../constant/style";

export default function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <TouchableOpacity
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: colors.white,
    margin: 10,
  },
  flat: {
    backgroundColor: "transparent",
    borderColor: colors.primary60,
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  flatText: {
    color: colors.primary60,
  },
  pressed: {
    opacity: 0.5,
    borderRadius: 4,
  },
});
