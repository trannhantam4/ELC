import axios from "axios";
//NOT YET UPDATED URL
const BACKEND_URL =
  "https://elcapp-66f08-default-rtdb.asia-southeast1.firebasedatabase.app/";

//NOT YET UPDATE FUNCTIONS
export async function fetchStudent(user) {
  try {
    const response = await axios.get(BACKEND_URL + "/students.json");
    const students = [];
    const email = user.email;

    for (const key in response.data) {
      const studentObj = {
        id: key,
        date: new Date(response.data[key].date),
        des: response.data[key].des,
        price: response.data[key].price,
        user: response.data[key].user,
        type: response.data[key].type,
      };

      if (!email || studentObj.user === email) {
        students.push(studentObj);
      }
    }

    students.sort((a, b) => a.date - b.date);
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
