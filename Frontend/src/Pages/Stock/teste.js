import axios from "axios";

const response = await axios.get('http://localhost:8080/produto/todos')

console.log(response.data)


console.log(2 % 2)