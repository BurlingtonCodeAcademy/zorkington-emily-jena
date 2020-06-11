//Boiler plate code 
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//Global Variable Declaration
//Welcome message
let welcomeMessage = "182 Main street. You are standing on Main Street between Church and South Winooski. \n There is a door here. A keypad sits on the handle. On the door is a handwritten sign."

//Sign message
let sign= "The sign says 'Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345.'"

//Rooms class used to create the game rooms
class Room{
  constructor(name, description, inventory){
    this.name= name;
    this.description= description;
    this.inventory= inventory
  }
}

// Game Rooms
let mainStreet = new Room("Main Street", "182 Main street. You are standing on Main Street between Church and South Winooski. \n There is a door here. A keypad sits on the handle. On the door is a handwritten sign.", ["sign"]);

let foyer= new Room ("foyer", "You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex.But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced 'FO-ee-yurr'. A copy of Seven Days lies in a corner.", ["paper"]);

let classroom = new Room ("classroom", "Welcome to the classroom. Say hello to Bob, your excellent instructor.", ["Bob"]);

let pizzaShop= new Room ("pizza shop", "This is Mr. Mikes. Feel free to buy a slice!", ["pizza"]);

let muddys= new Room ("Muddys'", "Hello! Would you like some tea for Bob? I know how he gets without it!", ["tea"])

//State machine controls which room you can go into 

let states = {
  'Main Street': { canChangeTo: ['foyer', 'pizza shop', 'Muddys'] },
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
    console.log( 'Invalid state transition attempted - from ' + currentState + ' to ' + newState);
  }
}


// Start function that begins the game. Displays welcome message and goes into the play function. 
function start(){
  console.log(welcomeMessage);
  play();
}

//Function that allows various inputs 
async function play() {
  let input = "";

//While the input is not exit, the game awaits input at every turn 
  while(input !=="exit"){
    input= await ask('>_ ');

//Various actions that the player can take 
    if (input.includes('examine') || input.includes('read')|| input.includes("read sign")) {
      console.log(sign);


    } else if (input.includes('take') || input.includes('take note')) {
      console.log(`That would be selfish. How will other students find their way?`)
  

    } else if(input.includes('exit')||input.includes("quit")){
      console.log("Thank you for playing! Good bye!");
      process.exit();

    } else {
      console.log('Sorry. I don\'t how to ' + input)
   
    }
  }
}

//The functions to begin the game. 
start();
play();


//Exits the game



