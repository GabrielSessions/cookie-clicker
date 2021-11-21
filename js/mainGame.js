
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

            timer(13);


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
            getResults();
        }
        else{
            if (time == 5){
                document.getElementById('numbersCount').innerHTML = "Almost Done!";
            }
            timer(time-1);
        }
        


    }, 1000);

}

function cookieClick(){
    numOfCookieClicks ++;
    document.getElementById('scoreDisplay').innerHTML = "Score: " + numOfCookieClicks;
}

function getResults(){
    myAirtable2.createEntry(username, numOfCookieClicks);
    setTimeout(() => {
        console.log("scores calculated now");
    }, 3000);
}


