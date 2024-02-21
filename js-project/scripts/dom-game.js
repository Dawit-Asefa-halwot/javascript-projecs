let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
updateScoreElement();
/*
      if (!score) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0,
        };
      }
      */
     let isAutoPlaying = false;

     let intervalId;
      function autoPlay(){
        if(!isAutoPlaying)
        {
          intervalId = setInterval(function(){
            const playerMove = pickComputerMove();
               playGame(playerMove);
             },1000);

             isAutoPlaying = true;
             document.querySelector('.auto-play-button').innerHTML = 'Stop Play';
            
        }else {
         
clearInterval(intervalId);
isAutoPlaying = false;
document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
        }
      
      }


      document.addEventListener('keydown',(event) => {

if (event.key === 'r'){

  playGame("ROCK");
}
else if (event.key === 'p'){

  playGame("paper");
}
else if (event.key === 's'){

  playGame("scissor");
}
else if (event.key === 'Enter')
{
  autoPlay();
}

      })
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "SCISSOR") {
    if (computerMove === "ROCK") {
      result = "YOU LOSE.";
    } else if (computerMove === "PAPER") {
      result = "YOU WIN.";
    } else {
      result = "TIE.";
    }
  } else if (playerMove === "PAPER") {
    if (computerMove === "ROCK") {
      result = "YOU WIN.";
    } else if (computerMove === "PAPER") {
      result = "TIE.";
    } else {
      result = "YOU LOSE.";
    }
  } else if (playerMove === "ROCK") {
    if (computerMove === "ROCK") {
      result = "TIE.";
    } else if (computerMove === "PAPER") {
      result = "YOU LOSE.";
    } else {
      result = "YOU WIN.";
    }
  }

  if (result === "YOU WIN.") {
    score.wins += 1;
  } else if (result === "YOU LOSE.") {
    score.losses += 1;
  } else if (result === "TIE.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `YOU
<img src="image/${playerMove}-emoji.png"  class="move-icon" >
<img src="image/${computerMove}-emoji.png" class="move-icon" >
COMPUTER `;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `WINS: ${score.wins},  LOSSES: ${score.losses}, TIES: ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "ROCK";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "PAPER";
  } else {
    computerMove = "SCISSOR";
  }
  return computerMove;
}