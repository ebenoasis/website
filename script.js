let row1 = document.querySelector(".row1");
let row2 = document.querySelector(".row2");
let row3 = document.querySelector(".row3");
let row4 = document.querySelector(".row4");

row1.innerHTML = "Row 1.1";
row2.innerHTML = "Row 1.2";
row3.innerHTML = "Row 2.1";
row4.innerHTML = "Row 2.2";

// ! Main APIs
const surveysApi = "https://my-json-server.typicode.com/depth0/survey1/surveys/"
const questionApi = "https://my-json-server.typicode.com/depth0/survey1/questions/"

const localSurvey = "http://localhost:3000/surveys/"
const localQuestions = "http://localhost:3000/questions/"

const submitData = (e) => {
  e.preventDefault();

  let selectedOption = document.querySelector("#type").value;
  let url;
  if (selectedOption === "bachelor") {
    url = `${localSurvey}1`;
  } else if (selectedOption === "master") {
    url = `${localSurvey}2`;
  } else {
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("result");
      const questions = data.qs;
      resultDiv.innerHTML = `
        <div>
          <h2>${data.id}</h2>
          <p>${data.title}</p>
          <p>${data.desc}</p>
        </div>
      `;
      questions.forEach((questionId) => {
        console.log(questionId);
        fetch(
          `${localQuestions}${questionId}`
        )
          .then((response) => response.json())
          .then((questionData) => {
            resultDiv.innerHTML += `<h3>${questionData.title}</h3>`;
            if (questionData.type === "rate") {
              resultDiv.innerHTML += 
              `<select>
                <option value=""></option>
                ${questionData.options.map(
                  (option) => `<option value="${option}">${option}</option>`
                )}
              </select>`;
            } else if (questionData.type === "free") {
              resultDiv.innerHTML += `<input type="text" placeholder="Enter your answer here">`;
            }
          });
      });
    })
    .catch((error) => console.log(error));
};



// testing if client side connect with server

fetch('http://localhost:3000/surveys')
.then(res => res.json())
.then(data => console.log(data))