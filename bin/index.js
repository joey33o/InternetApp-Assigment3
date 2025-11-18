///text file upload handling
// let buttonCallSentece = document.getElementById("SentenceButton");
// buttonCallBMI.addEventListener("click", getSentence);
let SentenceOutput = document.getElementById("SentenceResults");
const send = document.getElementById("SentenceButton");
const txtFile = document.getElementById("SentenceFile");

try {
  send.addEventListener("click", async () => {
    // A <form> element
    const userInfo = document.getElementById("SentenceFile");
    let formData = new FormData();
    // adds the file as file name and get the first file recovered from the forum
    formData.append("textFile", txtFile.files[0]);
    const url = "http://localhost:4000/Count";

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    let data = await response.json();
    SentenceOutput.textContent = data.result;
  });
} catch (error) {
  console.error(error.message);
}

// BMI handing
let buttonCallBMI = document.getElementById("BMIbutton");
buttonCallBMI.addEventListener("click", getBMI);

async function getBMI() {
  const url = "http://localhost:4000/BMI";

  var weightVal = document.querySelector("#BMIWeight").value;
  var feetVal = document.querySelector("#BMIFeet").value;
  var inchesVal = document.querySelector("#BMIInches").value;
  let bmiOutput = document.getElementById("bmiResults");

  var dataToSend = {
    weight: parseFloat(weightVal),
    feet: parseFloat(feetVal),
    inches: parseFloat(inchesVal),
  };

  var jsonString = JSON.stringify(dataToSend);

  try {
    var response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonString,
    });

    //Must wait for the promise to be completed because if not it will define it immedietly without the data being sent back from the server
    let data = await response.json();
    console.log(data);
    console.log(data.BMI);
    console.log("working I guess");

    bmiOutput.textContent = data.BMI;
  } catch (error) {
    console.error(error.message);
  }
}
// failed test run
// function () {
//   var weightVal = document.querySelector("#BMIWeight").value;
//   var feetVal = document.querySelector("#BMIFeet").value;
//   var inchesVal = document.querySelector("#BMIInches").value;

//   var dataToSend = {
//     weight: weightVal,
//     feet: feetVal,
//     inches: inchesVal,
//   };

//   //get output element
//   let bmiOutput = document.getElementById("bmiResults");

//   var jsonString = JSON.stringify(dataToSend);

//   fetch("http://localhost:4000/BMI", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: jsonString,
//   }).then((response) => {
//     //shoving server response into data
//     let data = response.json();
//     console.log(data);
//     console.log(data.BMI);
//     console.log("working I guess");

//     bmiOutput.textContent = data.BMI;
//   });
// });
