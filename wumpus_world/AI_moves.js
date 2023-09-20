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
                    safe: null,
                    visited: false
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
        safe: true,
        visited: false
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
    if(cave[pY][pX].includes(constants.BREEZE)){
        knowledgeBase[pY][pX].breeze = true;
        isBreeze = true;
    }
    else knowledgeBase[pY][pX].breeze = false;

    if(cave[pY][pX].includes(constants.STENCH)){
        knowledgeBase[pY][pX].stench = true;
        isStench = true;
    }
    else knowledgeBase[pY][pX].stench = false;

    console.log(isBreeze,  isStench, pY,pX)

    // Setting that is there may Pit in adcient room or not
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

    // Setting that is there may Wumpus in adcient room or not
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

    // printCave(knowledgeBase)
    // Setting that is there may Wumpus in adcient room or not
    for (let i = 0; i < constants.CAVE_LENGTH; i++) {
        for (let j = 0; j < constants.CAVE_WIDTH; j++) {
            // console.log(i,j,"  mp=",knowledgeBase[i][j].maybePit, "   mw=",knowledgeBase[i][j].maybeWumpus)
            if(knowledgeBase[i][j].safe == true) continue;

            else if (knowledgeBase[i][j].safe == null && knowledgeBase[i][j].maybePit == false && knowledgeBase[i][j].maybeWumpus == false) {
                knowledgeBase[i][j].noWumpus = true;
                knowledgeBase[i][j].noPit = true;
                knowledgeBase[i][j].safe = true;
                console.log("hi");
            }
            else if (isThereWumpus(knowledgeBase, i, j)) {
                knowledgeBase[i][j].noWumpus = false;
                knowledgeBase[i][j].noPit = true;
                knowledgeBase[i][j].safe = false;
                knowledgeBase[i][j].stench = true;
                knowledgeBase[i][j].maybePit = false;
                knowledgeBase[i][j].maybeWumpus = true;
            }
            else if (isTherePit(knowledgeBase, i,j)) {
                knowledgeBase[i][j].noWumpus = true;
                knowledgeBase[i][j].noPit = false;
                knowledgeBase[i][j].safe = false;
                knowledgeBase[i][j].breeze = true;
                knowledgeBase[i][j].maybePit = true;
                knowledgeBase[i][j].maybeWumpus = false;
            }
        }
    }

    return knowledgeBase;
}

function isThereWumpus(knowledgeBase, pY, pX) {
    let isThereWum = false; 
    if(
        (pY <= 0 || knowledgeBase[pY-1][pX].stench == true) &&
        (pY+1 >= constants.CAVE_LENGTH || knowledgeBase[pY+1][pX].stench == true) &&
        (pX <= 0 || knowledgeBase[pY][pX-1].stench == true) &&
        (pX+1 >= constants.CAVE_WIDTH || knowledgeBase[pY][pX+1].stench == true)
    ) isThereWum = true;
    
    else if(
        // if in the upper room feels stench and that's upper, left, right sure that there is no wumpus 
        (pY > 0 && knowledgeBase[pY-1][pX].stench == true) &&
        (pY <= 1 || knowledgeBase[pY-2][pX].maybeWumpus == false) &&
        (pX <= 0 || knowledgeBase[pY-1][pX-1].maybeWumpus == false) &&
        (pX+1 >= constants.CAVE_WIDTH || knowledgeBase[pY-1][pX+1].maybeWumpus == false)
    ) isThereWum = true;

    else if(
        // if in the down room feels stench and that's down, left, right sure that there is no wumpus 
        (pY+1 < constants.CAVE_LENGTH && knowledgeBase[pY+1][pX].stench == true) &&
        (pY+2 >= constants.CAVE_LENGTH || knowledgeBase[pY+2][pX].maybeWumpus == false) &&
        (pX <= 0 || knowledgeBase[pY+1][pX-1].maybeWumpus == false) &&
        (pX+1 >= constants.CAVE_WIDTH || knowledgeBase[pY+1][pX+1].maybeWumpus == false)
    ) isThereWum = true;

    else if(
        // if in the left room feels stench and that's up, down, left sure that there is no wumpus 
        (pX > 0 && knowledgeBase[pY][pX-1].stench == true) &&
        (pX <= 1 || knowledgeBase[pY][pX-2].maybeWumpus == false) &&
        (pY <= 0 || knowledgeBase[pY-1][pX-1].maybeWumpus == false) &&
        (pY+1 >= constants.CAVE_LENGTH || knowledgeBase[pY+1][pX-1].maybeWumpus == false)
    ) isThereWum = true;

    else if(
        // if in the right room feels stench and that's up, down, right sure that there is no wumpus 
        (pX+1 < constants.CAVE_WIDTH && knowledgeBase[pY][pX+1].stench == true) &&
        (pX+2 >= constants.CAVE_WIDTH || knowledgeBase[pY][pX+2].maybeWumpus == false) &&
        (pY <= 0 || knowledgeBase[pY-1][pX+1].maybeWumpus == false) &&
        (pY+1 >= constants.CAVE_LENGTH || knowledgeBase[pY+1][pX+1].maybeWumpus == false)
    ) isThereWum = true;

    else isThereWum = false;

    return isThereWum;
}

function isTherePit(knowledgeBase, pY, pX) {
    let isPit = false; 
    if(
        (pY <= 0 || knowledgeBase[pY-1][pX].breeze == true) &&
        (pY+1 >= constants.CAVE_LENGTH || knowledgeBase[pY+1][pX].breeze == true) &&
        (pX <= 0 || knowledgeBase[pY][pX-1].breeze == true) &&
        (pX+1 >= constants.CAVE_WIDTH || knowledgeBase[pY][pX+1].breeze == true)
    ) isPit = true;
    
    else if(
        // if in the upper room feels breeze and that's upper, left, right sure that there is no wumpus 
        (pY > 0 && knowledgeBase[pY-1][pX].breeze == true) &&
        (pY <= 1 || knowledgeBase[pY-2][pX].maybePit == false) &&
        (pX <= 0 || knowledgeBase[pY-1][pX-1].maybePit == false) &&
        (pX+1 >= constants.CAVE_WIDTH || knowledgeBase[pY-1][pX+1].maybePit == false)
    ) isPit = true;

    else if(
        // if in the down room feels breeze and that's down, left, right sure that there is no wumpus 
        (pY+1 < constants.CAVE_LENGTH && knowledgeBase[pY+1][pX].breeze == true) &&
        (pY+2 >= constants.CAVE_LENGTH || knowledgeBase[pY+2][pX].maybePit == false) &&
        (pX <= 0 || knowledgeBase[pY+1][pX-1].maybePit == false) &&
        (pX+1 >= constants.CAVE_WIDTH || knowledgeBase[pY+1][pX+1].maybePit == false)
    ) isPit = true;

    else if(
        // if in the left room feels breeze and that's up, down, left sure that there is no wumpus 
        (pX > 0 && knowledgeBase[pY][pX-1].breeze == true) &&
        (pX <= 1 || knowledgeBase[pY][pX-2].maybePit == false) &&
        (pY <= 0 || knowledgeBase[pY-1][pX-1].maybePit == false) &&
        (pY+1 >= constants.CAVE_LENGTH || knowledgeBase[pY+1][pX-1].maybePit == false)
    ) isPit = true;

    else if(
        // if in the right room feels breeze and that's up, down, right sure that there is no wumpus 
        (pX+1 < constants.CAVE_WIDTH && knowledgeBase[pY][pX+1].breeze == true) &&
        (pX+2 >= constants.CAVE_WIDTH || knowledgeBase[pY][pX+2].maybePit == false) &&
        (pY <= 0 || knowledgeBase[pY-1][pX+1].maybePit == false) &&
        (pY+1 >= constants.CAVE_LENGTH || knowledgeBase[pY+1][pX+1].maybePit == false)
    ) isPit = true;

    else isPit = false;


    return isPit;
}

function getUpdatedAllVisiableSquare(knowledgeBase, nextVisitableSquare) {
    for (let i = 0; i < constants.CAVE_LENGTH; i++) {
        for (let j = 0; j < constants.CAVE_WIDTH; j++) {
            if (knowledgeBase[i][j].safe == true && knowledgeBase[i][j].visited != true) {
                knowledgeBase[i][j].visited = true;
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

    // Defining the starting position (1,1)
    let cpY = 0, cpX = 0;

    let i = 0;
    knowledgeBase[0][0].visited = true;
    nextVisitableSquare.push({ y: 0, x: 0 });       // as (1,1) is the current position of agent and it is safe
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
        // printCave(knowledgeBase)

        getUpdatedAllVisiableSquare(knowledgeBase, nextVisitableSquare);
        console.log("Knowledgebase after push: ", nextVisitableSquare)
        // await sleep(1000);
    }

    console.log(moveList)
}

AI_move_By_Propositional_logic(caveBoard.initialize())
// caveBoard.printCave(caveBoard.initialize())
