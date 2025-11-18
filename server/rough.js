// initaize varibles
var express = require("express"); // telling that file, that requires the express library (node modules)
var expressFileUpload = require("express-fileupload"); // telling file needs the file upload library
var app = express(); // method that initalize express object and holds it in app
var cors = require("cors"); // needs cors from library

//open server and setup routing
app.use(cors()); // express using cors aka telling server to use cors

app.listen(4000, onSeverStartFunction);

app.post("/BMI", express.json(), ProcessBMI);
// rough.js:4000/BMI
app.post("/Count", expressFileUpload(), CharCount);
// rough.js:400/Count

//functions to run

function ProcessBMI(req, res) {
  /*
    How the JSON is formatted 
        {
            weight:#, 
            feet:#,
            inches:#
        }  

    */
  var heath = req.body;
  var weight = heath.weight;
  var feet = heath.feet;
  var inches = heath.inches;
  var valBMI;
  // calculate BMI
  inches += feet * 12;
  valBMI = (weight * 703) / (inches * inches);
  //send BMI back
  var data = {
    BMI: valBMI,
  };
  res.json(data);
}
function CharCount(req, res) {
  let sentence = req.files.textFile.data.toString();

  var charCount = 0;
  var vowelCount = 0;

  var cleanSentence = sentence.replace(/[^a-zA-Z]/g, "").toLowerCase();
  var sentLength = cleanSentence.length;

  for (let i = 0; i < sentLength; i++) {
    switch (cleanSentence[i]) {
      case "a":
      case "e":
      case "i":
      case "o":
      case "u":
        vowelCount++;
        break;
      default:
        charCount++;
    }
  }
  var statement =
    "There are " + vowelCount + " vowels, and " + charCount + " consonants";

  var data = {
    result: statement,
  };
  res.json(data);
}

function onSeverStartFunction() {
  console.log("working!");
}
