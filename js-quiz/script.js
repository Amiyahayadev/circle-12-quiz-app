
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
            clearInterval(timerInterval);
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
            checkAnswers();
        });

        startBtn.addEventListener('click', startQuiz);
        pauseBtn.addEventListener('click', pauseQuiz);