const constants = require('./constants.js');


function initializeKnowledgeBase() {
    const obj = {
        noWumpus: null,
        noPit: null,
        maybeWumpus: null,
        maybePit: null,
        breeze: null,
        stench: null,
        safe: null
    }
    const newArray = Array.from({ length: constants.CAVE_WIDTH}, () => obj);
    return Array.from({ length: constants.CAVE_LENGTH }, () => newArray);
}

function AI_move_By_Propositional_logic(cave) {
    // move list will contine an object which  will be like = {pY: ,pX: ,nY: ,nX: }
    let moveList = [];
    let knowledgeBase = initializeKnowledgeBase();

    let nextVisitableSquare = [];
    nextVisitableSquare.push({pY: 1, pX: 1});       // as (1,1) is the current position of agent and it is safe

    // Defining the starting position (1,1)
    let currentPosition = {cpY: 1, cpX: 1};     // as it can be also imported from other file
    let cpY = currentPosition.cpY;
    let cpX = currentPosition.cpX;

    while(nextVisitableSquare != null && nextVisitableSquare.length > 0) {
        let nextPosition = nextVisitableSquare.pop();
        let npY = currentPosition.pY;
        let npX = currentPosition.pX;

        moveToNextPostion(moveList, cpY, cpX, npY, npX);
        // As agent moves to the next safe position
        cpY = npY;
        cpX = npX;
    }
}
