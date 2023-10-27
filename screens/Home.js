import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SearchBar from "../components/UI/SearchBar";
import Button from "../components/UI/Button";
import { useNavigation } from "@react-navigation/native";
export default function Home() {
  const navigation = useNavigation();
  const NavigateManageScreen = () => {
    navigation.navigate("ManageScreen");
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <SearchBar />
          <Button onPress={NavigateManageScreen}>Add</Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});
