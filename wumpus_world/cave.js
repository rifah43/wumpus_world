const { WUMPUS, PIT, AGENT, GOLD, CAVE_LENGTH, CAVE_WIDTH } = require('./constants.js')



function initialize() {
    const cave = [
        [AGENT, null, WUMPUS, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, WUMPUS, null],
        [PIT, null, WUMPUS, null, PIT, null, GOLD, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, WUMPUS, null, null, null, null, null, PIT, null],
        [null, null, null, GOLD, null, null, WUMPUS, null, null, null],
        [null, null, null, null, null, null, null, null, null, WUMPUS],
        [null, PIT, null, null, null, null, null, null, null, null],
        [null, null, null, GOLD, null, null, null, GOLD, null, null],
        [null, null, null, null, null, PIT, null, null, PIT, null]
    ]
    return cave
}

function printCave(cave) {
    const NULL = "nul";
    for (let i = 0; i < CAVE_LENGTH; i++) {
        let line = '';
        for (let j = 0; j < CAVE_WIDTH; j++) {
            if (cave[i][j] == null) {
                line = line + NULL.padEnd(8, " ");
            }
            else {
                line = line + String(cave[i][j]).padEnd(8, " ");
            }
        }
        console.log(line);
    }
    console.log();
}


function isWumpusInAdj(cave, i, j) {
    if (
        (i > 0 && cave[i - 1][j] == WUMPUS) ||
        (i < CAVE_LENGTH-1 && cave[i + 1][j] == WUMPUS) ||
        (j > 0 && cave[i][j - 1] == WUMPUS) ||
        (j < CAVE_WIDTH-1 && cave[i][j + 1] == WUMPUS)
    )
        return true;
    else
        return false;
}

function isPitInAdj(cave, i, j) {
    if (
        (i > 0 && cave[i - 1][j] == PIT) ||
        (i < CAVE_LENGTH-1 && cave[i + 1][j] == PIT) ||
        (j > 0 && cave[i][j - 1] == PIT) ||
        (j < CAVE_WIDTH-1 && cave[i][j + 1] == PIT)
    )
        return true;
    else
        return false;
}

function printCaveWithPerceivation(cave) {
    const NULL = "nul";
    for (let i = 0; i < CAVE_LENGTH; i++) {
        let line = '';
        for (let j = 0; j < CAVE_WIDTH; j++) {
            let tempString= '[';
            let temp = false;

            if (isWumpusInAdj(cave, i, j)) {
                tempString = tempString + WUMPUS;
                temp = true;
            }
            if (isPitInAdj(cave, i, j)) {
                if(temp) tempString += ','
                tempString = tempString + PIT;
                temp = true;
            }

            if (cave[i][j] == null) {
                if (!temp) {
                    tempString = tempString + NULL;
                }
            }
            else {
                if(temp) tempString += ','
                tempString = tempString + String(cave[i][j]);
            }

            tempString += ']';
            line += tempString.padEnd(15, " ");
        }
        console.log(line);
    }
    console.log();
}

module.exports = {
    printCave, printCaveWithPerceivation, initialize, isPitInAdj, isWumpusInAdj
}