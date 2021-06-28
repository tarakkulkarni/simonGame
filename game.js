//////////////////////////variables//////////////////////////

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
//////////////////////////////////////////////////////////////

///////////////////////keypress detection//////////////////////
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
/////////////////////////////////////////////////////////////

/////////////////////colour sequence////////////////////////
function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("LEVEL "+ level);
  var randomNum1=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColours[randomNum1];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
//////////////////////////////////////////////////////////////

///////////////////////colour sound////////////////////////
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//////////////////////////////////////////////////////////


/////////////////////////////button detection/////////////////////////////
$(".btn").click(function()
{
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)
});
/////////////////////////////////////////////////////////////////////////

///////////////////button animation////////////////////////////////////
function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
       $("#"+currentColor).removeClass("pressed");
   }, 100);

}
/////////////////////////////////////////////////////////////////////////

//////////////////////////game logic/////////////////////////////////////

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    if(gamePattern.length===userClickedPattern.length)
    {
      setTimeout(function(){
        nextSequence();
       }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
        $("body").removeClass("game-over");
     }, 200);
     startOver();
  }
  
}

//////////////////////////////////////////////////////////////////////////

////////////////////Re-initalise//////////////////////////////////////////

function startOver()
{
  level=0;
  started=false;
  gamePattern=[];
}
