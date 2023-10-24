import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React from "react";
import { firebase } from "@react-native-firebase/auth";
import { colors } from "../constant/style";
import Input from "../components/UI/Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../components/UI/Button";
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
          <View style={styles.cover}></View>
          <Image style={styles.image} source={{ uri: user.photoURL }} />
          <Input label={"User name"} value={user.displayName} />
          <Button>Change</Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  cover: {
    width: width,
    height: height * 0.25,
    backgroundColor: colors.shadow,
    alignSelf: "flex-start",
  },
  KeyboardAvoidingView: {
    height: height,
    width: width,
  },
  screen: {
    height: height,
    width: width,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    marginTop: -height * 0.07,
  },
  input: {
    height: height * 0.05,
    backgroundColor: colors.primary10,
    width: width * 0.9,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: colors.primary60,
    width: width / 3,
    height: height * 0.05,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: height * 0.02,
  },
});
