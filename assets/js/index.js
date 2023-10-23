// INDEX PAGE

const audio = document.querySelector('audio');
const volumeButton = document.getElementById('volumeButton');
const volumeIcon = document.getElementById('volumeIcon');
let playMusic = true;


// Mute and mute index page
function toggleAudio() {
  if (audio.paused) {
      audio.play();
      volumeIcon.classList.remove('fa-volume-mute');
      volumeIcon.classList.add('fa-volume-high');
  } else {
      audio.pause();
      volumeIcon.classList.remove('fa-volume-high');
      volumeIcon.classList.add('fa-volume-mute');
  }
}


// Variables for modal box
const closeInstructions = document.getElementById('close-instructions');
const rulesModal = document.getElementById('rules');

// Close instructions when clicking on button
closeInstructions.onclick = function () {
  rulesModal.style.display = "none";
};

// Start of Score section
//Read scores.json with Fetch API

const Errors = document.getElementById("error");

function get_scores(callback) {
  let file = "scores.json"
  fetch(file, {cache: 'no-cache'})
    .then(function(response){
      //If the response is not OK
      if(response.status !== 200){
        Errors.innerHTML = response.status;
      }
      //If the response is OK
      response.json().then(function(data){
        let scores = JSON.stringify(data);
        console.log(scores);
        callback(scores);
      });
    })
    // If there is an error
    .catch(function(err){
      Errors.innerHTML = err;
    })
}

// Display High Score List

const List = document.getElementById("highscores");

var list_scores = function (scores) {
  let object = JSON.parse(scores);
  //lowest score saved for later
  let lowest_score = object[9].score;
  document.getElementById("lowscore").value = lowest_score;

  //for loop
  for (let i=0; i<object.length; i++) {
    // console.log(object[i]);
    let li = document.createElement("LI");
    let text = document.createTextNode(object[i].name + " ... " + object[i].score)
    li.appendChild(text);
    List.appendChild(li);

    if(i===0) {
      li.setAttribute("class","top1");
    }
    if(i===1) {
      li.setAttribute("class","top2");
    }
    if(i===2) {
      li.setAttribute("class","top3");
    }

  }
}

//reload stuff
function resetForm() {
  while(list.hasChildNodes()) {
    List.removeChild(List.firstChild)
  }
  // fetch data and make high score list
  get_scores(list_scores);
  // reset stuff
  document.getElementById("score").value = 0;
  score = 0;
}

// Submit Form

//listen for clicking the submit button
myform.addEventListener("submit", function(event){
  //don't reload page
  event.preventDefault();

  // lowest high score
  var tenth_score = document.getElementById("lowscore").value;

  //if the player made the hs list, change message gif
  if (score > tenth_score) {
    document.getElementById("message").src="images/highscore.gif";
    document.getElementById("message").alt="You made it on the high score list!";
  }
  else {
    document.getElementById("message").src="images/good-luck.gif";
    document.getElementById("message").alt="Good luck chump!";
  }

  // form data object
  var formData = new FormData(this);

  //POST fetch request
  fetch("dice.php", {
    method: "post",
    body: formData
  })
  .then (function(response){
    return response.text();
  })
  .then (function (text) {
    resetForm();
    console.log(text);
  })
  .catch(function (err) {
    Errors.innerHTML = err;
  })
})

// End scores section