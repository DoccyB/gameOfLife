var input = 'click';

// Light up cell if clicked
function clickyClick (evt) {
    // get mouse coordinates relative to canvas
    var rect = canv.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let y = evt.clientY - rect.top;
    
    if (x >= 0 && x <= canvWidth && y >= 0 && y <= canvHeight) {
        
        let cellNumber;
        cellX = x + (cellSize - x % cellSize);
        cellY = y + (cellSize - y % cellSize);
        cellNumber = ((cellX / cellSize) - 1) + (((cellY / cellSize) - 1) * xCells);
        
        switch (input) {
            case 'click':
                singleClick (cellNumber);
                break;
            case 'glider':
                glider(cellNumber);
                break;
            case 'pulsar':
                pulsar(cellNumber);
                break;
        }

        fillCanvas();

        displayCells();
    }
}


function changeInput(type) {
    input = type;
}
