//this file sets the proxy between the client and the server apps
//in our case, the client runs on http://localhost:3000
//the server runs on http://localhost:5000
//when user clicks the sign in button on the browser, that is our client app
//so invoking the /api/createUser from App.js will try to goto http://localhost:3000/api/createUser
//that won't work because our server runs on http://localhost:5000
//so this proxy specifies that any request to /api should goto our server app http://localhost:5000

const proxy = require("http-proxy-middleware/dist");

module.exports = function(app) {
  app.use(proxy(["/api"], { target: "http://localhost:5000" }));
};
