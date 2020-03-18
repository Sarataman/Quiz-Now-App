const question = document.getElementById("quiz");

(function() {
    const myQuestions = [
      {
        question: "What year was Andela found?",
        answers: {
          a: "1999",
          b: "2014",
          c: "2017",
          d: "2011"
        },
        correctAnswer: "b"
      },
      {
        question: "What is the world's most expensive spice by weight?",
        answers: {
          a: "Saffro",
          b: "Cinnamon",
          c: "Cardamon",
          d: "Vanilla"
        },
        correctAnswer: "a"
      },
      {
        question: "Rolex is a company that specializes in what type of product?",
        answers: {
          a: "Car",
          b: "Sport equipment",
          c: "Watches",
          d: "Clothing"
        },
        correctAnswer: "c"
      },
      {
        question: "Which language is NOT Indo-European?",
        answers: {
          a: "Russian",
          b: "Hungarian",
          c: "Greek",
          d: "Latvian",
        },
        correctAnswer: "b"
      },
      {
        question: "In 2013 how much money was lost by Nigerian scams?",
        answers: {
          a: "$95 Million",
          b: "$956 Million",
          c: "$2.7 Billion",
          d: "$12.7 Billion"
        },
        correctAnswer: "d"
      },
      {
        question: "When did the website 'Facebook' launch?",
        answers: {
          a: "2005",
          b: "2004",
          c: "2003",
          d: "2006"
        },
        correctAnswer: "b"
      },
      {
        question: "After how many years would you celebrate your crystal anniversary?",
        answers: {
          a: "20",
          b: "10",
          c: "25",
          d: "15"
        },
        correctAnswer: "d"
      },
      {
        question: "What is the unit of currency in Laos?",
        answers: {
          a: "Kip",
          b: "Ruble",
          c: "Konra",
          d: "Dollar"
        },
        correctAnswer: "a"
      },
      {
        question: "How would one say goodbye in Spanish?",
        answers: {
          a: "Adios",
          b: "Hola",
          c: "Au Revoir",
          d: "Salir"
        },
        correctAnswer: "a"
      },
      {
        question: "Which sign of the zodiac is represented by the Crab?",
        answers: {
          a: "Libra",
          b: "Virgo",
          c: "Cancer",
          d: "Sagittarius"
        },
        correctAnswer: "c"
      },
      {
        question: "Five dollars is worth how many nickles?",
        answers: {
          a: "50",
          b: "100",
          c: "25",
          d: "69"
        },
        correctAnswer: "b"
      },
      {
        question: "What is Cynophobia the fear of?",
        answers: {
          a: "Birds",
          b: "Flying",
          c: "Germs",
          d: "Dogs"
        },
        correctAnswer: "d"
      },
      {
        question: "The Flag of the European Union has how many stars on it?",
        answers: {
          a: "10",
          b: "14",
          c: "16",
          d: "12"
        },
        correctAnswer: "d"
      }
    ];
  
    let questionCounter = 0;
    let availableQuesions = [];
    let currentQuestion = {};
    const MAX_QUESTIONS = 10;

    startGame = () => {
      questionCounter = 0;      
      availableQuesions = [...questions];
      console.log(availableQuesions);
      getNewQuestion();
    };

    //method to randomly select questions
    getNewQuestion = () => {
      const questionIndex = Math.floor(Math.random() * availableQuesions.length);
      currentQuestion = availableQuesions[questionIndex];
      question.innerText = currentQuestion.question;    
      availableQuesions.splice(questionIndex, 1);
    }

    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
             </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
      let score = 0;
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = "lightgreen";
        } else {
          // if answer is wrong or blank
          // color the answers red
          answerContainers[questionNumber].style.color = "red";
        }
      });
      
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
      numCorrect = numCorrect * 10
      localStorage.setItem("numCorrect", numCorrect);
      localStorage.setItem('time', +new Date);      
    }
    
  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
      
      if (currentSlide === 0) {
        previousButton.style.display = "none";
      } else {
        previousButton.style.display = "inline-block";
      }
      
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
  
    // display quiz right away
    buildQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(0);
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  
  