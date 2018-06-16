import axios from 'axios'

const BACKEND_URI = process.env.BACKEND_URI || "http://192.168.0.11:8080";

export function createUser(username, password, first_name, last_name, callback) {
  let data = {
    username: username,
    password: password,
    firstName: first_name,
    lastName: last_name
  }
  axios.post(`${BACKEND_URI}/api/users`, data).then((response) => {
    callback(null, response)
  }).catch((error) => {
    callback(error)
  })
}