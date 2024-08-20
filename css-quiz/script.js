let timer;
let timeLeft = 3600; // Set the timer duration in seconds

// Function to start the timer
function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up!");
      submitQuiz(); // Automatically submit the quiz when time is up
    } else {
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000);
}

// Function to update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("time").textContent = `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function submitQuiz() {
  clearInterval(timer); // Stop the timer
  const form = document.getElementById("quizForm");
  const formData = new FormData(form);
  let score = 0;
  const correctAnswers = {
    q1: "b",
    q2: "a",
    q3: "b",
    q4: "a",
    q5: "b",
    q6: "a",
    q7: "a",
    q8: "a",
    q9: "a",
    q10: "c",
    q11: "a",
    q12: "a",
    q13: "b",
    q14: "b",
    q15: "a",
    q16: "a",
    q17: "d",
    q18: "b",
    q19: "d",
    q20: "c",
    q21: "b",
    q22: "a",
    q23: "a",
    q24: "a",
    q25: "a",
    q26: "b",
    q27: "a",
    q28: "a",
    q29: "a",
    q30: "b",
    q31: "c",
    q32: "a",
    q33: "b",
    q34: "a",
    q35: "b",
    q36: "a",
    q37: "b",
    q38: "a",
    q39: "b",
    q40: "b",
    q41: "b",
    q42: "b",
    q43: "a",
    q44: "c",
    q45: "a",
    q46: "b",
    q47: "b",
    q48: "b",
    q49: "a",
    q50: "b",
    q51: "b",
  };

  // Clear previous results
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  // Check answers and display results
  for (let i = 1; i <= 51; i++) {
    const userAnswer = formData.get(`q${i}`);
    const correctAnswer = correctAnswers[`q${i}`];

    // Create a new paragraph element for each question
    const resultParagraph = document.createElement("p");
    resultParagraph.textContent = `Question ${i}: Your answer - ${userAnswer} | Correct answer - ${correctAnswer}`;

    // Check if the user's answer is correct and color accordingly
    if (userAnswer === correctAnswer) {
      resultParagraph.style.color = "green"; // Correct answer
      score++;
    } else {
      resultParagraph.style.color = "red"; // Incorrect answer
    }

    // Append the result paragraph to results container
    resultsContainer.appendChild(resultParagraph);
  }

  alert(`Your score is ${score} out of 51`);
}

// Start the timer when the page loads
window.onload = startTimer;

// Add questions with options
const questions = [
  {
    title: `1. What is the purpose of the <code>&lt;head&gt;</code> element in an HTML document?`,
    options: [
      `To define the main content of the page.`,
      `To include metadata and links to scripts/stylesheets.`,
      `To create a footer for the page.`,
      `To display images.`,
    ],
  },
  {
    title: `2. Which attribute is used to specify the language of an HTML document?`,
    options: [
      `<code>lang</code>`,
      `To include metadata and links to scripts/stylesheets.`,
      `To create a footer for the page.`,
      `To display images.`,
    ],
  },
];

// Form filler
const form = document.querySelector("#quizForm");
const inputValues = "abcdefghijklmnopqrstuvwxyz";

const questionsHTML = questions.map((question, index) => {
  const questionEl = document.createElement("div");
  questionEl.classList.add("question");

  const textEl = document.createElement("p");
  textEl.innerHTML = question.title;
  questionEl.append(textEl);

  const optionsEl = document.createElement("div");
  optionsEl.classList.add("options");

  question.options.forEach((option, i) => {
    const labelEl = document.createElement("label");
    const inputEl = document.createElement("input");
    inputEl.type = "radio";
    inputEl.name = `q${index + 1}`;
    inputEl.value = inputValues[i];
    labelEl.append(inputEl);
    labelEl.append(option);
    optionsEl.append(labelEl);
    const brEl = document.createElement("br");
    optionsEl.append(brEl);
  });

  questionEl.append(optionsEl);
  return questionEl;
});

questionsHTML.forEach((question) => form.append(question));
