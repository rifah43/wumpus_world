const constants = require('./constants.js')

function findPathByBFS(caveMatrix, startPositionY, startPositionX, destinationY, destinationX) {
    const length = caveMatrix.length;
    const width = caveMatrix[0].length;
    const visited = Array.from({ length: length }, () => Array(width).fill(false));
    const queue = [];

    // Define the possible moves (up, down, left, right)
    const rowMoves = [-1, 1, 0, 0];
    const colMoves = [0, 0, -1, 1];

    // Helper function to check if a move is valid
    function isValidMove(row, col) {
        return row >= 0 && row < length && col >= 0 && col < width && caveMatrix[row][col] !== 0 && !visited[row][col];
    }

    // Initialize the queue with the start node
    queue.push([startPositionY, startPositionX, []]);
    visited[startPositionY][startPositionX] = true;

    while (queue.length > 0) {
        const [currentRow, currentCol, path] = queue.shift();

        // Check if we've reached the end
        if (currentRow === destinationY && currentCol === destinationX) {
            let findPath = path.concat([[currentRow, currentCol]]);
            findPath.shift()
            return findPath;
        }

        // Explore adjacent cells
        for (let i = 0; i < 4; i++) {
            const newRow = currentRow + rowMoves[i];
            const newCol = currentCol + colMoves[i];

            if (isValidMove(newRow, newCol)) {
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol, path.concat([[currentRow, currentCol]])]);
            }
        }
    }

    // If no path is found, return null
    return null;
}

function findSafeRooms(knowledgeBase) {
    let i, j;
    let length = knowledgeBase.length;
    let width = knowledgeBase[0].length;
    const caveMatrix = Array.from({ length: length }, () => Array(width).fill(0));

    for (i = 0; i < length; i++) {
        for (j = 0; j < width; j++) {
            if (knowledgeBase[i][j].safe == true) {
                caveMatrix[i][j] = 1;
            }
        }
    }
    return caveMatrix;
}

function addDirection_Action(cave, path) {
    let i, length = path.length;
    let moveList = [];
    let ylist= [];
    let xlist= [];

    for (i = 0; i < length; i++) {
        let [currentPositionY, currentPositionX] = [path[i][0], path[i][1]];
        let action = null, grab = null, move = null;

        if (cave[currentPositionY][currentPositionX].includes(constants.GOLD_IS_GRABBED)) {
            grab = true;
        }
        else grab = false;


        if (cave[currentPositionY][currentPositionX].includes(constants.WUMPUS) || cave[currentPositionY][currentPositionX].includes(constants.PIT)) {
            action = 'DIE';
        }
        else if (i + 1 < length && cave[path[i + 1][0]][path[i + 1][1]].includes(constants.DEAD_WUMPUS)) action = 'SHOOT';
        else action = "NO_ACTION";

        if (i + 1 < length) {
            let [nextMoveY, nextMoveX] = [path[i + 1][0], path[i + 1][1]];
            if (nextMoveY < currentPositionY) move = "UP"
            else if (nextMoveY > currentPositionY) move = "DOWN";
            else if (nextMoveX < currentPositionX) move = "LEFT";
            else if (nextMoveX > currentPositionX) move = "RIGHT";
            else move = null;
            ylist.push(nextMoveY);
            xlist.push(nextMoveX);
        }

        moveList.push({ move: move, action: action, grab: grab })
        
    }
    return {moveList, ylist, xlist};
}


function generatePath(knowledgeBase, startPositionY, startPositionX, destinationY, destinationX) {
    let caveMatrix = findSafeRooms(knowledgeBase);
    let isKilled = false;

    if (knowledgeBase[destinationY][destinationX].safe == false) {
        caveMatrix[destinationY][destinationX] = 1;     // making is safe so that path can be generated (When Probabilistic decision gona be wrong)
    }
    let path = findPathByBFS(caveMatrix, startPositionY, startPositionX, destinationY, destinationX)
    return path;
}

module.exports = {
    generatePath, addDirection_Action
}