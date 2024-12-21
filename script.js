const quizData = [
    {
        question: "What is the largest planet in our solar system?",
        options: ["Mars", "Jupiter", "Saturn", "Earth"],
        correct: 1
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Cu"],
        correct: 2 
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Stephen Hawking", "Nikola Tesla", "Albert Einstein"],
        correct: 3
    },
    {
        question: "What is the smallest unit of life?",
        options: ["Atom", "Molecule", "Cell", "Organism"],
        correct: 2
    },
    {
        question: "What gas do plants absorb during photosynthesis?",
        options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionEl.textContent = currentQuizData.question;

    optionsEl.innerHTML = '';
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(button, index));
        optionsEl.appendChild(button);
    });
}

function selectOption(selectedButton, selectedIndex) {
    const currentQuizData = quizData[currentQuestion];
    const buttons = document.querySelectorAll('.option');
    
    buttons.forEach(button => button.disabled = true);

    if (selectedIndex === currentQuizData.correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
        buttons[currentQuizData.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    questionEl.textContent = '';
    optionsEl.innerHTML = '';
    resultEl.textContent = `You scored ${score} out of ${quizData.length}!`;
    restartBtn.style.display = 'block';
}

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultEl.textContent = '';
    restartBtn.style.display = 'none';
    loadQuestion();
});

loadQuestion();
