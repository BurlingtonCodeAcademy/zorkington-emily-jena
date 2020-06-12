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
let welcomeMessage = "182 Main street. You are standing on Main Street between Church and South Winooski. \n There is a door here. A keypad sits on the handle. On the door is a handwritten sign. You can go to muddys, foyer, classroom, pizza shop and main street by typing in 'go to ___'. "

//Sign message
let sign = "The sign says 'Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345.'"

//Player inventory
let player ={
  status: ["full"],
  inventory: []
}

//Door object
 door = {
  name: door,
  description: "needs code",
  //This function unlocks the door with the proper door code. 
  unlock: async function unlock() {
      let code= await ask ("What is your code\n");
      if (code=== "12345"){
      console.log("Success! The door opens. You enter the foyer and the door shuts behind you. ");
      console.log(currentRoom.changeRoom('foyer'));
      play();
    } else {
      console.log("Bzzzzt! The door is still locked!");
      play();
    }
  }
  } 


  

    let lookupTable

    //Rooms class used to create the game rooms
    class Room {
      constructor(name, description, inventory) {
        this.name = name;
        this.description = description;
        this.inventory = inventory
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
    let mainStreet = new Room("main street", "182 Main street. You are standing on Main Street between Church and South Winooski. \n There is a door here. A keypad sits on the handle. On the door is a handwritten sign.", ["sign",]);

    let foyer = new Room("foyer", "You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex.But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced 'FO-ee-yurr'. A copy of Seven Days lies in a corner, help yourself!", ["paper"]);

    let classroom = new Room("classroom", "Welcome to the classroom. Say hello to Bob, your excellent instructor.", ["Bob"]);

    let pizzaShop = new Room("pizza shop", "This is Mr. Mikes. Feel free to buy a slice!", ["pizza"]);

    let muddys = new Room("muddys", "Hello! Would you like some tea for Bob? I know how he gets without it!", ["tea"]);

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
        input = await ask('>_ ');

        //Various actions that the player can take 
        if (input.includes('examine') || input.includes('read') || input.includes("read sign")) {
          console.log(sign);
          
        }else if (input.includes('enter code') || input.includes("key in") && currentRoom===mainStreet) {
          door.unlock();

        } else if(input.includes('take paper')|| input.includes('take seven days')&&currentRoom===foyer){
          player.inventory.push("paper");
          console.log ("You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else.");
          console.log (player.inventory);
          
        }else if (input.includes('take') || input.includes('take sign')&& currentRoom===mainStreet) {
          console.log(`That would be selfish. How will other students find their way?`)


        } else if (input.includes('exit') || input.includes("quit")) {
          console.log("Thank you for playing! Good bye!");
          process.exit();

        } else if (input.includes("go to muddys") || input.includes("muddys")) {
          console.log(currentRoom.changeRoom('muddys'))
        }
        //Come back to foyer
        else if (input.includes("go to foyer") || input.includes("foyer")&& currentRoom !==mainStreet) {
          console.log(currentRoom.changeRoom('foyer'))

        }else if (input.includes("go to foyer") || input.includes("foyer")&& currentRoom ===mainStreet) {
           door.unlock();


        } else if (input.includes("go to classroom") || input.includes("classroom")) {
          console.log(currentRoom.changeRoom('classroom'))

        } else if (input.includes("go to main street") || input.includes("main street")) {
          console.log(currentRoom.changeRoom('main street'))

        } else if (input.includes("go to pizza shop") || input.includes("pizza shop")) {
          console.log(currentRoom.changeRoom('pizza shop'))
        }
        else {
          console.log('Sorry. I don\'t how to ' + input + " Try again. ")

        }
      }
    }

    //These functions are called to begin the game. 
    start();
    play();



  
  
