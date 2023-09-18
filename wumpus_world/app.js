const constants = require('./constants.js');
const {} = require('./cave.js');

function move (cave, nextY, nextX) {
    if(cave[nextY][nextX] == constants.PIT) {
        console.log("Alas! You fall into the Pit....");
        return -1;
    }
    else if(cave[nextY][nextX] == constants.WUMPUS) {
        console.log("Alas! You killed by Wumbus....");
        return -1;
    }
    else if(cave[nextY][nextX] == constants.GOLD) {
        console.log("Congratulations! You get a Gold....");
        return 1;
    }
    // else if(){

    // }
}