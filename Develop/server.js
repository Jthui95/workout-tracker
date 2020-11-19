const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.urlencoded({extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

  app.use(require("./routes/apiroutes"));
  app.use(require("./routes/htmlroutes"));

  app.listen(PORT, function Check(){
    console.log(`This application is running on port ${PORT}!`)
  });