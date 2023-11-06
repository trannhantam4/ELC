import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { firebase } from "@react-native-firebase/auth";
import SearchBar from "../components/UI/SearchBar";
import Button from "../components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import { StudentsContext } from "../store/student-context";
import { fetchStudent } from "../ulti/http";
import List from "../components/List/List";
export default function Home() {
  const user = firebase.auth().currentUser;
  const studentsCtx = useContext(StudentsContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const NavigateManageScreen = () => {
    navigation.navigate("ManageScreen");
  };
  const [isPressed, setIsPressed] = useState(false);
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null); // New state for the timeout

  const updateSearch = (newSearch) => {
    setSearch(newSearch);

    // Clear any previous timeouts
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout to trigger the fetch after a delay
    setSearchTimeout(
      setTimeout(() => {
        setIsFetching(true);
        fetchStudents();
      }, 1000) // Adjust the delay time as needed
    );
  };

  const fetchStudents = async () => {
    try {
      const students = await fetchStudent(search);
      studentsCtx.setStudents(students);
    } catch (error) {
      console.log(error);
      setError("Could not fetch data");
    }

    setIsFetching(false);
  };

  useEffect(() => {
    // This effect will run when search changes and the timeout is triggered.
    // It fetches the data if the timeout occurs or at least three characters are entered.
    if (search.length >= 3) {
      setIsFetching(true);
      fetchStudents();
    }
  }, [search]);
  const students = studentsCtx.students;
  console.log(students);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <SearchBar
            search={search}
            onUpdateSearch={updateSearch}
            getStudents={() => setIsPressed(true)}
          />
          <Button onPress={NavigateManageScreen}>Add</Button>
          <List students={students} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
  screen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
});
