const question = document.getElementById("quiz");

(function() {
    const myQuestions = [
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
      question: "According to Sherlock Holmes, 'If you eliminate the impossible, whatever remains, however improbable, must be the...'?",
      answers: {
        a: "Answer",
        b: "Truth",
        c: "Cause",
        d: "Source"
      },
      correctAnswer: "b"
    } 
    ];

    function buildQuiz() {

      let questionCounter = 0;
      const maxQuestions = 10;

      startGame = () => {
          questionCounter = 0;
          score = 0;
          availableQuestions = [...myQuestions];
         
          getNewQuestion();
      };
     
      getNewQuestion = () => {
      
          if(availableQuestions.length === 0 || questionCounter >= maxQuestions){
              return window.location.assign("/end.html");
          }
      
          questionCounter++;
          progressText.innerHTML = `Question ${questionCounter}/${maxQuestions}`;
      
      
          const questionIndex = Math.floor(Math.random()*availableQuestions.length);
          currentQuestion = availableQuestions[questionIndex];
          question.innerText = currentQuestion.question;
      
          availableQuestions.splice(questionIndex, 1);
      };

      const output = [];

      myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
  
        for (letter in currentQuestion.answers) {
          answers.push(
            `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
             </label>`
          );
        }
  
        output.push(
          `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
  
      //combine output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");

      
    }
  

    function showResults() {
      const answerContainers = quizContainer.querySelectorAll(".answers");
      let score = 0;
  
      let numCorrect = 0;
  
      myQuestions.forEach((currentQuestion, questionNumber) => {
    
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        if (userAnswer === currentQuestion.correctAnswer) {
          numCorrect++;
          answerContainers[questionNumber].style.color = "lightgreen";
        } 
        else {
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
      } 
      else {
        previousButton.style.display = "inline-block";
      }
      
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } 
      else {
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
  
    buildQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(0);
  
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  
  