const axios = require("axios");

const host = "https://reqres.in";

let user = {
  email: "eve.holt@reqres.in",
  password: "pistol",
};

axios
  .post(`${host}/api/register`, user)
  .then((res) => {
    console.log("Successfully register => ", res.data);
  })
  .catch((err) => {
    console.log(err);
  });
