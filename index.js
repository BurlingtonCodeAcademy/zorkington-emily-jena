//Boiler plate code 
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}


//State machine controls which room you can go into 

let states = {
  'Main Street': { canChangeTo: ['foyer', 'Mr. Mikes', 'Muddys'] },
  'foyer': { canChangeTo: ['classroom', 'Main Street'] },
  'Mr. Mikes': { canChangeTo: ['Main Street'] },
  'Muddys': { canChangeTo: ['Main Street'] }
};

let currentState = "Main Street";

function enterState(newState) {
  let validTransitions = states[currentState].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentState = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}

//Welcome message
let welcomeMessage = "182 Main street. You are standing on Main Street between Church and South Winooski. \n There is a door here. A keypad sits on the handle. On the door is a handwritten sign."

//Sign message
let signMessage= "The sign says 'Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345.'"

// Start function that begins the game. Displays welcome message and goes into the play function. 
function start(){
  console.log(welcomeMessage);
  play();
}

//Function that allows various inputs 
async function play() {
  let input = await ask('>_ ');

    if (input.includes('examine') || input.includes('read')|| input.includes("read sign")) {
      console.log(signMessage);
      return play();

    } else if (input.includes('take') || input.includes('take note')) {
      console.log(`That would be selfish. How will other students find their way?`)
      return play();

    } if(input.includes('exit')||input.includes("quit")){
      console.log("Thank you for playing! Good bye!");
      process.exit();

    } else {
      console.log('Sorry. I don\'t how to ' + input)
      return play();
    }
  }


//The functions to begin the game. 
start();
play();


//Exits the game



