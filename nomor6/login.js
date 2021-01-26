const axios = require("axios");

const host = "https://reqres.in";

let user = {
  email: "eve.holt@reqres.in",
  password: "cityslicka",
};

axios
  .post(`${host}/api/login`, user)
  .then((res) => {
    console.log("Successfully Login=", res.data);
  })
  .catch((err) => {
    console.log(err);
  });
