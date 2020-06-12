//Boiler plate code 
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//Global Variable Declaration
let transitions;
let currentRoom;
let door;

//Welcome message 
let welcomeMessage = "182 Main street. You are standing on Main Street between Church and South Winooski. \n There is a door here. A keypad sits on the handle. On the door is a handwritten sign. You can go to muddys, foyer, classroom, pizza shop and main street by typing in the name of the place.  "

//Sign message
let sign = "The sign says 'Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345.'"

//Bob object
let bob = {
  name: "bob",
  status: ["gibberish"],
  inventory: ["nothing"],
  messageNonGibberish: "Thanks for the tea! Would you like to take a class. "
}

//Player inventory
let player = {
  status: "full",
  inventory: ["nothing"]
}

//Door object
door = {
  name: door,
  description: "needs code",
  //This function unlocks the door with the proper door code. Changes the foyer door so that it is always unlocked.  
  unlock: async function unlock() {
    let code = await ask("What is your code?\n");
    if (code === "12345") {
      console.log("Success! The door opens. You enter the foyer and the door shuts behind you. ");
      foyer.unlocked = "unlocked";
      console.log(currentRoom.changeRoom('foyer'));
      play();
    } else if(code==="xyzzy"){
      console.log("You have been set on fire. Cheaters never win!")
      process.exit();
    }
    else {
      console.log("Bzzzzt! The door is still locked!");
      play();
    }
  }
}


let lookupTable

//Rooms class used to create the game rooms
class Room {
  constructor(name, description, inventory, unlocked) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.unlocked = unlocked
  }

  changeRoom(nextState) {
    if (transitions[currentRoom.name].canChangeTo.includes(nextState)) {
      currentRoom = lookupTable[nextState];
      return currentRoom.description;
    } else {
      return `You can not move that way!`;
    }
  }
}
// Game Rooms
let mainStreet = new Room("main street", "182 Main street. You are standing on Main Street between Church and South Winooski. \n There is a door here. A keypad sits on the handle. On the door is a handwritten sign.", ["sign",], "unlocked");

let foyer = new Room("foyer", "You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex.But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced 'FO-ee-yurr'. A copy of Seven Days lies in a corner, help yourself!", ["a paper"], "locked");

let classroom = new Room("classroom", "Welcome to the classroom. Say hello to Bob, your excellent instructor. He is talking nonsense and could clearly use some tea. You know he likes muddys, so you should probably head there.", ["Bob"], "unlocked");

let pizzaShop = new Room("pizza shop", "This is Mr. Mikes. Feel free to buy a slice!", ["pizza"], "unlocked");

let muddys = new Room("muddys", "Hello! Would you like some tea for Bob? I know how he gets without it!", ["tea"], "unlocked");

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
transitions = {
  'classroom': { canChangeTo: ['foyer'] },
  'main street': { canChangeTo: ['foyer', 'pizza shop', 'muddys'] },
  'foyer': { canChangeTo: ['classroom', 'main street'] },
  'pizza shop': { canChangeTo: ['main street'] },
  'muddys': { canChangeTo: ['main street'] }
};

currentRoom = mainStreet;


//Function to start game
function start() {
  console.log(welcomeMessage);
  play();
}

//Function that allows various inputs 
async function play() {
  let input = "";


  //While the input is not exit, the game awaits input at every turn 
  while (input !== "exit") {
  //If the player is hungry, your stomach grumbles
    if (player.status === "hungry") {
      console.log("Grumble, grumble, I sure am hungry!")
    }
  //Allows player to input
    input = await ask('>_ ');

    //Various actions that the player can take 
    if (input.includes('examine') || input.includes('read') || input.includes("read sign")) {
      console.log(sign);

    }

    else if (input.includes('enter code') || input.includes("key in") && currentRoom === mainStreet) {
      door.unlock();

      //Takes the paper, pushes the paper into the player inventory. Displays paper message
    } else if (input.includes('take paper') || input.includes('take seven days') && currentRoom === foyer) {
      player.inventory.pop();
      player.inventory.push("paper");
      console.log("You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else.");

      //Takes the paper out of the inventory
    } else if (input.includes('drop paper') || input.includes('drop seven days')) {
      player.inventory.pop('paper');
      currentRoom.inventory.push("paper");
      player.inventory.push("nothing");
      console.log("Don't want this paper weighing me down!");


      //You can try to take the sign when you are in Main street
    } else if (input.includes('take') || input.includes('take sign') && currentRoom === mainStreet) {
      console.log(`That would be selfish. How will other students find their way?`)


      //giving Bob tea
    } else if (input.includes("give tea") && bob.status[0] === "gibberish" && currentRoom === classroom) {
      console.log(bob.messageNonGibberish);
      bob.status.pop();
      bob.status.push("alert");
      player.inventory.pop("tea");

      //When Bob has had tea, you can attend a lecture   
    } else if (input.includes("attend lecture") || (input.includes("sit down") && bob.status[0] === "alert" && currentRoom === classroom)) {
      console.log("Without further ado, let me start sharing my screen!\n");
      player.status = "hungry";
     

      //Enter muddys 
    } else if (input.includes("go to muddys") || input.includes("muddys")) {
      player.inventory.pop();
      player.inventory.push("tea");
      console.log(currentRoom.changeRoom('muddys'));
      console.log("Go give that tea to Bob, so he starts making sense.")
    }
    //If you want to go to foyer, you must enter a code, this keeps door unlocked or remainder of game
    else if (input.includes("foyer") && foyer.unlocked === "unlocked") {
      console.log(currentRoom.changeRoom('foyer'));


    } else if (input.includes("foyer") && foyer.unlocked === "locked") {
      door.unlock();

      //Enter classroom
    } else if (input.includes("go to classroom") || input.includes("classroom")) {
      console.log(currentRoom.changeRoom('classroom'))

    //Enter Main Street
    } else if (input.includes("go to main street") || input.includes("main street")) {
      console.log(currentRoom.changeRoom('main street'))

      //Enter pizza shop
    } else if (input.includes("go to pizza shop") || input.includes("pizza shop")) {
      console.log(currentRoom.changeRoom('pizza shop'));
    
    //Allows you to eat pizza and become full
    } else if (input.includes ("buy slice")|| input.includes("eat pizza")){
      player.status ="full";
      console.log("That slice was delicious! I feel much better.")

      //Check inventory
    } else if (input === "i" || input.includes("inventory") || input.includes("take inventory")) {
      console.log("You are carrying: " + player.inventory)

    }else if (input==="xyzzy"){
      console.log("You have been set on fire! Cheaters never win!");
      process.exit();
    }

    //Guard Clause to check random inputs
    else {
      console.log('Sorry. I don\'t how to ' + input + " Try again. ")

    }
  }
}

//These functions are called to begin the game. 
start();
play();





