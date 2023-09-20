const constants = {
    CAVE_LENGTH: 5,
    CAVE_WIDTH: 5
};

function isThereWumpus(knowledgeBase, pY, pX) {
    let isThereWum = false; 
    if(
        (pY <= 0 || knowledgeBase[pY-1][pX].stench == true) &&
        (pY+1 >= constants.CAVE_LENGTH || knowledgeBase[pY+1][pX].stench == true) &&
        (pX <= 0 || knowledgeBase[pY][pX-1].stench == true) &&
        (pX+1 >= constants.CAVE_WIDTH || knowledgeBase[pY][pX+1].stench == true)
    ) isThereWum = true;
    
    // else if(
    //     // if in the upper room feels stench and that's upper, left, right sure that there is no wumpus 
    //     (pY > 0 && knowledgeBase[pY-1][pX].stench == true) &&
    //     (pY <= 1 || knowledgeBase[pY-2][pX].maybeWumpus == false) &&
    //     (pX <= 0 || knowledgeBase[pY-1][pX-1].maybeWumpus == false) &&
    //     (pX+1 >= constants.CAVE_WIDTH || knowledgeBase[pY-1][pX+1].maybeWumpus == false)
    // ) isThereWum = true;

    else if(
        // if in the down room feels stench and that's down, left, right sure that there is no wumpus 
        (pY+1 < constants.CAVE_LENGTH && knowledgeBase[pY+1][pX].stench == true) &&
        (pY+2 >= constants.CAVE_LENGTH || knowledgeBase[pY+2][pX].maybeWumpus == false) &&
        (pX <= 0 || knowledgeBase[pY+1][pX-1].maybeWumpus == false) &&
        (pX+1 >= constants.CAVE_WIDTH || knowledgeBase[pY+1][pX+1].maybeWumpus == false)
    ) isThereWum = true;



    // else if(
    //     // if in the left room feels stench and that's up, down, left sure that there is no wumpus 
    //     (pX > 0 && knowledgeBase[pY][pX-1].stench == true) &&
    //     (pX <= 1 || knowledgeBase[pY][pX-2].maybeWumpus == false) &&
    //     (pY <= 0 || knowledgeBase[pY-1][pX-1].maybeWumpus == false) &&
    //     (pY+1 >= constants.CAVE_LENGTH || knowledgeBase[pY+1][pX-1].maybeWumpus == false)
    // ) isThereWum = true;

    // else if(
    //     // if in the right room feels stench and that's up, down, right sure that there is no wumpus 
    //     (pX+1 < constants.CAVE_WIDTH && knowledgeBase[pY][pX+1].stench == true) &&
    //     (pX+2 >= constants.CAVE_WIDTH || knowledgeBase[pY][pX+2].maybeWumpus == false) &&
    //     (pY <= 0 || knowledgeBase[pY-1][pX+1].maybeWumpus == false) &&
    //     (pY+1 >= constants.CAVE_LENGTH || knowledgeBase[pY+1][pX+1].maybeWumpus == false)
    // ) isThereWum = true;

    else isThereWum = false;


    return isThereWum;
}


let knowledgeBase = [[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}]]

knowledgeBase[0][0] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[0][1] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[0][2] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[0][3] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[0][4] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
//1
knowledgeBase[1][0] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: true,
    safe: null
}
knowledgeBase[1][1] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: false,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[1][2] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[1][3] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[1][4] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}

//2
knowledgeBase[2][0] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: false,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[2][1] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[2][2] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[2][3] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[2][4] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
// 3
knowledgeBase[3][0] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[3][1] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[3][2] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[3][3] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[3][4] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
//4
knowledgeBase[4][0] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[4][1] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[4][2] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[4][3] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}
knowledgeBase[4][4] = {
    noWumpus: null,
    noPit: null,
    maybeWumpus: null,
    maybePit: null,
    breeze: null,
    stench: null,
    safe: null
}

console.log(isThereWumpus(knowledgeBase, 0,0))
