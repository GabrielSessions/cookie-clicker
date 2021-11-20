

/*
var mySL = document.getElementById("service_systemlink").getService();
mySL.setAttribute("apikey", "key" + "WJDyynbH3CDv8W");
mySL.init();
*/

//Initialization of Airtable Connection

var AirtableElement = document.getElementById("service_airtable");
AirtableElement.setAttribute("apikey", "key" + "WJDyynbH3CDv8W");
AirtableElement.setAttribute("baseid", "app" + "HKB1ZbyWMYs0qo");
AirtableElement.setAttribute("tablename", "cookieClicker");
AirtableElement.init();

var myAirtable = AirtableElement.getService();
myAirtable.init("key" + "WJDyynbH3CDv8W", "app" + "HKB1ZbyWMYs0qo", "cookieClicker");

console.log('cookie: ' + (getCookie('username')));

//Shows confirmation of a connection to Airtable
function printActivation(){
    var logonMessage = document.createElement('h4');
    logonMessage.setAttribute('id', 'logonMessage');
    logonMessage.setAttribute('class', 'logon');
    logonMessage.innerHTML = "Game Satus: Connected to Airtable, Waiting to Join Game";
    document.body.appendChild(logonMessage);

    //Checks if the user previously entered a name, prompts user to enter a name if new
    try{
        if (getCookie('username').length > 0){
            var helloMessage = document.createElement('p');
            helloMessage.setAttribute('class', 'logon');
            helloMessage.innerHTML = "Welcome back " + getCookie(username) + " !";
            document.body.appendChild(helloMessage);
        }
        else{
            var helloMessage = document.createElement('p');
            helloMessage.setAttribute('class', 'logon');
            helloMessage.innerHTML += "Welcome! Please enter your name below.";
            document.body.appendChild(helloMessage);
            noStoredName();
        }
        
    }
    catch{
        var helloMessage = document.createElement('p');
        helloMessage.setAttribute('class', 'logon');
        helloMessage.innerHTML += "Welcome! Please enter your name below.";
        document.body.appendChild(helloMessage);
        noStoredName();
    }

    
}

//If the user is new, the user is prompted to enter a name into a form
//After the form is submitted, the checkName() function runs
function noStoredName(){

    var formDiv = document.createElement('div');
    formDiv.setAttribute('class', 'logon');

    var formHTML  = `<form  target = "loginForm">
    <label for="fname">Your Name:</label><br><br>
    <input type="text" id="fname" name="fname" value=""><br>
    </form>`;
    formDiv.innerHTML += formHTML;

    var formSubmitButton = `

    <button type = 'button' class = 'button1' onclick = 'checkName()'>
    Submit
    </button>
    
    `
    formDiv.innerHTML += formSubmitButton;

    document.body.appendChild(formDiv);

    //Stores name as a cookie for future use
    //console.log()
    
}



function checkName(){
    setCookie('username', JSON.stringify(document.getElementById('fname').value), 10);
    console.log(getCookie('username'));
}

printActivation();

