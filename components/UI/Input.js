import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import React from "react";
const { width, height } = Dimensions.get("window");
import { colors } from "../../constant/style";
export default function Input({ label, value, textInputConfig }) {
  return (
    <View>
      <Text style={styles.label}>{label}:</Text>
      <TextInput style={styles.input} {...textInputConfig}></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
  },
  input: {
    height: height * 0.05,
    backgroundColor: colors.primary10,
    width: width * 0.85,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    fontWeight: "bold",
    color: colors.primary60,
  },
  label: {
    fontWeight: "bold",
    color: colors.primary60,
    fontSize: height * 0.02,
  },
});
