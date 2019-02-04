

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
