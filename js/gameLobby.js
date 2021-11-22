//gameLobby.js
//By: Gabriel Sessions
//Purpose: Sets up an online lobby for players to join a game
//Note: There are references to other files in this project (JS functions, CSS, and the main HTML page)

//GAME STATUS NUMBERS
//0 = Lobby is open
//1 = Game in progress

var joinedLobby = false;
var joinedGame = false;
var lobbyCountInterval;
var checkGM;
var isGamemaster = false;

//Assign Random Number 0 to 999 as player ID
var playerNumber = Math.floor(Math.random() * 1000);



//Only works if inside another function
//Checks if player ID matches an already used player ID
//If match exists, played ID value is reassigned to an unused one
function checkPlayerID(){
    var entryValue = "Player" + playerNumber;

    //Runs until error!
    try{
        while (true){
            console.log(myAirtable2.getEntryValue(entryValue) + " already exists");
            playerNumber = Math.floor(Math.random() * 1000);
            entryValue = "Player" + playerNumber;
        } 
    }
    catch{
        console.log(playerNumber);
    }
    
}

//Checks if there if the lobby is open. If open, the user can join a game.
function joinGameLobby(){
    
    if (!joinedLobby){
        joinedLobby = true;
        
        var interval = window.setInterval(() => {
            gameStatus = myAirtable.getEntryValue("GameStatus");
            if (gameStatus == 0){
                document.getElementById('logonMessage').innerHTML = "Game Satus: Connected to Airtable, Ready to Join a Game!"
                joinGame();
                clearInterval(interval);
            }
            else{
                document.getElementById('logonMessage').innerHTML = "Game Satus: Connected to Airtable, Game Currently in progress. <br> Please wait for the next game.";
            }
            

        }, 100)
        
    }
    
}

//When the looby is open, the user will be able to join the game using a button
function joinGame(){
    var joinGameDiv = document.createElement('div');
    joinGameDiv.setAttribute('id', 'joinGameDiv');
    joinGameDiv.setAttribute('class', 'logon');

    var lobbyCount = document.createElement('h3');
    lobbyCount.setAttribute('id', 'lobbyCount');

    lobbyCountInterval = window.setInterval(() => {
        var numPlayers = myAirtable.getEntryValue('NumPlayers');
        document.getElementById('lobbyCount').innerHTML = "Number of Players in Lobby: " + numPlayers;
    }, 100);

    

    var joinGameButton = document.createElement('button');
    joinGameButton.setAttribute('class', 'button1');
    joinGameButton.setAttribute('id', 'joinGameButton');
    joinGameButton.setAttribute('onclick', 'joinLeaveGame()');
    joinGameButton.innerHTML = "Join Game";

    joinGameDiv.innerHTML += "<br>"

    joinGameDiv.append(lobbyCount);

    joinGameDiv.innerHTML += "<br>"

    joinGameDiv.append(joinGameButton);


    document.body.appendChild(joinGameDiv);
    

}





//Either the user to join or leave game
function joinLeaveGame(){
    

    //console.log(myAirtable.getEntryValue('NumPlayers') + ", " + joinedGame);
    if (myAirtable.getEntryValue("GameStatus") == 0){

        checkPlayerID();

        //If number of players is less than zero, the counter resets to zero

        //If in game, button will allow user to leave game
        if (joinedGame){
            joinedGame = false;
            document.getElementById('joinGameButton').innerHTML = "Join Game";
            if (myAirtable.getEntryValue('NumPlayers') > 0){
                myAirtable.setEntryValueStrict('NumPlayers', myAirtable.getEntryValue('NumPlayers') - 1);
            }
            
            document.getElementById("logonMessage").innerHTML = "Game Satus: Connected to Airtable, Waiting to Join Game";

            try{
                document.getElementById('startGameButton').remove();
            }
            catch{

            }

            //remove gamemaster controls if gamemaster
            if (isGamemaster){
                isGamemaster = false;
                myAirtable.setEntryValueStrict('Gamemaster', 'null');

            }

            else{
                document.getElementById('gamemasterDisplay').remove();
                clearInterval(checkGM);
            }
            

        }

        //If not in game, button will allow user to join the game
        else if (!joinedGame){
            joinedGame = true;

            //Make the first player to join a game the gamemaster
            //If there is no gamemaster, next to join becomes gamemaster
            if (myAirtable.getEntryValue('NumPlayers') == 0 || myAirtable.getEntryValue('Gamemaster') == ''){
                gameMasterControls();
            }

            //Displays who is gamemaster
            else{
                console.log("running!");
                var divGamemasterDisplay = document.createElement('div');
                divGamemasterDisplay.setAttribute('class', 'logon');
                divGamemasterDisplay.setAttribute('id', 'divGM');

                var gamemasterDisplay = document.createElement('h3');
                gamemasterDisplay.setAttribute('id', 'gamemasterDisplay')
                gamemasterDisplay.innerHTML = "Waiting for " + myAirtable.getEntryValue('Gamemaster') + " to start the game";

                divGamemasterDisplay.append(gamemasterDisplay);
                document.body.appendChild(divGamemasterDisplay);

                //While in lobby check who is gamemaster
                
                checkGM = setInterval(() => {
                    var displayText = "Waiting for " + myAirtable.getEntryValue('Gamemaster') + " to start the game";
                    var curText = document.getElementById('gamemasterDisplay').innerHTML;
                    if (displayText != curText){
                        curText = displayText;
                    }
                    
                }, 100); 
            }

            document.getElementById('joinGameButton').innerHTML = "Leave Game";
            myAirtable.setEntryValueStrict('NumPlayers', myAirtable.getEntryValue('NumPlayers') + 1);
            document.getElementById("logonMessage").innerHTML = "Game Satus: Joined Game, Waiting for Game to Start";

            //Constantly check if a game has started:
            checkIfGameStarted();

        }
    }

}


//The gamemaster has the ability to start a game
function gameMasterControls(){
    isGamemaster = true;

    //sets as gamemaster in database
    myAirtable.setEntryValueNotStrict('Gamemaster', username);

    var startButtonDiv = document.createElement('div');
    startButtonDiv.setAttribute('class', 'logon');
    startButtonDiv.setAttribute('id', 'startGameButton');
    startButtonDiv.innerHTML = "<br>"

    
    var startGameButton = document.createElement('button');
    startGameButton.setAttribute('class', 'button1');
    startGameButton.setAttribute('style', 'text-align:center');
    startGameButton.setAttribute('id', 'startGameButton');
    startGameButton.setAttribute('onclick', 'startGame()');
    startGameButton.innerHTML = "Start Game";

    startButtonDiv.append(startGameButton);
    

    document.body.appendChild(startButtonDiv);
}


function startGame(){
    myAirtable.setEntryValueStrict('GameStatus', 1);
    if (!isGamemaster){
        document.getElementById('gamemasterDisplay').remove();
    }
    else{
        myAirtable.setEntryValueStrict('Gamemaster', 'null');
    }
}


function checkIfGameStarted(){
    var gameStartCheck = window.setInterval(() => {
        if (myAirtable.getEntryValue('GameStatus') == 1){
            clearInterval(lobbyCountInterval);
            clearInterval(gameStartCheck);
            clearInterval(checkGM);
            try{
                document.getElementById('startGameButton').remove();
            }
            catch{

            }
            try{
                document.getElementById('nameForm').remove();
            }
            catch{

            }
            document.getElementById('joinGameDiv').remove();
            countdown();

        }
    }, 100);
}
