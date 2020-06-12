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
let transitions;
let currentRoom; 

let welcomeMessage = "182 Main street. You are standing on Main Street between Church and South Winooski. \n There is a door here. A keypad sits on the handle. On the door is a handwritten sign."

//Sign message
let sign = "The sign says 'Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345.'"

let lookupTable

//Rooms class used to create the game rooms
class Room {
  constructor(name, description, inventory, transition) {
    this.name = name;
    this.description = description;
    this.inventory = inventory
    this.transition = transition
  }

  changeRoom(nextState) {
    //console.log(currentRoom + nextState)
    if (currentRoom.transition.includes(nextState)) {
      currentRoom = lookupTable[nextState];
     return currentRoom.description;
    } else {
      return `You can not move that way!`;
    }
  }
}
  // Game Rooms
let mainStreet = new Room("main street", "182 Main street. You are standing on Main Street between Church and South Winooski. \n There is a door here. A keypad sits on the handle. On the door is a handwritten sign.", ["sign"], ['foyer', 'pizza shop', 'muddys']);

let foyer = new Room("foyer", "You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex.But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced 'FO-ee-yurr'. A copy of Seven Days lies in a corner.", ["paper"], ['classroom', 'main street']);

let classroom = new Room("classroom", "Welcome to the classroom. Say hello to Bob, your excellent instructor.", ["Bob"], ['foyer']);

let pizzaShop = new Room("pizza shop", "This is Mr. Mikes. Feel free to buy a slice!", ["pizza"], ['main street']);

let muddys = new Room("muddys", "Hello! Would you like some tea for Bob? I know how he gets without it!", ["tea"], ['main street']);

//This function checks whether you can move from one room to another. If you can prints the description of the room

lookupTable = {
  //map strings to the state options they represent
  'main street': mainStreet,       
  'foyer': foyer,
  'classroom': classroom,
  'pizza shop': pizzaShop,
  'muddys': muddys
}

//State machine controls which room you can go into 
// transitions = {
//   'classroom': {canChangeTo: ['foyer']},
//   'main street': { canChangeTo: ['foyer', 'pizza shop', 'muddys'] },
//   'foyer': { canChangeTo: ['classroom', 'main street'] },
//   'pizza shop': { canChangeTo: ['main street'] },
//   'muddys': { canChangeTo: ['main street'] }
// };

currentRoom = mainStreet;

currentRoom.changeRoom('muddys')
console.log(currentRoom)
currentRoom.changeRoom('main street')
//console.log(currentRoom)
console.log(currentRoom.changeRoom('foyer'))
//console.log(currentRoom)
console.log(currentRoom.changeRoom('classroom'))
//console.log(currentRoom)
console.log(currentRoom.changeRoom('muddys'))
//console.log(currentRoom)



//Function that allows various inputs 
async function play() {
  let input = "";

  //While the input is not exit, the game awaits input at every turn 
  while (input !== "exit") {
    input = await ask('>_ ');

    //Various actions that the player can take 
    if (input.includes('examine') || input.includes('read') || input.includes("read sign")) {
      console.log(sign);


    } else if (input.includes('take') || input.includes('take sign')) {
      console.log(`That would be selfish. How will other students find their way?`)


    } else if (input.includes('exit') || input.includes("quit")) {
      console.log("Thank you for playing! Good bye!");
      process.exit();

    } else {
      console.log('Sorry. I don\'t how to ' + input)

    }
  }
}

//These functions are called to begin the game. 
// start();
// play();




