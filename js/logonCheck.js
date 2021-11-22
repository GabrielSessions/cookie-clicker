//logonCheck.js
//By: Gabriel Sessions
//Purpose: Allows a user to log onto an online lobby (defined in gameLobby.js)
//Note: There are references to other files in this project (JS functions, CSS, and the main HTML page)


var username = "";

//Initialization of Airtable Connection

//Table for starting game and counting number of players
var AirtableElement = document.getElementById("service_airtable");
var myAirtable = AirtableElement.getService();

//Table for matching scores to player IDs
var AirtableElement2 = document.getElementById("service_airtable2");
var myAirtable2 = AirtableElement2.getService();

//Table for matching scores to player IDs
var AirtableElement3 = document.getElementById("service_airtable3");
var myAirtable3 = AirtableElement3.getService();


AirtableElement.setAttribute("apikey", "key" + "WJDyynbH3CDv8W");
AirtableElement.setAttribute("baseid", "app" + "HKB1ZbyWMYs0qo");
AirtableElement.setAttribute("tablename", "cookieClicker");
AirtableElement.init();

myAirtable.init("key" + "WJDyynbH3CDv8W", "app" + "HKB1ZbyWMYs0qo", "cookieClicker");


AirtableElement2.setAttribute("apikey", "key" + "WJDyynbH3CDv8W");
AirtableElement2.setAttribute("baseid", "app" + "HKB1ZbyWMYs0qo");
AirtableElement2.setAttribute("tablename", "Scores");
AirtableElement2.init();

myAirtable2.init("key" + "WJDyynbH3CDv8W", "app" + "HKB1ZbyWMYs0qo", "Scores");


AirtableElement3.setAttribute("apikey", "key" + "WJDyynbH3CDv8W");
AirtableElement3.setAttribute("baseid", "app" + "HKB1ZbyWMYs0qo");
AirtableElement3.setAttribute("tablename", "PlayerID");
AirtableElement3.init();

myAirtable3.init("key" + "WJDyynbH3CDv8W", "app" + "HKB1ZbyWMYs0qo", "PlayerID");

/*

//Function to initialize new Airtables
function createAirtable(element, varName, tableName){
    element.setAttribute("apikey", "key" + "WJDyynbH3CDv8W");
    element.setAttribute("baseid", "app" + "HKB1ZbyWMYs0qo");
    element.setAttribute("tablename", "cookieClicker");
    element.init();

    varName.init("key" + "WJDyynbH3CDv8W", "app" + "HKB1ZbyWMYs0qo", "cookieClicker");
}

createAirtable(AirtableElement, myAirtable, "cookieClicker");
createAirtable(AirtableElement2, myAirtable2, "Scores");
createAirtable(AirtableElement3, myAirtable3, "PlayerID");
*/

//Shows confirmation of a connection to Airtable
function printActivation(){
    var logonMessage = document.createElement('h4');
    logonMessage.setAttribute('id', 'logonMessage');
    logonMessage.setAttribute('class', 'logon');
    logonMessage.innerHTML = "Game Satus: Connected to Airtable, Sign in using your name";
    document.body.appendChild(logonMessage);

    //Checks if the user previously entered a name, prompts user to enter a name if new
    try{
        
       //FIX COOKIES WHEN THERE'S TIME!!!
        if (JSON.stringify(getCookie('username')) != '""' && false){
            
            username = getCookie('username').substring(1, getCookie('username').length() - 1);
            var helloMessage = document.createElement('p');
            helloMessage.setAttribute('id', 'helloMessage');
            helloMessage.setAttribute('class', 'logon');
            helloMessage.innerHTML = "Welcome " + username + "!";
            document.body.appendChild(helloMessage);

            noStoredName('You may change your username here:');
            joinGameLobby();
            
        }

        //If not previously in a game, ask for a username from the user
        //User can change name later when in game lobby
        else{
            var helloMessage = document.createElement('p');
            helloMessage.setAttribute('class', 'logon');
            helloMessage.setAttribute('id','helloMessage');
            helloMessage.innerHTML += "Welcome! Please enter your name below.";
            document.body.appendChild(helloMessage);
            noStoredName('Your Name:');
        }
        
    }
    catch{
        console.log("an error ocurred");
    }

    
}

//If the user is new, the user is prompted to enter a name into a form
//After the form is submitted, name is saved as a cookie to the browser
function noStoredName(labelName){

    var formDiv = document.createElement('div');
    formDiv.setAttribute('id', 'nameForm');
    formDiv.setAttribute('class', 'logon');

    var formHTML  = `<form  target = "loginForm">
    <label for="fname" id = "yourNameLabel" class = "formLabel" style = >Your Name:</label><br><br>
    <input type="text" id="fname" name="fname" value="" class = "text-input"><br>
    </form>`;
    formDiv.innerHTML += formHTML;

    var formSubmitButton = "<button type = 'button' class = 'button1'  onclick = 'saveName()'>Submit</button>";
    
    formDiv.innerHTML += formSubmitButton;

    document.body.appendChild(formDiv);

    document.getElementById('yourNameLabel').innerHTML = labelName;

    
}


function deleteNameForm(){
    document.getElementById('nameForm').remove();
}



function saveName(){
    if (username == "reset_all_values"){
        myAirtable.setEntryValueStrict('GameStatus', 0);
        myAirtable.setEntryValueStrict('NumPlayers', 0);
    }

    //Stores name as a cookie
    var name = document.getElementById('fname').value;
    setCookie('username', name, 10);
    username = name;

    document.getElementById('helloMessage').innerHTML = "Welcome " + username + "!";
    document.getElementById('yourNameLabel').innerHTML = "You may change your username here:"

    console.log(joinedLobby);
    if (joinedLobby == false){
        joinGameLobby();
    
    }
    



}

printActivation();

