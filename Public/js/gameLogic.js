
//timerStartTime
var timeRemaining = 60;


function init(){
	document.getElementById('gameTimer').innerHTML = timeRemaining;
}


function startTimer(){
	
	//show the time
	document.getElementById('gameTimer').innerHTML = timeRemaining;

	timeRemaining = checkTime(timeRemaining);

	if(timeRemaing = 0){
		document.getElementById('gameTimer').innerHTML = "TIME'S UP";
	}else{
		document.getElementById('gameTimer').innerHTML = timeRemaining;
		var timeout = setTimeout(startTimer, 1000);
	}
}

function checkTime(time){
	if(time == 0){
		return time;
	}
	else{
		time = time - 1;
		return time;
	}
}