//Boiler plate code 
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//Functions


//State machine controls which room you can go into 
let states = {
  'roomOne': { canChangeTo: [ 'roomTwo' ] },
  'roomTwo': { canChangeTo: [ 'roomThree' ] },
  'roomThree': { canChangeTo: [ 'roomOne' ] }
};

let currentState = "green";

function enterState(newState) {
  let validTransitions = states[currentState].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentState = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}

start();
//room class property allowable action
let allowableActions ={
"move north": ["move north", "move n"] // Access through allowableAction["move north"]
}
//Function that begins the game
async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
console.log(welcomeMessage);

//Waits for user input, if the input is not "Exit", awaits next input. 
  let answer = await ask('>_ ');
  while(answer !== 'exit') {
    answer = await ask('>_ ');
    }


 // if(allowableActions["move north"].includes(userInput)); // This checks the array matching the array. 

  //Exits the game
  process.exit();
}
