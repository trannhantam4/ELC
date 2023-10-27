import { createContext, useReducer, useState } from "react";
//NEED TO BE CHECKED
export const StudentsContext = createContext({
  students: [],
  addStudent: ({ name, DoB, date, classes, lastModifiedBy, parentEmail }) => {},
  deleteStudent: (id) => {},
  setStudent: (students) => {},
  updateStudent: (
    id,
    { name, DoB, date, classes, LastModifiedBy, parentEmail }
  ) => {},
});

function StudentsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updateableIndex = state.findIndex(
        (student) => student.id === action.payload.id
      );
      const updateableStudent = state[updateableIndex];
      const updateItem = { ...updateableStudent, ...action.payload.data };
      const updateStudents = [...state];
      updateStudents[updateableIndex] = updateItem;

      return updateStudents;
    case "DELETE":
      return state.filter((student) => student.id !== action.payload);
    default:
      return state;
  }
}

function StudentsContextProvider({ children }) {
  const [studentsState, dispatch] = useReducer(StudentsReducer, []);

  function addStudent(studentData) {
    dispatch({ type: "ADD", payload: studentData });
  }
  function setStudent(students) {
    dispatch({ type: "SET", payload: students });
  }
  function deleteStudent(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateStudent(id, studentData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: studentData } });
  }
  const value = {
    students: studentsState,
    addStudent: addStudent,
    setStudent: setStudent,
    deleteStudent: deleteStudent,
    updateStudent: updateStudent,
  };
  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
}
export default StudentsContextProvider;
