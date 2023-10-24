import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Keyboard,
} from "react-native";

import React from "react";
import { TextInput } from "react-native-gesture-handler";

import IconButton from "./IconButton";
import { colors } from "../../constant/style";
const { height, width } = Dimensions.get("screen");
export default function SearchBar() {
  return (
    <View style={styles.screen}>
      <TextInput style={styles.input}></TextInput>
      <IconButton icon="search" size={width * 0.075} color={colors.primary60} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  screen: {
    alignItems: "center",
    flexDirection: "row",
    height: height * 0.07,
    marginTop: 24,
  },
  input: {
    backgroundColor: colors.shadow,
    borderRadius: 16,
    width: "80%",
    height: "100%",
    padding: 10,
    color: colors.primary60,
    fontWeight: "bold",
    fontSize: 16,
  },
});
