import axios from "axios";
//NOT YET UPDATED URL
const BACKEND_URL =
  "https://elcapp-66f08-default-rtdb.asia-southeast1.firebasedatabase.app/";

//NOT YET UPDATE FUNCTIONS
export async function fetchStudent() {
  try {
    const response = await axios.get(BACKEND_URL + "/students.json");
    const students = [];

    for (const key in response.data) {
      const studentObj = {
        id: key,
        date: new Date(response.data[key].date),
        name: response.data[key].name,
        DoB: response.data[key].DoB,
        classes: response.data[key].classes,
        lastModifiedBy: response.data[key].lastModifiedBy,
        parentEmail: response.data[key].parentEmail,
      };
      students.push(studentObj);
    }
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
}
export async function storeStudent(studentData) {
  const response = await axios.post(
    BACKEND_URL + "/students.json",
    studentData
  );
  const id = response.data.name;
  return id;
}
export function updateStudent(id, studentData) {
  return axios.put(BACKEND_URL + `/students/${id}.json`, studentData);
}
export function deleteStudent(id) {
  return axios.delete(BACKEND_URL + `/students/${id}.json`);
}
