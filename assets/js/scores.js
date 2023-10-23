function getScores() {
  fetch("https://gameapi-6a6d01858040.herokuapp.com/scores")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } 
    })
    .then((data) => {
      if (data && data.top_scores && Array.isArray(data.top_scores)) {
        const highscoresList = document.getElementById("highscores");
        highscoresList.innerHTML = "";
        data.top_scores.forEach((score, index) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${score.name}: ${score.score}`;
          highscoresList.appendChild(listItem);
        });
      } 
    })
    .catch((error) => {
    });
}


function addScore(name, score) {
  const apiUrl = `https://gameapi-6a6d01858040.herokuapp.com/scores/${name}/${score}`;

  const requestData = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(apiUrl, requestData)
    .then((response) => {
      if (response.ok) {
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
    });
}


function saveScore() {
  // Get the player's name and score from the HTML form
  const playerName = document.getElementById("player_name").value;
  const playerScore = document.getElementById("player_score").value;

  // Call the addScore function with the extracted values
  addScore(playerName, playerScore);
}
