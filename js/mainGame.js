//mainGame.js
//By: Gabriel Sessions
//Purpose: Sets up an online cookie clicker game users can join from a lobby
//Note: There are references to other files in this project (JS functions, CSS, and the main HTML page)

var numOfCookieClicks = 0;

//Initializes a countdown for the game to begin!
function countdown(){
    var directionsDiv = document.createElement('div');
    directionsDiv.setAttribute('id', 'directionsDiv');
    directionsDiv.setAttribute('class', 'logon');
    
    var numbersCount = document.createElement('h2');
    numbersCount.setAttribute('id', 'numbersCount');
    numbersCount.innerHTML = "Game Starts in 5";

    document.getElementById('logonMessage').innerHTML = "Game Started"

    countNumbers(4);

    directionsDiv.append(numbersCount);
    document.body.appendChild(directionsDiv);

    myAirtable3.createEntry("Player" + playerNumber, username);

}

//In game countdown timer while clicking

//Does the counting for the countdown for the game to begin
function countNumbers (curNum){
    setTimeout(() => {

        document.getElementById('numbersCount').innerHTML = "Game Starts in " + curNum;
        if (curNum == 0){
            document.getElementById('numbersCount').innerHTML = "Start clicking!";
            //document.getElementById('directionsDiv').append(document.createElement("br"));

            var timerElement = document.createElement('h3');
            timerElement.setAttribute('id', 'timerElement');
            timerElement.innerHTML = "Time Left: 15"

            //15 Seconds on Timer

            var timerDiv = document.createElement('div');
            timerDiv.setAttribute('id', 'timerDiv');
            timerDiv.setAttribute('class', 'logon');
            timerDiv.append(timerElement);
            document.body.appendChild(timerDiv)

            timer(14);


            //Create cookie to click
            var cookieDiv = document.createElement('div');
            cookieDiv.setAttribute('id', 'cookieDiv');
            cookieDiv.setAttribute('class', 'logon')

            var scoreDisplay = document.createElement('h4');
            scoreDisplay.setAttribute('id', 'scoreDisplay');
            scoreDisplay.innerHTML = "Score: 0";

            var cookiePic = document.createElement('input');
            cookiePic.setAttribute('id', 'cookieImg');
            cookiePic.setAttribute('type', 'image');
            cookiePic.setAttribute('src', './img/chocoCookie.png');
            cookiePic.setAttribute('class', 'cookiePic');
            cookiePic.setAttribute('onclick', 'cookieClick()');

            cookieDiv.append(scoreDisplay);
            cookieDiv.append(cookiePic);
            document.body.append(cookieDiv);

            
            

        }
        else{
            countNumbers(curNum-1);
        }
        


    }, 1000);
}


//Shows the time left in the current game
function timer (time){
    setTimeout(() => {
        //console.log(time);

        document.getElementById('timerElement').innerHTML = "Time Left: " + time;
        if (time == 0){
            document.getElementById('timerElement').innerHTML = "Time is up!";
            document.getElementById('numbersCount').remove();
            document.getElementById('cookieImg').remove();

            myAirtable2.createEntry("Player" + playerNumber, numOfCookieClicks);
            
            
            document.body.innerHTML += '<div style = "text-align: center;" id = "tempResults"><h3>Waiting for Results</h3></div>';

            

            setTimeout(() => {
                document.getElementById("tempResults").remove();
                getResults();
            }, 10000);

            //Upload results to database
            
        }
        else{
            if (time == 5){
                document.getElementById('numbersCount').innerHTML = "Almost Done!";
            }
            timer(time-1);
        }
        


    }, 1000);

}

//Acts as a counter of clicks
function cookieClick(){
    numOfCookieClicks ++;
    document.getElementById('scoreDisplay').innerHTML = "Score: " + numOfCookieClicks;
}


//Calculates and displays results of the race
function getResults(){
    
    
    var scores = [];
    
    
    //Assumes 1000 potential numbers
    for (let i = 0; i < 1000; i++){
        try{
            scores.push([i, myAirtable2.getEntryValue("Player"+i)]);
        }
        catch{
            //console.log("Player" + i + " not avaliable");
        }
    }

    //Search for the highest score
    var winners = maximum_search(scores);
    var winnersText = "Winner(s): ";
    console.log(winners);
    console.log(winners[0][1]);
    //Display winners to players
    for (var k = 0; k < winners.length; k++){
        let winnersName = myAirtable3.getEntryValue('Player' + winners[k][0]);
        if (k == winners.length - 1){
            winnersText += winnersName;
        }
        else{
            winnersText += winnersName + ", ";
        }
    }
    console.log(winnersText);

    setTimeout(() => {

        var winnersDiv = document.createElement('div');
        winnersDiv.setAttribute('class', 'logon');
        winnersDiv.setAttribute('id', 'winnersDiv');

        var winnersAnnouncement = document.createElement('h3');
        winnersAnnouncement.innerHTML = winnersText;

        winnersDiv.append(winnersAnnouncement);
        document.body.appendChild(winnersDiv);

        setTimeout(() => {
            //resetAll();
            returnToLobbyButton(scores);
        }, 2000);
        
    }, 500);
    
}

//Takes in a 2d array and returns the set with the largest second value (score)
//Return value is an array
function maximum_search(array){
    //console.log(array);
    var maximum = [["None", -1]];
    var maximum_value = -1;
    for (let j = 0; j < array.length; j++){
        //console.log(array[j][1]);
        if (array[j][1] > maximum_value){
            maximum = [array[j]];
            maximum_value = array[j][1];
        }
        else if (array[j][1] == maximum_value){
            maximum.push(array[j]);
        }
    }

    console.log(maximum);
    return maximum;
}

//Creates a button that allows the user to return to the lobby after a game
function returnToLobbyButton(scores){
    var buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('id', 'returnToLobbyDiv');
    buttonDiv.setAttribute('class', 'logon');
    
    var returnButton = document.createElement('button');
    returnButton.setAttribute('class', 'button1');
    returnButton.setAttribute('onclick', 'returnToLobby('+ scores +')');
    returnButton.innerHTML = "Return to Lobby";

    buttonDiv.append(returnButton);
    document.body.appendChild(buttonDiv);
    resetAll();

}

//Reset all game features 
function returnToLobby(playersToReset){
    document.getElementById('returnToLobbyDiv').remove();
    document.getElementById('timerDiv').remove();
    document.getElementById('winnersDiv').remove();
    document.getElementById('cookieDiv').remove();
    joinedLobby = false;
    joinedGame = false;
    noStoredName('You may change your username here:');
    joinGameLobby();

}


