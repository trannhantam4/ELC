import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Input from "./Input";
// import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../UI/Button";
import { getDateFormat } from "../../ulti/Date";
const { width, height } = Dimensions.get("screen");
import { firebase } from "@react-native-firebase/auth";
import { colors } from "../../constant/style";
// import AutocompleteTextInput from "./AutocompleteTextInput";

export default function StudentForm({
  onCancel,
  onSubmit,
  submitLabel,
  defaultValue,
}) {
  const [input, setInput] = useState({
    name: defaultValue ? defaultValue.name.toString() : "",
    DoB: defaultValue ? defaultValue.DoB.toString() : "",
    date: defaultValue ? defaultValue.date.toString() : "",
    classes: defaultValue ? defaultValue.classes.toString() : "",
    lastModifiedBy: defaultValue
      ? defaultValue.lastModifiedBy.toString()
      : firebase.auth().currentUser.email.toString(),
    parentEmail: defaultValue ? defaultValue.parentEmail.toString() : "",
  });
  const [selectedDate, setSelectedDate] = useState(
    defaultValue ? new Date(defaultValue.date) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle text input changes for price
  const handlePriceChange = (formattedPrice) => {
    setInput((curInput) => {
      return { ...curInput, price: formattedPrice };
    });
  };

  function submitHandler() {
    // Remove dots or commas from the price input and parse it as a float
    const formattedPrice = input.price.replace(/[.,]/g, "");
    const studentData = {
      // for tuition
      // price: parseFloat(formattedPrice),
      name: input.name,
      classes: input.classes,
      date: selectedDate,
      lastModifiedBy: input.lastModifiedBy,
      parentEmail: input.parentEmail,
    };

    const priceIsValid = !isNaN(studentData.price) && studentData.price > 0;
    const desIsValid = studentData.des.trim().length > 0;

    if (!priceIsValid) {
      Alert.alert("Invalid price!!", "Please check your price");
      return;
    }
    if (!desIsValid) {
      Alert.alert("Invalid des!!", "Please check your des");
      return;
    }
    onSubmit(studentData);
  }

  function inputChangeHandler(inputId, enteredValue) {
    if (inputId === "price") {
      // Remove any dots or commas from the entered value
      const formattedValue = enteredValue.replace(/[.,]/g, "");

      setInput((curInput) => {
        return { ...curInput, [inputId]: formattedValue };
      });
    } else {
      setInput((curInput) => {
        return { ...curInput, [inputId]: enteredValue };
      });
    }
  }

  const handleDateChange = (event, selected) => {
    if (event.type === "set") {
      setShowDatePicker(false);
      setSelectedDate(selected);
    } else {
      setShowDatePicker(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.form}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {!defaultValue ? "Add" : "Update"} Student
            </Text>
            <Text style={styles.label} adjustsFontSizeToFit>
              Will be {!defaultValue ? "added" : "updated"} by:{" "}
              {input.lastModifiedBy}
            </Text>
            <View style={styles.inputRow}>
              {/* <AutocompleteTextInput
                inputValue={input.price}
                onInputChange={handlePriceChange}
              /> */}

              <Text style={styles.label} adjustsFontSizeToFit>
                Date: {getDateFormat(selectedDate)}
              </Text>
              {/* <Button
                  style={styles.button}
                  onPress={() => setShowDatePicker(true)}
                >
                  Select Date
                </Button> */}
            </View>
            {/* <View style={styles.screen}>
              <Text style={[styles.label, { marginBottom: 12 }]}>Type:</Text>
            </View> */}
            {/* {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                style={{ height: height * 0.2 }}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )} */}

            <Input
              label="Name"
              textInputConfig={{
                multiLine: false,
                autoCorrect: true,
                autoCapitalize: "words",
                onChangeText: inputChangeHandler.bind(this, "name"),
                value: input.name,
                placeholder: "Student's Name",
              }}
            />
            <Input
              label="Date of Birth"
              textInputConfig={{
                multiLine: false,
                autoCorrect: true,
                autoCapitalize: "words",
                onChangeText: inputChangeHandler.bind(this, "DoB"),
                value: input.DoB,
                placeholder: "name of thing(s) or anything",
              }}
            />
            <Input
              label="Class"
              textInputConfig={{
                multiLine: false,
                autoCorrect: true,
                autoCapitalize: "words",
                onChangeText: inputChangeHandler.bind(this, "classes"),
                value: input.classes,
                placeholder: "Student's Class",
              }}
            />
            <Text style={styles.label}>
              Last Modifier: {input.lastModifiedBy}
            </Text>
            <View style={styles.buttonContainer}>
              <Button style={styles.button} mode="flat" onPress={onCancel}>
                Cancel
              </Button>
              <Button style={styles.button} onPress={submitHandler}>
                {submitLabel}
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  row: {
    flex: 1,
  },
  screen: { marginHorizontal: 9 },
  screen1: { marginHorizontal: 7, marginTop: 15 },
  title: {
    fontSize: height * 0.04,
    fontWeight: "bold",
    color: colors.primary30,
    textAlign: "center",
    marginVertical: height * 0.005,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: colors.primary60,
    fontWeight: "bold",
  },
});
