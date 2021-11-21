//Resets main Airtable
function resetGameStatus(){
    myAirtable.setEntryValueStrict('GameStatus', 0);
    myAirtable.setEntryValueStrict('NumPlayers', 0);
}

//Deletes all scores and players from 2nd and 3rd tables
function resetAllPlayers(){
    for (var i = 0; i < 1000; i++){
        try{
            myAirtable2.deleteEntry("Player" + i);
            myAirtable3.deleteEntry("Player" + i);
        }
        catch{

        }
    }
}

//Deletes players in a 2d array of data, players are in zero index
function resetPlayers(players){
    for (var i = 0; i < players.length; i++){
        try{
            myAirtable2.deleteEntry("Player" + players[i][0]);
            myAirtable3.deleteEntry("Player" + players[i][0]);

        }
        catch{

        }
    }
}

function resetAll(){
    resetGameStatus();
    resetAllPlayers();
    numOfCookieClicks = 0;
}

function resetAllList(list){
    resetGameStatus();
    resetPlayers(list);
    numOfCookieClicks = 0;
}

