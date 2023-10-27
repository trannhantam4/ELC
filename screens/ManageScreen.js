import { View, Text, StyleSheet } from "react-native";
import React, { useState, useContext, useLayoutEffect } from "react";
import { StudentsContext } from "../store/student-context";
import { updateStudent, deleteStudent, storeStudent } from "../ulti/http";
import LoadingOverlay from "../components/UI/LoadingOverLay";
import { firebase } from "@react-native-firebase/auth";
import IconButton from "../components/UI/IconButton";
import { colors } from "../constant/style";
import StudentForm from "../components/UI/StudentForm";
const ManageScreen = ({ route, navigation }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const user = firebase.auth().currentUser;
  const studentCtx = useContext(StudentsContext);
  const id = route.params?.studentId;
  const isEditing = !!id;
  const selectedStudent = studentCtx.students.find(
    (student) => student.id === id
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Student" : "Add Student",
    });
  }, [navigation, isEditing]);

  async function deleteHandler() {
    setIsSubmiting(true);
    studentCtx.deleteStudent(id);
    await deleteStudent(id);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  //unEdit
  //unEdit
  async function confirmHandler(studentData) {
    if (isEditing) {
      setIsSubmiting(true);
      studentCtx.updateExpense(id, studentData);
      await updateExpense(id, studentData);
    } else {
      setIsSubmiting(true);
      const id = await storeExpense(studentData);
      studentCtx.addExpense({ ...studentData, id: id });
    }
    navigation.goBack();
  }
  //unEdit
  //unEdit

  if (isSubmiting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <StudentForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitLabel={isEditing ? "Update" : "Add"}
        defaultValue={selectedStudent}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={"red"}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderColor: colors.primary60,
    alignItems: "center",
  },
});
