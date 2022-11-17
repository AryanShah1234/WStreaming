const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
const popup = require("node-popup");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/iwpproject");

//mongoose schemas
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
var commSchema = new mongoose.Schema({
  name: String,
  comment: String,
  email: String,
});

//mongoose model
var User = mongoose.model("User", userSchema);
var Comment = mongoose.model("Comment", commSchema);

//storing credentials in database
app.post("/login.html", (req, res) => {
  var errors = 0;
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var password2 = req.body.password2;
  if (username === "" || username === null) {
    res.sendFile(__dirname + "/signup2.html");
    errors = errors + 1;
    console.log("unable to signup");
  }
  if (password.length < 6) {
    res.sendFile(__dirname + "/signup2.html");
    errors = errors + 1;
    console.log("unable to signup");
  }
  if (password != password2) {
    res.sendFile(__dirname + "/signup2.html");
    errors = errors + 1;    
    console.log("unable to signup");
  }
  if (errors == 0) {
    var myData = new User({
      username: username,
      password: password,
      emailid: email,
    });
    myData
      .save()
      .then((item) => {
        res.sendFile(__dirname + "/login.html");
        console.log("item addeed successfully");
        console.log(username);
        console.log(password);
      })
      .catch((err) => {
        console.log("unable to save to database");
      });
  }
});

//matching credentials in login form and database
app.post("/homepage2.html", function (req, res) {
  var usernamef = req.body.username;
  var passwordf = req.body.password;
  User.find(
    { username: usernamef, password: passwordf },
    function (err, users) {
      if (err) {
        console.log(err);
      } else {
        if (Object.keys(users).length === 0) {
          res.sendFile(__dirname + "/login2.html");
        } else {
          res.sendFile(__dirname + "/homepage2.html");
        }
        console.log(users);
      }
    }
  );
  console.log(usernamef);
  console.log(passwordf);
});


//comments TENZ
app.post("/index.html", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var commentss = req.body.subject;
  var commdata = new Comment({
    name: name,
    comment: commentss,
    email: email,
  });
  commdata
    .save()
    .then((item) => {
      res.sendFile(__dirname + "/index.html");
      console.log("comments addeed successfully");
    })
    .catch((err) => {
      console.log("unable to save to database");
    });

  Comment.find(function (err, comments) {
    if (err) {
      console.log(err);
    } else {
      console.log(comments);
    }
  });

  console.log(name);
  console.log(commentss);
});

//comments SOM
app.post("/index2.html", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var commentss = req.body.subject;
  var commdata = new Comment({
    name: name,
    comment: commentss,
    email: email,
  });
  commdata
    .save()
    .then((item) => {
      res.sendFile(__dirname + "/index2.html");
      console.log("comments addeed successfully");
    })
    .catch((err) => {
      console.log("unable to save to database");
    });

  Comment.find(function (err, comments) {
    if (err) {
      console.log(err);
    } else {
      console.log(comments);
    }
  });
  console.log(name);
  console.log(commentss);
});
//comment tarik
app.post("/index3.html", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var commentss = req.body.subject;
  var commdata = new Comment({
    name: name,
    comment: commentss,
    email: email,
  });
  commdata
    .save()
    .then((item) => {
      res.sendFile(__dirname + "/index3.html");
      console.log("comments addeed successfully");
    })
    .catch((err) => {
      console.log("unable to save to database");
    });

  Comment.find(function (err, comments) {
    if (err) {
      console.log(err);
    } else {
      console.log(comments);
    }
  });
  console.log(name);
  console.log(commentss);
});
//comment valkyrae
app.post("/index4.html", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var commentss = req.body.subject;
  var commdata = new Comment({
    name: name,
    comment: commentss,
    email: email,
  });
  commdata
    .save()
    .then((item) => {
      res.sendFile(__dirname + "/index4.html");
      console.log("comments addeed successfully");
    })
    .catch((err) => {
      console.log("unable to save to database");
    });

  Comment.find(function (err, comments) {
    if (err) {
      console.log(err);
    } else {
      console.log(comments);
    }
  });
  console.log(name);
  console.log(commentss);
});
//comment katie
app.post("/index5.html", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var commentss = req.body.subject;
  var commdata = new Comment({
    name: name,
    comment: commentss,
    email: email,
  });
  commdata
    .save()
    .then((item) => {
      res.sendFile(__dirname + "/index5.html");
      console.log("comments addeed successfully");
    })
    .catch((err) => {
      console.log("unable to save to database");
    });

  Comment.find(function (err, comments) {
    if (err) {
      console.log(err);
    } else {
      console.log(comments);
    }
  });
  console.log(name);
  console.log(commentss);
});

//static files
app.use(express.static("public"));
app.use("/CSS", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/JS", express.static(__dirname + "public/js"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/homepage.html");
});

app.get("/signup.html", function (request, response) {
  response.sendFile(__dirname + "/signup.html");
});
app.get("/signup2.html", function (request, response) {
  response.sendFile(__dirname + "/signup2.html");
});
app.get("/login.html", function (request, response) {
  response.sendFile(__dirname + "/login.html");
});

app.get("/login2.html", function (request, response) {
  response.sendFile(__dirname + "/login2.html");
});
app.get("/index.html", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/index2.html", function (request, response) {
  response.sendFile(__dirname + "/index2.html");
});

app.get("/index3.html", function (request, response) {
  response.sendFile(__dirname + "/index3.html");
});

app.get("/index4.html", function (request, response) {
  response.sendFile(__dirname + "/index4.html");
});

app.get("/index5.html", function (request, response) {
  response.sendFile(__dirname + "/index5.html");
});

app.get("/homepage2.html", function (request, response) {
  response.sendFile(__dirname + "/homepage2.html");
});

app.get("/about.html", function (request, response) {
  response.sendFile(__dirname + "/about.html");
});

app.listen(port, function () {
  console.log("server is listening");
});