const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

if (process.env.NODE_ENV === 'production'){
  //First check to see if there is a specific file which Express can match in the client build.
  //To make Express serve up production assets like main.js or main.css files
  app.use(express.static('client/build'));

  //If someone makes a request for a route that express does not understand
  //then make Express serve up the index.html file
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })

}

//app.use(express.static(path.join(__dirname, "../client/build")));

//connect to mongodb if we are running the project locally
if (process.env.NODE_ENV !== 'production'){
  const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/googlequiz";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log("mongodb connected");
  });
}else{
  //if we are running on heroku, then we should connect to mlab
  mongoose.connect('mongodb+srv://kenya:kenya@cluster0-vsnpo.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
  .then(res => {
    console.log("mongodb connected");
  });
}


app.use(bodyParser.json());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

routes(app);

module.exports = app;
