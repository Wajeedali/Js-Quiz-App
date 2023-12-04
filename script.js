const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector(".alert");
const startBtn = document.querySelector(".startBtn");
const timer = document.querySelector(".timer");

// Array of Objects storing questions & answers
const quiz = [{
  question : 'What does CSS stand for?',
  choices : ['Counter Style Sheet', 'Computer Style Sheet', 'Cascading Style Sheet', 'Creative Style Sheet'],
  answer : 'Cascading Style Sheet' 
},
{
  question : 'How can you center an element horizontally in CSS?',
  choices : ['text-align: center', 'margin: auto', 'padding: center', 'align: center'],
  answer : 'margin: auto' 
},
{
  question : 'What does the "box-sizing" property in CSS control?',
  choices : ["Element's color", "Element's position", "Element's size calculation", "Element's visibility"],
  answer : "Element's size calculation"
},
{
  question : 'Which CSS property is used to set the background color of an element?',
  choices : ['color', 'background-color', 'bgcolor', 'background'],
  answer : 'background-color' 
},
{
  question : 'What does the CSS property "z-index" control?',
  choices : ["Element's size", "Element's position", "Element's stacking order", "Element's border"],
  answer : "Element's stacking order" 
},];

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerId = null;

//function to display questions
const showQuestions = () => {
  const questiondetails = quiz[currentQuestionIndex];
  questionBox.textContent = questiondetails.question;

  choicesBox.textContent = '';
  for (let i = 0; i<questiondetails.choices.length; i++){
    const currentChoice = questiondetails.choices[i];
    const choiceDiv = document.createElement('div');
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add('choice')
    choicesBox.appendChild(choiceDiv)

    choiceDiv.addEventListener('click', ()=>{
      if (choiceDiv.classList.contains('selected')){
        choiceDiv.classList.remove('selected')
      }else {
        choiceDiv.classList.add('selected')
      }
    })
  }
  if (currentQuestionIndex<quiz.length){
    startTimer()
  }
}

//function to check answers 
const checkAnswer = () => {
  const selectedChoice = document.querySelector('.choice.selected')
  if (selectedChoice.textContent === quiz[currentQuestionIndex].answer){
    alert.style.backgroundColor = "#5d9b63";
    displayAlert("Correct Answer!")
    score++
  }else{
    alert.style.backgroundColor = "orange";
    displayAlert(`Wrong Answer! Correct Answer is: ${quiz[currentQuestionIndex].answer}`)
  }
  timeLeft = 15;
  currentQuestionIndex++
  if (currentQuestionIndex < quiz.length){
    showQuestions()
  } else{
    stopTimer()
    showScore()
  }
}

//function to show score 
const showScore = () => {
  questionBox.textContent = ""
  choicesBox.textContent = ""
  scoreCard.textContent = `You scored ${score} out of ${quiz.length}!`
  displayAlert("Quiz Completed!!!")
  nextBtn.textContent = "Play Again!"
  quizOver = true;
  timer.style.display = "none";
}

//display alert function 
const displayAlert = (msg) => {
  setTimeout(()=>{
    alert.style.display = "none";
  },1000)
  alert.style.display = "block";
  alert.textContent = msg;

}

//Function to Shuffle Questions
const shuffleQuestions = () => {
  for (let i = quiz.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
  }
  currentQuestionIndex = 0;
  showQuestions();
};

//Function to stop timer 
const stopTimer = () => {
  clearInterval(timerId)
}

//Function to Start Timer
const startTimer = () => {
  stopTimer()
  const countDown = () => {
    timer.textContent = timeLeft
    timeLeft--
    if (timeLeft === 0){
      const confirmUser = confirm("Time Up!!! Do you want to play the quiz again?")
      if (confirmUser){
        timeLeft = 15
        startQuiz()
      }else{
        startBtn.style.display = "block";
        container.style.display = "none";
      }
    }
  }
  timerId = setInterval(countDown,1000)
}

const startQuiz = () => {
  timeLeft = 15;
  timer.style.display = "flex";
  shuffleQuestions();
};

//Activating start button 
startBtn.addEventListener('click', ()=> {
  startBtn.style.display = "none";
  container.style.display = "block";
  startQuiz()
})

nextBtn.addEventListener('click', ()=> {
  const selectedChoice = document.querySelector('.choice.selected');
  if (!selectedChoice && nextBtn.textContent === "Next"){
    displayAlert("Select your answer")
    return;
  }
  if (quizOver){
    nextBtn.textContent = "Next";
    scoreCard.textContent = "";
    currentQuestionIndex = 0;
    startQuiz()
    quizOver = false
    score = 0
  }
  else {
  checkAnswer()
}
})