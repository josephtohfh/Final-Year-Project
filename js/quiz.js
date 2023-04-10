/* -- Additional Quiz of 5 random MCQs -- */
let options = Array.from(document.querySelectorAll('.option-text'));
let progressText = document.querySelector('#progressText');
let scoreText = document.querySelector('#score');
let progressBarFull = document.querySelector('#progressBarFull');
let result = document.querySelector('#result-text');
let lastScore = document.querySelector('#last-score');
let totalQuiz = document.querySelector('#total-quiz');
let avgScore = document.querySelector('#avg-score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let answeredQuestions = 0;
let completedQuizzes = 0;
let mostRecent = 0;
let totalScore = 0;

function generateQuestions() {
    let questions = [];

    // Create set of 5 MCQs
    for (let i = 0; i < 5; i++) {
        let question = {};

        let result = generateCMOSEquation();
        // Insert answers first
        question.question = result.equation;
        question.inputInv = result.inputInv;
        question.inputInv2 = result.inputInv2;
        question.inverter = result.inverter;

        // Generate options
        let correctAns = result.equation;
        optionList = [correctAns];

        if (result.inverter == 0) {
            // Incorrect 1
            let incorrectOption = "(" + result.equation + ")'";
            optionList.push(incorrectOption);
            // question.option2 = incorrectOption;

            // Incorrect 2
            incorrectOption = incorrectOption.replaceAll("+", "or");
            incorrectOption = incorrectOption.replaceAll("*", "and");
            incorrectOption = incorrectOption.replaceAll("or", "*");
            incorrectOption = incorrectOption.replaceAll("and", "+");
            optionList.push(incorrectOption);
            // question.option3 = incorrectOption;

            // Incorrect 3
            incorrectOption = result.equation.replaceAll("+", "or");
            incorrectOption = incorrectOption.replaceAll("*", "and");
            incorrectOption = incorrectOption.replaceAll("or", "*")
            incorrectOption = incorrectOption.replaceAll("and", "+");
            optionList.push(incorrectOption);
            // question.option4 = incorrectOption;
        } else {
            //Incorrect 1
            let incorrectOption = result.equation.slice(1, -2);
            optionList.push(incorrectOption);
            // question.option2 = incorrectOption;

            // Incorrect 2
            incorrectOption = incorrectOption.replaceAll("+", "or");
            incorrectOption = incorrectOption.replaceAll("*", "and");
            incorrectOption = incorrectOption.replaceAll("or", "*")
            incorrectOption = incorrectOption.replaceAll("and", "+");
            optionList.push(incorrectOption);
            // question.option3 = incorrectOption;

            // Incorrect 3
            incorrectOption = result.equation.replaceAll("+", "or");
            incorrectOption = incorrectOption.replaceAll("*", "and");
            incorrectOption = incorrectOption.replaceAll("or", "*")
            incorrectOption = incorrectOption.replaceAll("and", "+");
            optionList.push(incorrectOption);
            // question.option4 = incorrectOption;
        }

        // Shuffle options
        optionList.sort(() => Math.random() - 0.5);

        // Assign options
        question.option1 = optionList[0];
        question.option2 = optionList[1];
        question.option3 = optionList[2];
        question.option4 = optionList[3];

        // Store the correct option
        question.answer = optionList.indexOf(correctAns) + 1;

        questions.push(question);
    }
    console.log(questions);

    return questions;
}

questions = generateQuestions();
console.log(questions);

function startQuiz() {
    let questions = generateQuestions()
    questionCounter = 0;
    score = 0;
    answeredQuestions = 0;
    currentQuestion = {};
    availableQuestions = [...questions];
    completedQuizzes = Number(window.localStorage.getItem("completedQuizzes")) || completedQuizzes;
    mostRecent = Number(window.localStorage.getItem("mostRecentScore")) || mostRecent;
    totalScore = Number(window.localStorage.getItem('totalScore')) || totalScore;

    window.localStorage.setItem("score", score);
    window.localStorage.setItem("availableQuestions", JSON.stringify(availableQuestions));
    window.localStorage.setItem("answeredQuestions", answeredQuestions);
    window.localStorage.setItem("currentQuestion", currentQuestion);
    getNewQuestion();
}

// Initialise quiz 
function initQuiz() {
    if (!window.localStorage.getItem("availableQuestions") || JSON.parse(window.localStorage.getItem("availableQuestions")).length == 0) {
        startQuiz();
    } else {
        console.log("loading storage..")
        loadLocalStorage();
        getNewQuestion();
    }
}

// Load current quiz state
function loadLocalStorage() {
    availableQuestions = JSON.parse(window.localStorage.getItem("availableQuestions")) || availableQuestions;
    currentQuestion = JSON.parse(window.localStorage.getItem("currentQuestion")) || currentQuestion;
    questionCounter = Number(window.localStorage.getItem("questionCounter")) || questionCounter;
    answeredQuestions = Number(window.localStorage.getItem("answeredQuestions")) || answeredQuestions;
    score = Number(window.localStorage.getItem("score")) || score;
    scoreText.innerText = score;
    completedQuizzes = Number(window.localStorage.getItem("completedQuizzes")) || completedQuizzes;
    totalScore = Number(window.localStorage.getItem('totalScore')) || totalScore;
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter > 5) {
        endQuiz();
        return
    }

    // Resume loaded quiz state
    if (questionCounter - 1 == answeredQuestions) {
        progressText.innerText = `Question ${questionCounter} of ${5}`;
        progressBarFull.style.width = `${((questionCounter - 1) / 5) * 100}%`;

        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            let number = option.dataset['number'];
            option.innerText = "Z = " + currentQuestion['option' + number];
        }

        equation = currentQuestion.question;

        // Remove overall inverter 
        if (currentQuestion.inverter == 1) {
            equation = equation.slice(1, -2)
        }
        // Remove input inverter
        if (currentQuestion.inputInv != 0) {
            equation = equation.replace("'", "")
        }
        // Remove second input inverter
        if (currentQuestion.inputInv2 != 0) {
            equation = equation.replace("'", "")
        }
        filtered = equation.replaceAll("(", "").replaceAll(")", "").replaceAll("+", "").replaceAll("*", ""); // Replace all removes more than 1 instances!
        for (i = 0; i < filtered.length; i++) {
            inputMap[inputs[i]] = filtered[i];
            equation = equation.replace(filtered[i], inputs[i].toLowerCase()); // So we don't misreplace the inputs
        }
        equation = equation.toUpperCase();

        let postfix = infixToPostfix(equation);
        let matrixPMOS = postfixToPMOS(postfix);
        let matrixNMOS = postfixToNMOS(postfix);

        drawCircuit(matrixPMOS, matrixNMOS, postfix, currentQuestion.inputInv, currentQuestion.inputInv2, currentQuestion.inverter);

        acceptingAnswers = true;

    } else {
        questionCounter++;
        window.localStorage.setItem("questionCounter", questionCounter);

        progressText.innerText = `Question ${questionCounter} of ${5}`;
        progressBarFull.style.width = `${((questionCounter - 1) / 5) * 100}%`;

        let questionsIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionsIndex];
        window.localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));

        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            let number = option.dataset['number'];
            option.innerText = "Z = " + currentQuestion['option' + number];
        }

        equation = currentQuestion.question;

        // Remove overall inverter 
        if (currentQuestion.inverter == 1) {
            equation = equation.slice(1, -2)
        }
        // Remove input inverter
        if (currentQuestion.inputInv != 0) {
            equation = equation.replace("'", "")
        }
        // Remove second input inverter
        if (currentQuestion.inputInv2 != 0) {
            equation = equation.replace("'", "")
        }
        filtered = equation.replaceAll("(", "").replaceAll(")", "").replaceAll("+", "").replaceAll("*", ""); // Replace all removes more than 1 instances!
        for (i = 0; i < filtered.length; i++) {
            inputMap[inputs[i]] = filtered[i];
            equation = equation.replace(filtered[i], inputs[i].toLowerCase()); // So we don't misreplace the inputs
        }
        equation = equation.toUpperCase();

        let postfix = infixToPostfix(equation);
        let matrixPMOS = postfixToPMOS(postfix);
        let matrixNMOS = postfixToNMOS(postfix);

        drawCircuit(matrixPMOS, matrixNMOS, postfix, currentQuestion.inputInv, currentQuestion.inputInv2, currentQuestion.inverter);

        availableQuestions.splice(questionsIndex, 1);
        window.localStorage.setItem("availableQuestions", JSON.stringify(availableQuestions));

        acceptingAnswers = true;
    }
}

options.forEach(option => {
    option.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        let selectedOption = e.target;
        let selectedAnswer = selectedOption.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        correctOption = document.getElementById("option" + currentQuestion.answer);

        if (classToApply === 'correct') {
            incrementScore(20);
        } else {
            // Show correct option
            correctOption.parentElement.classList.add('correct');
        }

        selectedOption.parentElement.classList.add(classToApply);

        answeredQuestions++;
        window.localStorage.setItem("answeredQuestions", answeredQuestions);

        setTimeout(() => {
            // Reset options
            if (selectedOption != undefined) {
                selectedOption.parentElement.classList.remove(classToApply);
                if (correctOption.parentElement.classList.item(1) === 'correct') {
                    correctOption.parentElement.classList.remove('correct');
                }
            }

            getNewQuestion();

        }, 2000)
    })
})

incrementScore = num => {
    score += num;
    window.localStorage.setItem("score", score);
    scoreText.innerText = score;
}

function endQuiz() {
    progressBarFull.style.width = `${100}%`;
    completedQuizzes++;
    totalScore += score;
    modal.showModal();

    // Display Statistics
    result.innerText = score;
    if (completedQuizzes == 1) {
        lastScore.innerText = "-";
    } else {
        lastScore.innerText = mostRecent;
    }
    totalQuiz.innerText = completedQuizzes;
    avgScore.innerText = (totalScore / completedQuizzes).toPrecision(3);

    localStorage.setItem('mostRecentScore', score);
    localStorage.setItem('completedQuizzes', completedQuizzes);
    localStorage.setItem('totalScore', totalScore);

    // Reset options
    if (selectedOption != undefined) {
        selectedOption.parentElement.classList.remove(classToApply);
        if (correctOption.parentElement.classList.item(1) == 'correct') {
            correctOption.parentElement.classList.remove('correct');
        }
    }
}

initQuiz();