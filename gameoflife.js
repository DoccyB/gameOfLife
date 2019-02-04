
// Create canvas
window.onload=function() {
    canv=document.getElementById("gol");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    document.addEventListener("click", clickyClick);
    newFrame();
}



//        document.getElementById("testpara").innerHTML = 5 + 6;

canv=document.getElementById("gol");

// Define constants
var cellSize = 5;
var canvHeight = canv.height;
var canvWidth = canv.width;
var yCells = canvHeight / cellSize;
var xCells = canvWidth / cellSize;


// Create list of cell coordinates (left->right, top->bottom)
var grid = [];
for (h = 0; h <= canvHeight - cellSize;h += cellSize) {
    for (w = 0; w <= canvWidth - cellSize;w += cellSize) {

        grid.push([w, h, cellSize , cellSize]);
    }
}

// Create list of active cells
var onOff = [];
for (i=0; i < grid.length; i++) {
    onOff.push(false);
}


// Hit ENTER to run
function keyPush (evt) {
    if (evt.keyCode == 13) {
        setInterval(newFrame,1000/15);
    }
}


// Light up cell if clicked
function clickyClick (evt) {
    // get mouse coordinates relative to canvas
    var rect = canv.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let y = evt.clientY - rect.top;
    
    if (x >= 0 && x <= canvWidth && y >= 0 && y <= canvHeight) {
        
        let cellNumber = 0;
        cellX = x + (cellSize - x % cellSize);
        cellY = y + (cellSize - y % cellSize);
        cellNumber += ((cellX / cellSize) - 1) + (((cellY / cellSize) - 1) * xCells);
        
        if (onOff[cellNumber] == false) {
            onOff[cellNumber] = true;
        } else {
            onOff[cellNumber] = false;
        }

        fillCanvas();

        displayCells();
    }
}

// Fill canvas
function fillCanvas() {
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvWidth,canvHeight);

    // Create grid
    ctx.fillStyle="#006400";
/*
    // x axis lines
    for (i = canvWidth / xCells; i < canvWidth;i += canvWidth / xCells) {
        ctx.fillRect(i,0, 1, canvHeight);
    }
    //y axis lines
    for (i = canvHeight / yCells; i < canvHeight;i += canvHeight / yCells) {
        ctx.fillRect(0, i, canvWidth, 1);
    }
*/
}


function getCellEnvironment (cell) {
    let surroundingCells = [];
    
    switch (true) {
        // Top left
        case cell == 0:
            surroundingCells.push(1, xCells, xCells + 1);
            break;
        // Bottom left
        case cell == grid.length - xCells:
            surroundingCells.push(cell - xCells, (cell - xCells) + 1, cell + 1);
            break;
        // Top right
        case cell == xCells - 1:
            surroundingCells.push(cell - 1, cell + xCells, cell + xCells - 1);
            break;
        // Bottom right
        case cell == grid.length - 1:
            surroundingCells.push(cell - xCells, (cell - xCells) -1, cell - 1);
            break;
        // Left side
        case cell % xCells == 0:
            surroundingCells.push(cell - xCells, (cell - xCells) + 1, cell + 1, cell + xCells, cell + xCells + 1 );
            break;
        // Top side
        case cell > 0 && cell < xCells:
            surroundingCells.push(cell - 1, cell + 1, (cell + xCells) - 1, cell + xCells, cell + xCells + 1);
            break;
        // Right side
        case (cell + 1) % xCells == 0:
            surroundingCells.push(cell - xCells, (cell - xCells) - 1, cell - 1, (cell + xCells) - 1, cell + xCells);
            break;
        // Bottom side
        case cell > (grid.length - xCells) && cell < grid.length:
            surroundingCells.push(cell - 1, (cell - xCells) - 1, cell - xCells, (cell - xCells) + 1, cell + 1);
            break;
        // In the middle
        default:
            surroundingCells.push((cell - xCells) - 1, cell - xCells, (cell - xCells) + 1, cell - 1, cell + 1, (cell + xCells) - 1, cell + xCells, cell + xCells + 1);
    }

    return surroundingCells;
}


// Display live cells
function displayCells () {
    for (i = 0; i < onOff.length; i++) {
        if (onOff[i] == true) {
            ctx.fillRect(grid[i][0], grid[i][1], grid[i][2], grid[i][3]);
        }
    }
}


//
function updateGrid() {
    let newState = onOff.slice();
    for (i = 0; i < onOff.length; i ++) {
        
        // Is cell alive
        let alive = onOff[i];
        
        // Build list of surrounding cells' status
        let liveSurroundingCells = [];
        for (x = 0; x < getCellEnvironment(i).length; x ++) {
            liveSurroundingCells.push(onOff[getCellEnvironment(i)[x]]);
        }
        let cellsOn = liveSurroundingCells.filter(live => live == true).length;
        
        
        // Rules 1,2,3 (2 is assumed)
        if (alive) {
            if (cellsOn < 2 || cellsOn > 3) {
                newState[i] = false;
            }
        }
        
        // Rule 4
        if (!alive && cellsOn == 3) {
            newState[i] = true;
        }
            
    }
    onOff = newState.slice();

}


// Update grid and display cells
function newFrame() {
    
    updateGrid();
    fillCanvas();
    displayCells();
}
