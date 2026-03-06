const questions = [
    {
        question: "What is a Trojan Malware?",
        options: ["A Greek War Tactic", "The act of sending Emails acting as a company to make the victim reveal important information", "A piece of malicious software which disguises itself as a useful piece of software", "The act of redirecting network traffic to fraudulent websites"],
        answer: 2,
        image: "/static/images/1.jpg"
    },
    {
        question: "Which type of software can help prevent Trojan infections?",
        options: ["Video games", "Antivirus software", "Web browsers", "Media players"],
        answer: 1,
        image: "/static/images/2.jpeg"
    },
    {

        question: "Which user behavior can increase the risk of Trojan infections?",
        options: ["Installing unknown software", "Regularly updating software", "Using strong passwords", "Backing up data"],
        answer: 0,
        image: "/static/images/3.webp"
    },
    {
        question: "What is a Backdoor Trojan?",
        options: ["Trojans which collect banking credentials", "Trojan which allows the hackers to gain remote access, steal data, install more malware, or spy", "Trojans that encrypt all of the users data until a ransom is paid", "Trojans that Target Computers which have already been infected by malware, downloading more malicious programs to it "],
        answer: 1,
        image: "/static/images/4.jpg"
    },
    {
        question: "Is Xavier Cool",
        options: ["Yes", "No", "REALLY", "not really"],
        answer: 2,
        image: "/static/images/1.webp"
    },
    {
        question: "How do you decrease the risk of Trojan infection",
        options: ["Don't do Software updates", "Disable a firewall", "Open links or attachments from Emails which are suspicious", "Download from official or trusted sources"],
        answer: 3,
        image: "/static/images/1.webp"
    },
    {
        question: "What are the some types of Trojans",
        options: ["Backdoor, Blagging, Downloader, Phishing", "Backdoor, Banker, Downloader, Ransomware", "Frontdoor, Blagging, Downloader, Phishing", "Backdoor, Banker, Uploader, Ransomware"],
        answer: 1,
        image: "/static/images/1.webp"
    }

]

const questionsLength = questions.length;

const questionTitleElement = document.getElementById("question_title");
const questionOptionsElement = document.getElementById("question_options");
const questionImageElement = document.getElementById("question_image");
const questionOptionsElementChildren = questionOptionsElement.children;

const currentQuestionHeader = document.getElementById("header_question");
const currentTimerHeader = document.getElementById("header_timer");
const currentScoreHeader = document.getElementById("header_score");
const catDancingElement = document.getElementById("cat_dancing");
const timerLowOverlayElement = document.getElementById("timer_low_overlay");


let questionTime = 8

var currentQuestion = 0;
var currentScore = 0;
var currentTimer = questionTime + 1;
var currentTimerOverlayOpacity = 0;
var currentTimerTimeoutId = 0;
let rotationAngle = 0;

function changeScore(amount) {
    currentScore += amount;
    currentScoreHeader.textContent = `Score: ${currentScore}`;
}

function loadQuestions(questionNumber) {
    if (currentTimerTimeoutId) {
        clearInterval(currentTimerTimeoutId);
    }
    currentTimerOverlayOpacity = 0;
    timerLowOverlayElement.style.opacity = "" + currentTimerOverlayOpacity;
    currentTimer = questionTime;
    currentTimerHeader.textContent = currentTimer;
    currentTimerHeader.style.fontSize = "1em";
    currentTimerHeader.style.color = "white";

    currentTimerTimeoutId = setInterval(() => {
        currentTimer--;
        currentTimerHeader.textContent = currentTimer;
        if (currentTimer === 0) {
            clearInterval(currentTimerTimeoutId);
            if (currentQuestion !== questionsLength - 1) {
                confetti({
                    particleCount: 1000,
                    startVelocity: 100,
                    spread: 180,
                    origin: {
                        x: 0 ,
                        y: 1,
                    },
                    colors: ['#ff0000','#b30000','#ff4d4d','#800000']
                });
            };
            changeScore(-100);
            nextQuestion();
        } else if (currentTimer <= 4 && currentTimer > 0) {
            currentTimerOverlayOpacity += 0.1
            timerLowOverlayElement.style.opacity = "" + currentTimerOverlayOpacity;
            currentTimerHeader.style.fontSize = 10 * currentTimerOverlayOpacity + 1 + "em";
            currentTimerHeader.style.color = "rgb(135, 35, 35)";
            currentTimerHeader.classList.add("shake");
            setTimeout(() => {
                currentTimerHeader.classList.remove("shake");
            }, 500);
        }
    }, 1000);

    questionTitleElement.textContent = questions[questionNumber].question;
    for (let i = 0; i < questionOptionsElementChildren.length; i++) {
        questionOptionsElementChildren[i].textContent = questions[questionNumber].options[i];
        questionOptionsElementChildren[i].style.backgroundColor = 'black';
    }
    questionImageElement.src = questions[questionNumber].image;
    currentQuestionHeader.textContent = `${questionNumber + 1}/${questionsLength}`;

}

function checkOption(option) {
    if (option === questions[currentQuestion].answer) {
        if (currentQuestion !== questionsLength -1) {
            confetti({
                particleCount: 1000,
                startVelocity: 100,
                spread: 180,
                origin: {
                    x: 0 ,
                    y: 1,
                },
                colors: ['#00ff6e','#00b348','#4dff71','#008000']
            });

            document.getElementById("confetti").classList.add("spin");
            catDancingElement.style.opacity = "1";
            setTimeout(() => {
                document.getElementById("confetti").classList.remove("spin");
            }, 500);
            setTimeout(() => {catDancingElement.style.opacity = "0";}, 1500);
        }
        changeScore(100);
        nextQuestion();
    } else {
        if (questionOptionsElementChildren[option].style.backgroundColor !== "rgb(135, 35, 35)") {
            confetti({
                particleCount: 1000,
                startVelocity: 100,
                spread: 180,
                origin: {
                    x: 0 ,
                    y: 1,
                },
                colors: ['#ff0000','#b30000','#ff4d4d','#800000']
            });
            questionOptionsElementChildren[option].style.setProperty("background-color", "rgb(135, 35, 35)", "important");
            changeScore(-50);
        }
    }
    
}

function nextQuestion() {
    if (currentQuestion + 2 > questionsLength) {
        clearInterval(currentTimerTimeoutId);
        sessionStorage.setItem("score", currentScore);
        window.location.href = "end"
        // End of questions
    } else {
        clearInterval(currentTimerTimeoutId);
        currentQuestion++;
        loadQuestions(currentQuestion);
    }

}



window.addEventListener('load', loadQuestions(currentQuestion));
window.addEventListener('load', () => {
    catDancingElement.style.opacity = "0";
});