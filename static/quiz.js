const questions = [
    {
        question: "What is phishing?",
        options: ["A fun activity you do on weekends", "A delicious way to get calories", "Sending network communications aiming to steal personal data", "Redirecting network traffic to fraudulent websites"],
        answer: 2,
        image: "/static/images/1.webp"
    },
    {
        question: "Is Xavier Cool",
        options: ["Yes", "No", "REALLY", "not really"],
        answer: 2,
        image: "/static/images/1.webp"
    }
]

const questionsLength = questions.length;

const questionTitleElement = document.getElementById("question_title");
const questionOptionsElement = document.getElementById("question_options");
const questionImageElement = document.getElementById("question_image");
const questionOptionsElementChildren = questionOptionsElement.children;

var currentQuestion = 0;

function loadQuestions(questionNumber) {
    questionTitleElement.textContent = questions[questionNumber].question;
    for (let i = 0; i < questionOptionsElementChildren.length; i++) {
        questionOptionsElementChildren[i].textContent = questions[questionNumber].options[i];
    }
    questionImageElement.src = questions[questionNumber].image;
}

function checkOption(option) {
    if (option === questions[currentQuestion].answer) {
        // Correct!
        nextQuestion();
    } else {
        // Incorrect!
    }
}

function nextQuestion() {
    if (currentQuestion + 2 > questionsLength) {
        window.location.href = "end"
        // End of questions
    } else {
        currentQuestion++;
        loadQuestions(currentQuestion);
    }

}



window.addEventListener('load', loadQuestions(currentQuestion));