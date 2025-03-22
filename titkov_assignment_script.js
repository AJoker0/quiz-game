document.addEventListener("DOMContentLoaded", function () {

  const startScreen       = document.getElementById("start-screen");
  const playerSetupScreen = document.getElementById("player-setup-screen");
  const countdownScreen   = document.getElementById("countdown-screen");
  const quizScreen        = document.getElementById("quiz-screen");
  const endScreen         = document.getElementById("end-screen");
  const reviewScreen      = document.getElementById("review-screen");

  const goToNamesBtn      = document.getElementById("go-to-names");
  const backToStartBtn    = document.getElementById("back-to-start");
  const confirmPlayersBtn = document.getElementById("confirm-players");
  const restartGameBtn    = document.getElementById("restart-game");
  const reviewAnswersBtn  = document.getElementById("review-answers");
  const backToEndBtn      = document.getElementById("back-to-end");
  const submitAnswerBtn   = document.getElementById("submit-answer");

  const playerInputsContainer = document.getElementById("player-inputs");
  const playerTurnElement     = document.getElementById("current-player-name");
  const questionTextContainer = document.getElementById("question-text");
  const answerContainer       = document.getElementById("answers");
  const countdownTimer        = document.getElementById("countdown-timer");
  const timeLeftDisplay       = document.getElementById("time-left");
  const winnerMessage         = document.getElementById("winner-message");
  const answersLogContainer   = document.getElementById("answers-log");

  let timer = null;

  let gameData = {
    players:           [],
    selectedTopic:     "",
    questionsPerPlayer: 3,
    answersLog:        [],
    currentPlayerIndex: 0,
    timePerQuestion:   10 
  };

  const allQuestions = {
    html: [
      {
        question: "What does HTML stand for?",
        answers: [
          "Hyper Text Markup Language",
          "Hot Mail",
          "How to Make Lasagna",
          "Home Tool Markup Language"
        ],
        correct: 0
      },
      {
        question: "Who is making the Web standards?",
        answers: [
          "The World Wide Web Consortium",
          "Microsoft",
          "Mozilla",
          "Google"
        ],
        correct: 0
      },
      {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: [
          "<script>",
          "<style>",
          "<css>",
          "<html>"
        ],
        correct: 1
      },
      {
        question: "Choose the correct HTML element for the largest heading:",
        answers: [
          "<head>",
          "<heading>",
          "<h6>",
          "<h1>"
        ],
        correct: 3
      },
      {
        question: "Which character is used to indicate an end tag?",
        answers: ["/", "<", "#", "*"],
        correct: 0
      },
      {
        question: "Who invented HTML?",
        answers: [
          "Tim Berners-Lee",
          "Steve Jobs",
          "Bill Gates",
          "Mark Zuckerberg"
        ],
        correct: 0
      },
      {
        question: "This tag is used to create paragraphs in my web page:",
        answers: [
          "<BR>",
          "<P>",
          "<HR>",
          "<HTML>"
        ],
        correct: 1
      }
    ],
    css: [
      {
        question: "CSS colors can take the form of all except:",
        answers: [
          "a color name",
          "an RGBa value",
          "a hex code",
          "monochromatic value"
        ],
        correct: 3
      },
      {
        question: "What does CSS stand for?",
        answers: [
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Colorful Style Sheets",
          "Computer Style Sheets"
        ],
        correct: 1
      },
      {
        question: "Which HTML attribute is used to define inline styles?",
        answers: [
          "class",
          "font",
          "style",
          "styles"
        ],
        correct: 2
      },
      {
        question: "Which property is used to change the background color?",
        answers: [
          "bgcolor",
          "background-color",
          "color",
          "backgroundStyle"
        ],
        correct: 1
      },
      {
        question: "Which property is used to change the font of an element?",
        answers: [
          "font-family",
          "font-weight",
          "font-style",
          "text-style"
        ],
        correct: 0
      },
      {
        question: "How do you select an element with id 'demo' in CSS?",
        answers: [
          "*demo",
          ".demo",
          "demo",
          "#demo"
        ],
        correct: 3
      }
    ],
    js: [
      {
        question: "What will be logged to the console?",
        image: "hminteresting.jpg",
        answers: [
          "2015",
          "2016",
          "2017",
          "2018"
        ],
        correct: 1
      },
      {
        question: "Loops are the part of the program that...",
        answers: [
          "Repeats",
          "Remembers",
          "Chooses",
          "Varies"
        ],
        correct: 0
      },
      {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
          "<script>",
          "<js>",
          "<javascript>",
          "<scripting>"
        ],
        correct: 0
      },
      {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
          "Both <head> and <body>",
          "Only <head>",
          "Only <body>",
          "Nowhere"
        ],
        correct: 0
      },
      {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answers: [
          "<script src='xxx.js'>",
          "<script name='xxx.js'>",
          "<script href='xxx.js'>",
          "<script file='xxx.js'>"
        ],
        correct: 0
      },
      {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
          "alert('Hello World');",
          "prompt('Hello World');",
          "alertBox('Hello World');",
          "msgBox('Hello World');"
        ],
        correct: 0
      },
      {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [
          "onmouseover",
          "onchange",
          "onclick",
          "onmouseclick"
        ],
        correct: 2
      }
    ]
  };

  function saveGameData() {
    localStorage.setItem("gameData", JSON.stringify(gameData));
  }
  function loadGameData() {
    const saved = localStorage.getItem("gameData");
    if (saved) {
      gameData = JSON.parse(saved);
    }
  }

  goToNamesBtn.addEventListener("click", function () {
    const numPlayersValue = +document.getElementById("num-players").value;
    const topicValue      = document.getElementById("quiz-topic").value;
    const qPerPlayerValue = +document.getElementById("questions-per-player").value;

    gameData.selectedTopic      = topicValue;
    gameData.questionsPerPlayer = qPerPlayerValue;

    playerInputsContainer.innerHTML = "";
    for (let i = 1; i <= numPlayersValue; i++) {
      const input = document.createElement("input");
      input.type  = "text";
      input.placeholder = `Enter name for Player ${i}`;
      input.classList.add("player-input");
      playerInputsContainer.appendChild(input);
    }

    startScreen.classList.remove("active");
    startScreen.classList.add("hidden");
    playerSetupScreen.classList.remove("hidden");
    playerSetupScreen.classList.add("active");
  });

  backToStartBtn.addEventListener("click", function(){
    playerSetupScreen.classList.remove("active");
    playerSetupScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    startScreen.classList.add("active");
  });

  confirmPlayersBtn.addEventListener("click", function () {
    const inputs = document.querySelectorAll(".player-input");
    const names  = Array.from(inputs).map(i => i.value.trim());

    if (names.some(name => name === "")) {
      alert("Please fill in all player names!");
      return;
    }

    const colors = ["#ffcc00", "#66ff66", "#66ffff", "#ff99ff"];
    gameData.players = names.map((n, idx) => ({
      name: n,
      score: 0,
      color: colors[idx % colors.length],
      questions: []
    }));

    prepareQuestionsForPlayers();

    gameData.currentPlayerIndex = 0;
    gameData.answersLog = [];
    saveGameData();

    playerSetupScreen.classList.remove("active");
    playerSetupScreen.classList.add("hidden");
    countdownScreen.classList.remove("hidden");
    countdownScreen.classList.add("active");

    let countdown = 5;
    countdownTimer.textContent = countdown;

    countdownTimer.classList.add("countdown-animate");

    const countdownInterval = setInterval(() => {
      countdown--;
      countdownTimer.textContent = countdown;

      if (countdown <= 0) {
        clearInterval(countdownInterval);

        countdownTimer.classList.remove("countdown-animate");

        countdownScreen.classList.remove("active");
        countdownScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");
        quizScreen.classList.add("active");
        startQuiz();
      }
    }, 1000);
  });

  function prepareQuestionsForPlayers() {
    let fullSet = [];
    if (gameData.selectedTopic === "mixed") {
      fullSet = [...allQuestions.html, ...allQuestions.css, ...allQuestions.js];
    } else {
      fullSet = [...allQuestions[gameData.selectedTopic]];
    }

    shuffleArray(fullSet);

    const totalNeeded = gameData.players.length * gameData.questionsPerPlayer;
    while (fullSet.length < totalNeeded) {
      fullSet = fullSet.concat(fullSet);
    }

    let index = 0;
    gameData.players.forEach(player => {
      player.questions = fullSet.slice(index, index + gameData.questionsPerPlayer);
      index += gameData.questionsPerPlayer;
    });
  }

  function startQuiz() {
    showQuestion();
  }

  function showQuestion() {
    if (allQuestionsExhausted()) {
      endGame();
      return;
    }

    if (timer) clearInterval(timer);

    const currentPlayer = gameData.players[gameData.currentPlayerIndex];
    playerTurnElement.textContent = currentPlayer.name;
    playerTurnElement.style.color = currentPlayer.color;

    document.documentElement.style.setProperty("--selected-color", currentPlayer.color);

    if (currentPlayer.questions.length === 0) {
      gameData.currentPlayerIndex++;
      if (gameData.currentPlayerIndex >= gameData.players.length) {
        gameData.currentPlayerIndex = 0;
      }
      showQuestion();
      return;
    }

    const currQuestion = currentPlayer.questions.shift();
    questionTextContainer.innerHTML = "";

    if (currQuestion.image) {
      const imgElement = document.createElement("img");
      imgElement.src = currQuestion.image;
      imgElement.alt = "Question Image";
      imgElement.style.maxWidth = "100%";
      imgElement.style.marginBottom = "10px";
      questionTextContainer.appendChild(imgElement);
    }

    const textElement = document.createElement("p");
    textElement.textContent = currQuestion.question;
    textElement.style.fontSize = "18px";
    questionTextContainer.appendChild(textElement);

// Output of answer options
    answerContainer.innerHTML = "";
    currQuestion.answers.forEach(ans => {
      const btn = document.createElement("button");
      btn.classList.add("answer-btn");
      btn.textContent = ans;
      btn.addEventListener("click", () => {
        document.querySelectorAll(".answer-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
      answerContainer.appendChild(btn);
    });

    gameData.currentQuestion = currQuestion;
    gameData.selectedAnswer = null;

    // turn on 10-seconds timer
    let timeLeft = gameData.timePerQuestion;
    timeLeftDisplay.textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      timeLeftDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        submitAnswer(true, currQuestion);
      }
    }, 1000);
  }

  function allQuestionsExhausted() {
    return gameData.players.every(p => p.questions.length === 0);
  }

  submitAnswerBtn.addEventListener("click", () => {
    if (gameData.currentQuestion) {
      submitAnswer(false, gameData.currentQuestion);
    }
  });

  function submitAnswer(timeExpired, currQuestion) {
    if (timer) clearInterval(timer);

    const currentPlayer = gameData.players[gameData.currentPlayerIndex];
    const selectedBtn = document.querySelector(".answer-btn.selected");

    let selectedIndex = -1;
    let selectedAnswerText = "No answer";

    if (selectedBtn) {
      const allBtns = [...document.querySelectorAll(".answer-btn")];
      selectedIndex = allBtns.indexOf(selectedBtn);
      selectedAnswerText = currQuestion.answers[selectedIndex] || "No answer";
    }

    const correctAnswerText = currQuestion.answers[currQuestion.correct] || "No correct answer";

    let isCorrect = false;
    if (!timeExpired && selectedIndex === currQuestion.correct) {
      isCorrect = true;
      currentPlayer.score += 10;
    }

    gameData.answersLog.push({
      playerName: currentPlayer.name,
      question: currQuestion.question,
      correctAnswer: correctAnswerText,
      selectedAnswer: selectedAnswerText,
      isCorrect: isCorrect
    });

    //the next player
    gameData.currentPlayerIndex++;
    if (gameData.currentPlayerIndex >= gameData.players.length) {
      gameData.currentPlayerIndex = 0;
    }

    // Проверяем завершение
    if (allQuestionsExhausted()) {
      endGame();
    } else {
      showQuestion();
    }

    saveGameData();
  }

  function endGame() {
    quizScreen.classList.remove("active");
    quizScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    endScreen.classList.add("active");

    const sorted = [...gameData.players].sort((a,b) => b.score - a.score);
    const topScore = sorted[0].score;
    const winners = sorted.filter(p => p.score === topScore);

    if (winners.length === 1) {
      winnerMessage.innerHTML = `Winner: <strong>${winners[0].name}</strong> with ${winners[0].score} points!<br><br>`;
    } else {
      const tiedNames = winners.map(w => w.name).join(", ");
      winnerMessage.innerHTML = `Tie! Winners: <strong>${tiedNames}</strong> with ${topScore} points!<br><br>`;
    }

    winnerMessage.innerHTML += sorted.map((p,i) => 
      `${i+1}. ${p.name} - ${p.score} points`
    ).join("<br>");

    saveGameData();
  }

  reviewAnswersBtn.addEventListener("click", function () {

    endScreen.classList.remove("active");
    endScreen.classList.add("hidden");
    reviewScreen.classList.remove("hidden");
    reviewScreen.classList.add("active");
  
    answersLogContainer.innerHTML = "";
  
    answersLogContainer.style.display = "flex";
    answersLogContainer.style.flexWrap = "wrap";
    answersLogContainer.style.justifyContent = "space-around";
  
    gameData.players.forEach((player) => {

      const columnDiv = document.createElement("div");
      columnDiv.style.backgroundColor = "#222";   
      columnDiv.style.padding = "10px";
      columnDiv.style.margin = "10px";
      columnDiv.style.borderRadius = "8px";
      columnDiv.style.flex = "1 1 200px"; 
  
      // Column header with player name
      const heading = document.createElement("h3");
      heading.textContent = player.name + "'s Answers";
      heading.style.color = player.color; 
      columnDiv.appendChild(heading);
  
      // Filter the general log, take only the responses of a specific player
      const playerAnswers = gameData.answersLog.filter(
        (item) => item.playerName === player.name
      );
  
      playerAnswers.forEach((logItem, index) => {
        const color = logItem.isCorrect ? "#66ff66" : "#ff6666";
        const escapeHTML = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
        const answerDiv = document.createElement("div");
        answerDiv.style.marginBottom = "15px";
  
        answerDiv.innerHTML = `
          <strong>Q${index + 1}:</strong> ${escapeHTML(logItem.question)}<br/>
          <em style="color:green;">Correct: ${escapeHTML(logItem.correctAnswer)}</em><br/>
          <span style="color:${color};">
            Your Answer: ${escapeHTML(logItem.selectedAnswer)}
          </span>
        `;
        columnDiv.appendChild(answerDiv);
      });
  
      answersLogContainer.appendChild(columnDiv);
    });
  });  

  backToEndBtn.addEventListener("click", function () {
    reviewScreen.classList.remove("active");
    reviewScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    endScreen.classList.add("active");
  });

  restartGameBtn.addEventListener("click", function () {
    localStorage.removeItem("gameData");
    location.reload();
  });

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  loadGameData();
});
