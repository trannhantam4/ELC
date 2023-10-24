import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
} from "react-native";
import React from "react";
import { firebase } from "@react-native-firebase/auth";
import { colors } from "../constant/style";
import Input from "../components/UI/Input";
const { width, height } = Dimensions.get("window");
export default function Info() {
  const user = firebase.auth().currentUser;
  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <Image style={styles.image} source={{ uri: user.photoURL }} />

          <Input label={"User name"} value={user.displayName} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    width: width * 0.9,
    borderRadius: 10,
    padding: 10,
  },
});
