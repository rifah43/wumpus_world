const constants = require('./constants.js');
const caveBoard = require('./cave.js')


function initializeKnowledgeBase() {
    let knowledgeBase = []
    for (let i = 0; i < constants.CAVE_LENGTH; i++) {
        let temp = [];
        for (let j = 0; j < constants.CAVE_WIDTH; j++) {
            temp.push(
                {
                    noWumpus: null,
                    noPit: null,
                    maybeWumpus: null,
                    maybePit: null,
                    breeze: null,
                    stench: null,
                    safe: null
                }
            )
        }
        knowledgeBase.push(temp);
    }

    knowledgeBase[0][0] = {
        noWumpus: true,
        noPit: true,
        maybeWumpus: false,
        maybePit: false,
        breeze: false,
        stench: false,
        safe: true
    }

    return knowledgeBase;
}

function printCave(knowledgeBase) {
    for (let i = 0; i < 4; i++) {
        let line = '';
        for (let j = 0; j < 4; j++) {
            let element = ''
            element = element + "mw=" + String(knowledgeBase[i][j].maybeWumpus)
            element = element + "   mp=" + String(knowledgeBase[i][j].maybePit)
            element = element + "  s=" + String(knowledgeBase[i][j].safe)
            line = line + element.padEnd(35, " ");
        }
        console.log(line);
    }
    console.log();
}

function updateKnowledgeBase(knowledgeBase, cave, pY, pX) {

    let isBreeze= false, isStench = false;
    if(cave[pY][pX].includes(constants.BREEZE)) isBreeze = true;
    if(cave[pY][pX].includes(constants.STENCH)) isStench = true;

    if (pY > 0 && knowledgeBase[pY - 1][pX].maybePit != false){
        knowledgeBase[pY - 1][pX].maybePit = isBreeze;
    }
    if (pY < constants.CAVE_LENGTH - 1 && knowledgeBase[pY + 1][pX].maybePit != false){
        knowledgeBase[pY + 1][pX].maybePit = isBreeze;
    }
    if (pX > 0 && knowledgeBase[pY][pX - 1].maybePit != false){
        knowledgeBase[pY][pX - 1].maybePit = isBreeze;
    }
    if (pX < constants.CAVE_WIDTH - 1 &&knowledgeBase[pY][pX + 1].maybePit != false){
        knowledgeBase[pY][pX + 1].maybePit = isBreeze;
    }


    if (pY > 0 && knowledgeBase[pY - 1][pX].maybeWumpus != false){
        knowledgeBase[pY - 1][pX].maybeWumpus = isStench;
    }
    if (pY < constants.CAVE_LENGTH - 1 && knowledgeBase[pY + 1][pX].maybeWumpus != false){
        knowledgeBase[pY + 1][pX].maybeWumpus = isStench;
    }
    if (pX > 0 && knowledgeBase[pY][pX - 1].maybeWumpus != false){
        knowledgeBase[pY][pX - 1].maybeWumpus = isStench;
    }
    if (pX < constants.CAVE_WIDTH - 1 &&knowledgeBase[pY][pX + 1].maybeWumpus != false){
        knowledgeBase[pY][pX + 1].maybeWumpus = isStench;
    }

    return knowledgeBase;
}

function getUpdatedAllVisiableSquare(knowledgeBase, nextVisitableSquare) {
    for (let i = 0; i < constants.CAVE_LENGTH; i++) {
        for (let j = 0; j < constants.CAVE_WIDTH; j++) {
            if (knowledgeBase[i][j].safe != true && knowledgeBase[i][j].maybePit == false && knowledgeBase[i][j].maybeWumpus == false) {
                knowledgeBase[i][j].noWumpus = true;
                knowledgeBase[i][j].noPit = true;
                knowledgeBase[i][j].safe = true;

                nextVisitableSquare.push({ y: i, x: j })
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function AI_move_By_Propositional_logic(cave) {
    // move list will contine an object which  will be like = {pY: ,pX: ,nY: ,nX: }
    let moveList = [];
    let knowledgeBase = initializeKnowledgeBase();
    let nextVisitableSquare = [];
    nextVisitableSquare.push({ y: 0, x: 0 });       // as (1,1) is the current position of agent and it is safe

    // Defining the starting position (1,1)
    let currentPosition = { cpY: 0, cpX: 0 };     // as it can be also imported from other file
    let cpY = currentPosition.cpY;
    let cpX = currentPosition.cpX;

    let i = 0;
    while (nextVisitableSquare != null && nextVisitableSquare.length > 0) {
        let nextPosition = nextVisitableSquare.pop();
        console.log(nextPosition)
        console.log("Knowledgebase after pop: ", nextVisitableSquare)
        let npY = nextPosition.y;
        let npX = nextPosition.x;

        moveList.push({ y: npY, x: npX })
        // moveToNextPostion(moveList, cpY, cpX, npY, npX);
        // As agent moves to the next safe position
        cpY = npY;
        cpX = npX;
        knowledgeBase = updateKnowledgeBase(knowledgeBase, cave, cpY, cpX);
        printCave(knowledgeBase)

        getUpdatedAllVisiableSquare(knowledgeBase, nextVisitableSquare);
        console.log("Knowledgebase after push: ", nextVisitableSquare)
        await sleep(1000);
    }

    console.log(moveList)
}

AI_move_By_Propositional_logic(caveBoard.initialize())
// caveBoard.printCave(caveBoard.initialize())
