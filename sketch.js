let currentScreen = 0; // 0: Start, 1: Quiz, 2: Quiz Results, 3: Game
let treeCount = 0;
let treePositions = []; // Stores objects like {x: mouseX, y: mouseY}
let gameMessage = "Clique para plantar sua primeira árvore! 🌱";

// Quiz variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let feedbackMessage = "";
let feedbackColor;

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, TOP); // Default text alignment for general text

  // Initialize quiz questions
  questions = [
    {
      question: "Qual é a importância das árvores para o meio ambiente?",
      options: [
        "Elas produzem oxigênio",
        "Elas causam poluição",
        "Elas servem apenas para decoração",
        "Elas não têm função importante"
      ],
      answer: "Elas produzem oxigênio"
    },
    {
      question: "O que podemos fazer para ajudar a preservar as florestas?",
      options: [
        "Cortar mais árvores",
        "Reciclar e reduzir o consumo",
        "Jogar lixo na natureza",
        "Ignorar o problema"
      ],
      answer: "Reciclar e reduzir o consumo"
    },
    {
      question: "Como o desmatamento afeta o clima global?",
      options: [
        "Não tem impacto no clima",
        "Diminui a temperatura global",
        "Contribui para o aquecimento global",
        "Aumenta a quantidade de chuva"
      ],
      answer: "Contribui para o aquecimento global"
    },
    {
      question: "Qual dos seguintes é um exemplo de energia renovável?",
      options: [
        "Carvão mineral",
        "Petróleo",
        "Energia solar",
        "Gás natural"
      ],
      answer: "Energia solar"
    },
    {
      question: "Por que a reciclagem é importante para a sustentabilidade?",
      options: [
        "Aumenta o lixo nos aterros",
        "Diminui a necessidade de novas matérias-primas",
        "Gasta mais energia que produzir do zero",
        "Não tem impacto real"
      ],
      answer: "Diminui a necessidade de novas matérias-primas"
    },
    {
      question: "O que significa 'pegada de carbono'?",
      options: [
        "O tamanho do seu pé no chão",
        "A quantidade de carbono que você emite",
        "Um tipo de solo",
        "A marca de um pneu"
      ],
      answer: "A quantidade de carbono que você emite"
    },
    {
      question: "Qual é uma boa prática para economizar água em casa?",
      options: [
        "Deixar a torneira aberta ao escovar os dentes",
        "Tomar banhos longos e demorados",
        "Consertar vazamentos rapidamente",
        "Lavar o carro com mangueira aberta"
      ],
      answer: "Consertar vazamentos rapidamente"
    },
    {
      question: "Por que devemos proteger a biodiversidade?",
      options: [
        "Para ter mais animais de estimação",
        "Para garantir o equilíbrio dos ecossistemas",
        "Não há motivo, espécies sempre morrem",
        "Apenas por estética"
      ],
      answer: "Para garantir o equilíbrio dos ecossistemas"
    },
    {
      question: "O que é consumo consciente?",
      options: [
        "Comprar tudo o que quiser sem pensar",
        "Refletir sobre o impacto de suas compras no meio ambiente",
        "Consumir apenas produtos caros",
        "Nunca comprar nada novo"
      ],
      answer: "Refletir sobre o impacto de suas compras no meio ambiente"
    },
    {
      question: "Qual o principal gás responsável pelo efeito estufa?",
      options: [
        "Oxigênio",
        "Nitrogênio",
        "Metano",
        "Dióxido de carbono (CO2)"
      ],
      answer: "Dióxido de carbono (CO2)"
    }
  ];
}

function draw() {
  if (currentScreen === 0) {
    drawStartScreen();
  } else if (currentScreen === 1) {
    drawQuizScreen();
  } else if (currentScreen === 2) {
    drawQuizResultsScreen();
  } else if (currentScreen === 3) {
    drawGameScreen();
  }
}

function drawStartScreen() {
  background(150, 200, 255); // Light blue background
  fill(0);
  textSize(40);
  text("Bem-vindo ao Plantador de Árvores! 🌳", width / 2, height / 2 - 80);
  textSize(24);
  text("Clique para começar o quiz sobre sustentabilidade.", width / 2, height / 2 + 20);
}

function drawQuizScreen() {
  background(200, 255, 200); // Greenish background for quiz
  fill(0);
  textSize(24); // Tamanho da fonte do título da pergunta

  let q = questions[currentQuestionIndex];
  text(q.question, width / 2, 80);

  let buttonWidth = 400;
  let buttonHeight = 60;
  let buttonX = width / 2 - buttonWidth / 2;
  let optionY = height / 2 - 100;

  for (let i = 0; i < q.options.length; i++) {
    let buttonY = optionY + i * 80;

    // Draw buttons
    fill(50, 150, 50); // Button color
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 10); // Rounded corners
    fill(255); // Text color for options
    textSize(14); // <-- Tamanho da fonte das opções (respostas) alterado para 14 aqui
    text(q.options[i], width / 2, buttonY + buttonHeight / 2 - 10); // Adjust text position

    // Change color on hover
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
      fill(70, 170, 70); // Darker green on hover
      rect(buttonX, buttonY, buttonWidth, buttonHeight, 10);
      fill(255);
      text(q.options[i], width / 2, buttonY + buttonHeight / 2 - 10);
    }
  }

  // Display feedback message
  if (feedbackMessage) {
    fill(feedbackColor);
    textSize(24);
    text(feedbackMessage, width / 2, height - 80);
  }
}

function drawQuizResultsScreen() {
  background(255, 220, 150); // Yellowish background for results
  fill(0);
  textSize(40);
  text("Quiz Concluído! 🎉", width / 2, height / 2 - 80);
  textSize(32);
  text(`Você acertou ${score} de ${questions.length} perguntas.`, width / 2, height / 2);
  textSize(24);
  text("Clique para ir para o jogo de plantar árvores!", width / 2, height / 2 + 100);
}

function drawGameScreen() {
  background(100, 180, 100); // Game background (green)
  fill(0); // Main text color

  textSize(32);
  text("Hora de plantar árvores! 🌳", width / 2, 50);
  textSize(24);
  text("Clique em qualquer lugar para plantar uma árvore.", width / 2, 100);
  text("Árvores plantadas: " + treeCount, width / 2, 150);

  // --- Drawing context for tree emojis ---
  push();
  textSize(40); // Larger size for the tree emoji
  // Align the emoji.
  // CENTER: horizontally centered at the click's x
  // BOTTOM: the base of the text (emoji) will be at the click's y coordinate
  textAlign(CENTER, BOTTOM);

  for (let i = 0; i < treePositions.length; i++) {
    let pos = treePositions[i];
    text("🌳", pos.x, pos.y);
  }
  pop(); // Restore previous drawing state

  fill(0); // Ensures the text below is black
  textSize(20);
  text(gameMessage, width / 2, height - 50);
}

function mousePressed() {
  if (currentScreen === 0) {
    currentScreen = 1; // Start quiz
  } else if (currentScreen === 1) {
    checkAnswer();
  } else if (currentScreen === 2) {
    currentScreen = 3; // Start game
  } else if (currentScreen === 3) {
    // Game logic for planting trees
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      treeCount++;
      // Store the current mouse position in the treePositions array
      treePositions.push({ x: mouseX, y: mouseY });
      gameMessage = "Mais uma semente plantada! 🌱";
    }
  }
}

function checkAnswer() {
  let q = questions[currentQuestionIndex];
  let buttonWidth = 400; // Increased button width for better clickability
  let buttonHeight = 60; // Increased button height
  let buttonX = width / 2 - buttonWidth / 2;
  let optionY = height / 2 - 100; // Adjusted starting Y for options

  for (let i = 0; i < q.options.length; i++) {
    let buttonY = optionY + i * 80; // Increased spacing between buttons
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
      if (q.options[i] === q.answer) {
        score++;
        feedbackMessage = "Correto! 🎉";
        feedbackColor = color(0, 150, 0); // Green for correct
      } else {
        feedbackMessage = "Incorreto. A resposta certa era: " + q.answer + " 🙁";
        feedbackColor = color(150, 0, 0); // Red for incorrect
      }

      // Delay to show feedback and move to the next question
      setTimeout(() => {
        currentQuestionIndex++;
        feedbackMessage = ""; // Clear feedback
        if (currentQuestionIndex < questions.length) {
          // Stay on quiz screen for next question
        } else {
          currentScreen = 2; // End of quiz, go to results screen
        }
      }, 1500); // 1.5 seconds feedback
      return; // Add return to exit the function after an answer is clicked
    }
  }
}

//Créditos á inteliência artificial (Gemini);