
let time = 3600;
let timerInterval;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const timerDisplay = document.getElementById('timer');
const quizForm = document.getElementById('quiz');

/**
 * Starts the quiz by displaying the quiz form and enabling the pause button.
 * Also disables the start button and starts the timer.
 *
 */
function startQuiz() {
    quizForm.style.display = 'block';
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    startTimer();
}

function pauseQuiz() {
    let restartQuiz = "Restart Quiz";
    const pauseBtnText = pauseBtn.innerText;
    clearInterval(timerInterval);

    //if on click of the pause button and the text on the button is "Restart Quiz" this means the user wants to restart the quiz, therefore the quiz should return to its initial state.
    if (pauseBtnText === restartQuiz) {
        quizForm.style.display = 'none';
        pauseBtn.innerText = "Pause Quiz";
    }

    pauseBtn.disabled = true;
    startBtn.disabled = false;
}

function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        timerDisplay.textContent = `Time left: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (time <= 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
            checkAnswers();
        }
    }, 1000);
}

function checkAnswers() {
    let correctCount = 0;
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        const selectedAnswer = question.querySelector('input[type="radio"]:checked');
        const correctAnswer = question.getAttribute('data-answer');
        const feedback = question.querySelector('.feedback');

        if (selectedAnswer && selectedAnswer.value === correctAnswer) {
            correctCount++;
            feedback.textContent = 'Correct';
            feedback.className = 'feedback correct';
        } else {
            feedback.textContent = 'Wrong';
            feedback.className = 'feedback wrong';
        }
    });

    alert(`You scored ${correctCount} out of ${questions.length}`);
}

quizForm.addEventListener('submit', function (event) {
    event.preventDefault();
    clearInterval(timerInterval);

    //on submission the "Pause Quiz" text should change to "Restart Quiz" 
    pauseBtn.innerText = "Restart Quiz";

    //get a reference to the submit button.
    const submitBtn = document.querySelector("button[type=submit]");
    //on submission disable the submit button.
    submitBtn.disabled = true;

    checkAnswers();
});

startBtn.addEventListener('click', startQuiz);
pauseBtn.addEventListener('click', pauseQuiz);

//question array.
const questions = [
    {
        question: "Which API is used to find out a user's location?",
        options: ["Gelocation API", "Web Storage API", "Canvas API"],
        answer: "Gelocation API"
    },
    {
        question: "Which Javascript API is used for making network requests?",
        options: ["DOM API", "Fetch API", "Web Storage API"],
        answer: "Fetch API"
    },
    {
        question: "Javascript can run on which of the following platforms?",
        options: ["Browsers only", "Servers only", "Browsers, Servers, and any device with a JS engine"],
        answer: "Browsers, Servers, and any device with a JS engine"
    },
    {
        question: "What is the purpose of the <code>defer</code> attribute in a <code>&lt;script&gt;</code> tag?",
        options: ["To load the script immediately", "To load the script after the HTML content is fully  loaded", "To prevent the script from running"],
        answer: "To load the script after the HTML content is fully  loaded"
    },
    {
        question: "What is the difference between let and const in Javascript?",
        options: ["let allows re-assignment, const does not", "const allows re-assignment, let does not", "Both are the same"],
        answer: "let allows re-assignment, const does not"
    },
    {
        question: "Which API allows you to manipulate the structure and content of a web page?",
        options: ["Geolocation API", "Document Object Model (DOM) API", "Web Storage API"],
        answer: "Document Object Model (DOM) API"
    },
    {
        question: " Which method of adding JavaScript is generally better for organizing code and making it reusable?",
        options: ["Inline JavaScript", "Internal JavaScript", "External JavaScript"],
        answer: "External JavaScript"
    },
    {
        question: "What is the term used when JavaScript automatically adds a semicolon at the end of a line?",
        options: ["Automatic line break", "Implicit semicolon", "Automatic semicolon insertion"],
        answer: "Automatic semicolon insertion"
    },
    {
        question: "What is the name of the JavaScript engine used in Safari?",
        options: ["V8", "SpiderMonkey", "SquirrelFish"],
        answer: "SquirrelFish"
    },
    {
        question: "Which JavaScript engine is used in Internet Explorer?",
        options: ["V8", "Chakra", "Nitro"],
        answer: "Chakra"
    }
]

//creates the questions using javascript.
function createQuestions(questionArr) {
    //this create a unique name attribute for each options to a question. e.g - <input type="radio" name="q1" value="Geolocation API">Geolocation API<br>
    let uniqueNameKey = 1; //e.g name=q1, name=q2, name=q3...

    const submitBtn = document.createElement("button");


    submitBtn.type = "submit"
    submitBtn.innerText = "Submit";

    //USED AS TEMPLATE IN CREATING A SINGLE QUESTION.
    // <div class="question" data-answer="Geolocation API">
    //     <p>1. Which API is used to find out a user's location?</p>
    //     <input type="radio" name="q1" value="Geolocation API">Geolocation API<br>
    //     <input type="radio" name="q1" value="Web Storage API">Web Storage API<br>
    //     <input type="radio" name="q1" value="Canvas API">Canvas API<br>
    //     <span class="feedback"></span>
    // </div>

    questionArr.forEach((item, index) => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const feedback = document.createElement("span");

        //using this as template - <span class="feedback"></span>
        feedback.setAttribute("class", "feedback");

        //using this as template - <div class="question" data-answer="Geolocation API">
        div.setAttribute("class", "question");
        div.setAttribute("data-answer", `${item.answer}`);

        //get the question.
        const question = item.question;

        //using this as template - <p>1. Which API is used to find out a user's location?</p>
        p.innerHTML = `${index + 1}. ${question}`;


        div.appendChild(p)


        item.options.forEach(option => {
            const input = document.createElement("input");

            //using this as template - <input type="radio" name="q1" value="Geolocation API">Geolocation API<br>
            input.type = "radio"
            input.setAttribute("name", `q${uniqueNameKey}`);
            input.setAttribute("value", option);

            const optionText = document.createElement("optionText");
            optionText.innerHTML = `${option}<br>`

            //attach the input to the div.
            div.appendChild(input);

            //this attaches an option text infront of the individual input element.
            div.appendChild(optionText);

        })

        //increment the uniqueNameKey value;
        ++uniqueNameKey;

        //attach feedback(span) to div.
        div.appendChild(feedback)

        //attach div to form element.
        quizForm.appendChild(div);

    })

    //this attaches the submit button after all the questions have been added to the form.
    quizForm.appendChild(submitBtn);

}

//this ensures the function is only invoked when the dom contents are completely loaded, to avoid null references.
window.addEventListener("DOMContentLoaded", () => {
    createQuestions(questions);
})